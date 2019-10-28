<?php

namespace Git\Providers;

use Git\Services\GithubApi;
use Git\Services\GitlabApi;
use Illuminate\Support\ServiceProvider;

class ContribCalendarServiceProvider extends ServiceProvider
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
        $this->app->singleton(GithubApi::class, function ($app) {
            return new GithubApi(
                config('contrib-calendar.github.username'),
                config('contrib-calendar.github.key'),
                config('contrib-calendar.github.url')
            );
        });
        $this->app->singleton(GitlabApi::class, function ($app) {
            return new GitlabApi(
                config('contrib-calendar.gitlab.key'),
                config('contrib-calendar.gitlab.url')
            );
        });
    }
}
