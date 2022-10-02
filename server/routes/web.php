<?php

use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | Web Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register web routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | contains the "web" middleware group. Now create something great!
 |
 */

Route::get('/', function () {
    return view('welcome');
});

// updates (PUT)
Route::put('/scan/{id}', [ScansController::class , 'update'])->name('scan.update');

// edits (PATCH)
Route::patch('/scan/{id}', [ScansController::class , 'edit'])->name('scan.edit');