<?php

namespace Git\Services;

use Carbon\Carbon;
use Git\Contracts\GitApi;
use Git\GitData;
use GuzzleHttp\Client;

class GithubApi implements GitApi
{
    private $key;
    private $uri;
    /**
     * The Http client.
     *
     * @var GuzzleHttp\Client
     */
    protected $guzzle;
    /**
     * $after.
     *
     * @var Carbon\Carbon
     */
    protected $after;
    /**
     * $events.
     *
     * @var Collection
     */
    protected $events;
    /**
     * $responseHeaders.
     *
     * @var array
     */
    protected $responseHeaders;
    /**
     * $repos.
     *
     * @var Collection
     */
    protected $repos;

    /**
     * $user.
     *
     * @var array
     */
    protected $user;

    /**
     * $username.
     *
     * @var string
     */
    protected $username;

    /**
     * __construct.
     *
     * @param string $username
     * @param string $key
     * @param string $uri
     * @return void
     */
    public function __construct(string $username, string $key, string $uri)
    {
        $this->key = $key;
        $this->uri = $uri;
        $this->username = $username;
    }

    public function init()
    {
        $this->guzzle = new Client([
            'base_uri' => $this->uri,
            'headers' => [
                'Authorization' => "token {$this->key}",
                'Accept' => 'application/vnd.github.v3+json',
            ],
        ]);
        $this->after = Carbon::parse(Carbon::now()->subMonths(12)->toDateString());
        $this->queryUser($this->username);
    }

    public function queryUser(string $username): self
    {
        $response = $this->guzzle->get("/users/{$username}");
        $this->user = collect(json_decode($response->getBody()->getContents(), true));

        return $this;
    }

    /**
     * queryRepos.
     *
     * @return self
     */
    public function queryRepos(): self
    {
        if (! isset($this->guzzle)) {
            $this->init();
        }
        $response = $this->guzzle->get("/users/{$this->user['login']}/repos");
        $this->responseHeaders = $response->getHeaders();
        $this->repos = collect(json_decode($response->getBody()->getContents(), true))
            ->map(function ($repo) {
                return $repo['name'];
            });

        return $this;
    }

    /**
     * queryCommits.
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
     * getCommitCountsByDay.
     *
     * @return GitData
     */
    public function getEventCountsByDay(): GitData
    {
        $data = collect();
        foreach ($this->queryRepos()->repos as $repo) {
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

        return new GitData($data, $this->after, Carbon::parse(now()->toDateString()));
    }

    /**
     * __get.
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
     * getTotalPages.
     *
     * @return int
     */
    private function getTotalPages(): int
    {
        if (! isset($this->responseHeaders['Link'])) {
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
