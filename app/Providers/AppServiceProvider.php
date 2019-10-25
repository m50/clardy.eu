<?php

namespace App\Providers;

use App\Services\GithubApi;
use App\Services\GitlabApi;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(GithubApi::class, function ($app) {
            return new GithubApi();
        });
        $this->app->bind(GitlabApi::class, function ($app) {
            return new GitlabApi();
        });
    }
}
