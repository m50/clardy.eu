<?php

namespace App\Http\Controllers;

use App\Services\GithubApi;
use App\Services\GitlabApi;

class HomeController extends Controller
{
    protected $gl;
    protected $gh;

    public function __construct(GitlabApi $gl, GithubApi $gh)
    {
        $this->gl = $gl;
        $this->gh = $gh;
    }
    public function __invoke()
    {
        $gl = $this->gl->getEventCountsByDay();
        $gh = $this->gh->getCommitCountsByDay();

        return view('welcome', [
            'data' => $this->mergeData($gl, $gh),
            'git' => $this->gl
        ]);
    }

    private function mergeData(array $one, array $two): array
    {

        $allEvents = collect();
        for ($day = 1; $day <= 7; $day++) {
            $k = collect();
            foreach ($one['data'][$day] as $date => $obj) {
                if (isset($two['data'][$day][$date])) {
                    $obj['count'] += $two['data'][$day][$date]['count'];
                }
                $k[$date] = $obj;
            }
            foreach ($two['data'][$day] as $date => $obj) {
                if (isset($k[$date])) {
                    continue;
                }
                $k[$date] = $obj;
            }

            $allEvents[$day] = $k;
        }
        return [
            'data' => $allEvents,
            'earliest_date' => $one['earliest_date'],
            'latest_date' => $one['latest_date']
        ];
    }
}
