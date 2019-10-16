<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Collection;

class GitlabApi
{
    protected $guzzle;
    protected $after;
    protected $events;
    protected $responseHeaders;

    public function __construct()
    {
        $this->guzzle = new Client([
            'base_uri' => config('services.gitlab.url'),
            'headers' => [
                'PRIVATE-TOKEN' => config('services.gitlab.key'),
                'Accept' => 'application/json'
            ]
        ]);
        $this->after = Carbon::now()->subMonths(6)->toDateString();
    }

    public function queryEvents(int $page = 1): self
    {
        $options = [
            'after' => $this->after,
            'per_page' => 100,
            'page' => $page
        ];
        $response = $this->guzzle->get('/api/v4/users/8/events', $options);
        $this->responseHeaders = $response->getHeaders();
        $this->events = collect(json_decode($response->getBody()->getContents(), true))
            ->map(function ($e) {
                $e['created_at'] = Carbon::parse($e['created_at']);
                return $e;
            });
        return $this;
    }

    public function getAllEvents(): Collection
    {
        $this->queryEvents();
        $totalPages = $this->responseHeaders['X-Total-Pages'];
        $return = $this->events;
        for ($i=2; $i <= $totalPages; $i++) {
            $return = $return->merge($this->queryEvents()->events);
        }
        $return = $this->events->groupBy(function ($e) {
            return $e['created_at']->toDateString();
        })->map(function ($e) {
            return $e->count();
        });
        return $return;
    }

    public function getEvents(): Collection
    {
        return $this->events ?? collect();
    }

    public function __get($name)
    {
        return $this->$name;
    }
}
