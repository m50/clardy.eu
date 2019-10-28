<?php

namespace Git\Contracts;

use Git\GitData;

interface GitApi
{
    public function getEventCountsByDay(): GitData;
}