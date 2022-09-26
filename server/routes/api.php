<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/scan', [ScanController::class, 'index'])->name('scan.index');

Route::post('/scan', [ScanController::class, 'store'])->name('scan.store');

Route::put('/scan/{id}', [ScanController::class, 'update'])->name('scan.update');

Route::delete('/scan/{id}', [ScanController::class, 'destroy'])->name('scan.destroy');

