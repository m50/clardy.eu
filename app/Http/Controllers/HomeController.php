<?php

namespace App\Http\Controllers;

use App\Services\GithubApi;
use App\Services\GitlabApi;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function __invoke()
    {
        $data = Cache::get('git-contrib-data', [
            'data' => collect([1=>[], 2 => [], 3 => [], 4 => [], 5 => [], 6 => [], 7 => []]),
            'earliest_date' => now()->subMonths(12),
            'latest_date' => now()
        ]);

        return view('welcome', [
            'data' => $data,
        ]);
    }
}
