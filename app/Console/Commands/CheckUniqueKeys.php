<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CheckUniqueKeys extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:unique-keys';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for unique keys in a specified table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $tableName = $this->ask('Enter the table name');

        if (Schema::hasTable($tableName)) {
            $indexes = DB::select("SHOW INDEX FROM {$tableName}");

            foreach ($indexes as $index) {
                if ($index->Non_unique == 0) { // 0 means it is a unique index
                    $this->info("Unique index: " . $index->Key_name);
                }
            }
        } else {
            $this->error("Table '$tableName' does not exist.");
        }
    }
}
