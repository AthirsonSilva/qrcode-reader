<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScansController;

/*
 |--------------------------------------------------------------------------
 | API Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register API routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | is assigned the "api" middleware group. Enjoy building your API!
 |
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Path: server/routes/web.php

Route::get('/scan', [ScansController::class , 'index'])->name('scan.index');

Route::post('/scan', [ScansController::class , 'store'])->name('scan.store');

Route::put('/scan/{id}', [ScansController::class , 'update'])->name('scan.update');

Route::patch('/scan/{id}', [ScansController::class , 'update'])->name('scan.update');

Route::delete('/scan/{id}', [ScansController::class , 'destroy'])->name('scan.destroy');