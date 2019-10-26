<?php

namespace App\Http\Controllers;

use App\GitData;
use App\Jobs\CacheEventData;
use App\Services\GithubApi;
use App\Services\GitlabApi;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function __invoke()
    {
        $data = Cache::get(
            'git-contrib-data',
            function () {
                $this->dispatch(new CacheEventData(app(GithubApi::class), app(GitlabApi::class)));
                return new GitData(collect([1=>[], 2 => [], 3 => [], 4 => [], 5 => [], 6 => [], 7 => []]));
            }
        );
        if (app()->environment('Production')) {
            $this->dispatch(new CacheEventData(app(GithubApi::class), app(GitlabApi::class)));
        }

        return view('welcome', ['data' => $data]);
    }
}
