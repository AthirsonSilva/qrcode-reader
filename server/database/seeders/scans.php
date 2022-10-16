<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class scans extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('scans')->insert(
            array(
                [
                    'data' => 'https://www.example1.com',
                    'type' => 'url',
                    'name' => 'João da Silva',
                    'status' => true,
                ],
                [
                    'data' => 'https://www.example2.com',
                    'type' => 'url',
                    'name' => 'Maria da Silva',
                    'status' => true,
                ],
                [
                    'data' => 'https://www.example3.com',
                    'type' => 'url',
                    'name' => 'José da Silva',
                    'status' => true,
                ]
            )
        );
    }
}
