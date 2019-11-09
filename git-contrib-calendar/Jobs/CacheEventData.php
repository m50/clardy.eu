<?php

namespace Git\Jobs;

use Git\GitData;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;

class CacheEventData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    /**
     * THe runners for getting git contrib data.
     *
     * @var array
     */
    protected $gitRunners;

    /**
     * Create a new job instance.
     *
     * @param array $gitRunners The git runners to gather data from.
     * @return void
     */
    public function __construct(...$gitRunners)
    {
        $this->gitRunners = $gitRunners;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data = new GitData(collect([1 => [], 2 => [], 3 => [], 4 => [], 5 => [], 6 => [], 7 => []]));
        foreach ($this->gitRunners as $gitRunner) {
            $data->merge($gitRunner->getEventCountsByDay());
        }
        Cache::put('git-contrib-data', $data, now()->addHours(24));
    }
}
