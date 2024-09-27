<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel 
{
    protected $commands = [
        \App\Console\Commands\ShowTableData::class,
        \App\Console\Commands\CheckUniqueKeys::class,
    ];

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }


}
