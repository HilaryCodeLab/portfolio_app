<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class ShowTableData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'app:show-table-data';
    protected $signature = 'table:show {table}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display data from a database table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $table = $this->argument('table');

        $data = DB::table($table)->get();

        if ($data->isEmpty()) {
            $this->info("No data found in the table '$table'.");
            return;
        }

        $headers = array_keys((array) $data->first());

        // Convert each row from object to array
        $rows = $data->map(function ($item) {
            return (array) $item;
        })->toArray();

        $this->table($headers, $rows);
    }
}
