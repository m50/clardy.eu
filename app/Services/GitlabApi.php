<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;

class GitlabApi
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
     * __construct
     *
     * @param string|null $url
     * @param string|null $key
     * @return void
     */
    public function __construct(string $url = null, string $key = null)
    {
        $this->guzzle = new Client([
            'base_uri' => $url ?? config('services.gitlab.url'),
            'headers' => [
                'PRIVATE-TOKEN' => $key ?? config('services.gitlab.key'),
                'Accept' => 'application/json'
            ]
        ]);
        $this->after = Carbon::parse(Carbon::now()->subMonths(12)->toDateString());
    }

    /**
     * queryEvents
     *
     * @param int $page
     * @return self
     */
    public function queryEvents(int $page = 1): self
    {
        $options = collect([
            'page' => $page,
            'per_page' => 100,
            'after' => $this->after->toDateString(),
        ]);
        $options = $options->map(function ($val, $key) {
            return "$key=$val";
        })->implode('&');
        $response = $this->guzzle->get("/api/v4/users/8/events?{$options}");
        $this->responseHeaders = $response->getHeaders();
        $this->events = collect(json_decode($response->getBody()->getContents(), true))
            ->map(function ($e) {
                $e['created_at'] = Carbon::parse(Carbon::parse($e['created_at'])->toDateString());
                return $e;
            });
        return $this;
    }

    /**
     * getEventCountsByDay
     *
     * @return array
     */
    public function getEventCountsByDay(): array
    {
        $this->queryEvents(1);
        $totalPages = (int) $this->responseHeaders['X-Total-Pages'][0];
        $data = $this->events->map(function ($e) {
            return $e['created_at'];
        });
        for ($i=2; $i <= $totalPages; $i++) {
            $this->queryEvents($i);
            $response = $this->events->map(function ($e) {
                return $e['created_at'];
            });
            $data = $data->merge($response);
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
}
