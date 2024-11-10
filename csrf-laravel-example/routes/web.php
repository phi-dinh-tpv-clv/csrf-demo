<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return '<h1>Laravel welcome</h1>';
});

Route::middleware(['web'])->group(function () {
    Route::controller(HomeController::class)->group(function () {
        Route::get('/dashboard', 'home')->name('home');
        Route::post('/dashboard', 'submitForm')->name('submit');
    });

    Route::get('/token', function (\Illuminate\Http\Request $request) {
//        $token = $request->session()->token();
//        if ($token) {
            $token = csrf_token();
//        }
        dd($token);
        return $token;
    });
});
