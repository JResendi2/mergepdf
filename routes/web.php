<?php

use App\Http\Controllers\pdfController;
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

Route::get('/', [pdfController::class, "index"])->name("index");
Route::post('/merge', [pdfController::class, "merge"])->name("merge");
Route::get('/get-pdf/{filemane}', [pdfController::class, "getPDF"])->name("get-pdf");
Route::get('/download-pdf/{filemane}', [pdfController::class, "downloadPdf"])->name("download-pdf");
