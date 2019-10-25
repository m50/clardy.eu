<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Contracts\Support\Arrayable;

class GithubApi implements Arrayable
{
    /**
     * $guzzle
     *
     * @var GuzzleHttp\Client
     */
    protected $guzzle;
    /**
     * $after
     *
     * @var Carbon\Carbon
     */
    protected $after;
    /**
     * $events
     *
     * @var Collection
     */
    protected $events;
    /**
     * $responseHeaders
     *
     * @var array
     */
    protected $responseHeaders;
    /**
     * $repos
     *
     * @var Collection
     */
    protected $repos;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct(string $username = null, string $key = null, string $uri = null)
    {
        $this->guzzle = new Client([
            'base_uri' => config('contrib-calendar.github.url'),
            'headers' => [
                'Authorization' => 'token ' . config('contrib-calendar.github.key'),
                'Accept' => 'application/vnd.github.v3+json'
            ]
        ]);
        $this->after = Carbon::parse(Carbon::now()->subMonths(12)->toDateString());

        $this->queryUser($username ?? config('contrib-calendar.github.username'));
    }

    public function queryUser(string $username): self
    {
        $response = $this->guzzle->get("/users/{$username}");
        $this->user = collect(json_decode($response->getBody()->getContents(), true));
        return $this;
    }

    /**
     * queryRepos
     *
     * @return self
     */
    public function queryRepos(): self
    {
        $response = $this->guzzle->get("/users/{$this->user['login']}/repos");
        $this->responseHeaders = $response->getHeaders();
        $this->repos = collect(json_decode($response->getBody()->getContents(), true))
            ->map(function ($repo) {
                return $repo['name'];
            });
        return $this;
    }

    /**
     * queryCommits
     *
     * @param  string $repo
     * @param  int    $page
     * @return self
     */
    public function queryCommits(string $repo, int $page = 1): self
    {
        $options = collect([
            'page' => $page,
            'per_page' => 60,
            'since' => $this->after->format('Y-m-d\T00:00:00\Z'),
        ]);
        $options = $options->map(function ($val, $key) {
            return "$key=$val";
        })->implode('&');
        $response = $this->guzzle->get("/repos/{$this->user['login']}/{$repo}/commits?{$options}");
        $this->responseHeaders = $response->getHeaders();
        $this->events = collect(json_decode($response->getBody()->getContents(), true))
            ->filter(function ($e) {
                return $e['commit']['author']['email'] = $this->user['email'];
            })->map(function ($e) {
                $e['commit']['author']['date'] = Carbon::parse(Carbon::parse($e['commit']['author']['date'])->toDateString());
                unset($e['commit']['committer']);
                unset($e['committer']);
                unset($e['author']);
                unset($e['parents']);
                return $e;
            });
        return $this;
    }

    /**
     * getCommitCountsByDay
     *
     * @return array
     */
    public function getCommitCountsByDay(): array
    {
        $data = collect();
        foreach($this->queryRepos()->repos as $repo) {
            $this->queryCommits($repo, 1);
            $totalPages = $this->getTotalPages();
            $data = $data->merge($this->events->map(function ($e) {
                return $e['commit']['author']['date'];
            }));
            for ($i = 2; $i <= $totalPages; $i++) {
                $this->queryCommits($repo, $i);
                $response = $this->events->map(function ($e) {
                    return $e['commit']['author']['date'];
                });
                $data = $data->merge($response);
            }
        }
        $data = $data->groupBy(function ($e) {
            return $e->dayOfWeek + 1;
        })->map(function ($eg) {
            return $eg->groupBy(function ($eg1) {
                return $eg1->diffInDays($this->after);
            })->map(function ($e) {
                return [
                    'date' => $e[0],
                    'count' => $e->count(),
                ];
            });
        });

        return [
            'data' => $data,
            'earliest_date' => $this->after,
            'latest_date' => Carbon::parse(now()->toDateString()),
        ];
    }

    /**
     * __get
     *
     * @param string $name
     * @return mixed
     */
    public function __get(string $name)
    {
        if ($name == 'events') {
            return $this->events ?? collect();
        } elseif ($name == 'responseHeaders') {
            return $this->responseHeaders ?? collect();
        } elseif ($name == 'headers') {
            return $this->responseHeaders ?? collect();
        }
        return $this->$name;
    }

    /**
     * toArray
     *
     * @return array
     */
    public function toArray()
    {
        return $this->getCommitCountsByDay();
    }

    /**
     * determineHeatmapColour
     *
     * @param int $count
     * @return string
     */
    public function determineHeatmapColour($count): string
    {
        $heatmapClass = config('contrib-calendar.heatmap-class.zero', 'bg-gray-300');
        if ($count >= 1 && $count < 9) {
            $heatmapClass = config('contrib-calendar.heatmap-class.low', 'bg-green-200');
        } elseif ($count >= 10 && $count < 19) {
            $heatmapClass = config('contrib-calendar.heatmap-class.medium', 'bg-green-400');
        } elseif ($count >= 20 && $count < 29) {
            $heatmapClass = config('contrib-calendar.heatmap-class.high', 'bg-green-600');
        } elseif ($count >= 30) {
            $heatmapClass = config('contrib-calendar.heatmap-class.very-high', 'bg-green-800');
        }
        return $heatmapClass;
    }

    /**
     * getTotalPages
     *
     * @return int
     */
    private function getTotalPages(): int
    {
        if (!isset($this->responseHeaders['Link'])) {
            return 1;
        }
        $lastPageLink = collect(explode(',', $this->responseHeaders['Link'][0]))->map(function ($m) {
            return collect(explode('; rel=', $m))->map(function ($k) {
                return trim($k, ' <>"');
            });
        })->filter(function ($d) {
            return $d[1] == 'last';
        })->map(function ($k) {
            return $k[0];
        })->implode('');
        return (int) explode('page=', $lastPageLink)[1];
    }
}
