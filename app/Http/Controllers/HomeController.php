<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GitlabApi;

class HomeController extends Controller
{
    protected $gl;
    public function __construct(GitlabApi $gl)
    {
        $this->gl = $gl;
    }
    public function __invoke()
    {
        $glEvents = $this->gl->getEventCountsByDay();

        return view('welcome', [ 'gl' => $glEvents ]);
    }
}
