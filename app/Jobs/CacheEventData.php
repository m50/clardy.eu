<?php

namespace App\Jobs;

use App\Services\GithubApi;
use App\Services\GitlabApi;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Cache;

class CacheEventData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @param App\Services\GitlabApi $gl The gitlab API to cache data from.
     * @param App\Services\GithubApi $gh The github API to cache data from.
     * @return void
     */
    public function __construct(GitlabApi $gl, GithubApi $gh)
    {
        $this->gl = $gl;
        $this->gh = $gh;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Cache::forget('git-contrib-data');
        $gl = $this->gl->getEventCountsByDay();
        $gh = $this->gh->getCommitCountsByDay();
        $data = $this->mergeData($gl, $gh);
        Cache::add('git-contrib-data', $data, now()->addHours(24));
    }

    /**
     * mergeData
     *
     * @param array $one First dataset.
     * @param array $two Second dataset.
     * @return array
     */
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
