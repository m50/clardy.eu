<?php

namespace App\Contracts;

use App\GitData;

interface GitApi
{
    public function getEventCountsByDay(): GitData;
}