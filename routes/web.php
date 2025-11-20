<?php

use Illuminate\Support\Facades\Route;

// Customer routes (Livewire) - SEO friendly
Route::get('/', function () {
    return view('customer.home');
})->name('customer.home');

Route::get('/about', function () {
    return "About";
})->name('customer.about');



// Admin routes (Vue.js) - Non-SEO pages
Route::prefix('admin')->group(function () {
    Route::get('{any}', function () {
        return view('layouts.admin');
    })->where('any', '.*');
});
