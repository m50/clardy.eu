<?php

namespace App\Http\Controllers;

use Git\GitData;
use Git\Jobs\CacheEventData;
use Git\Services\GithubApi;
use Git\Services\GitlabApi;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function __invoke()
    {
        $data = Cache::get(
            'git-contrib-data',
            function () {
                $this->dispatch(new CacheEventData(app(GithubApi::class), app(GitlabApi::class)));
                
                return new GitData();
            }
        );
        if (app()->environment('Production')) {
            $this->dispatch(new CacheEventData(app(GithubApi::class), app(GitlabApi::class)));
        }

        return view('welcome', ['data' => $data]);
    }
}
