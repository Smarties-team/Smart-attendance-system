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

use App\Http\Controllers\StudentsController;

Route::get('/hello', function () {
    return 'Hello world';
});


Route::post('/addstudent', [StudentsController::class, 'store']);

Route::get('/students', [StudentsController::class, 'index']);

Route::view('/{any}', 'index')->where('any', '.*');


//Route::get('/students', [StudentsController::class, 'show']);
