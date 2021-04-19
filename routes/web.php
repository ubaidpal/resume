<?php

use Illuminate\Support\Facades\Artisan;
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

/*Route::get('/', function () {

    return view('welcome');
});*/
Route::get('/storage_link', function () {
    Artisan::call('storage:link');
});
Route::get('/', [App\Http\Controllers\HomeController::class, 'getMainPage'])->name('/');
Route::get('contact-us', [App\Http\Controllers\HomeController::class, 'contactUS'])->name('contact-us');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/{name}/profile-update', [App\Http\Controllers\HomeController::class, 'profileUpdate'])->name('home');
Route::post('/{name}/profile_image_update', [App\Http\Controllers\HomeController::class, 'profileImageCrops'])->name('profile_image_update');


Route::get('{name}/recommendations', [App\Http\Controllers\HomeController::class, 'recommendations'])->name('recommendations');
Route::post('{name}/saveRecommendations', [App\Http\Controllers\HomeController::class, 'saveRecommendations'])->name('save-recommendations');
Route::get('{name}/delete-recommendations/{id?}', [App\Http\Controllers\HomeController::class, 'deleteRecommendations'])->name('delete-recommendations');


Route::post('{name}/save-about', [App\Http\Controllers\HomeController::class, 'saveAbout'])->name('save-about');
Route::get('{name}/delete-about/{id?}', [App\Http\Controllers\HomeController::class, 'deleteAbout'])->name('delete-about');

Route::get('{name}/resume', [App\Http\Controllers\HomeController::class, 'resume'])->name('resume');
Route::post('{name}/save-resume', [App\Http\Controllers\HomeController::class, 'saveResume'])->name('save-resume');
Route::post('{name}/save-experience', [App\Http\Controllers\HomeController::class, 'saveResume'])->name('save-experience');
Route::get('delete-experience/{id?}', [App\Http\Controllers\HomeController::class, 'deleteExperience'])->name('delete-experience');
Route::get('delete-qualifications/{id?}', [App\Http\Controllers\HomeController::class, 'deleteQualification'])->name('delete-qualifications');

Route::get('/multi-project-uploads', [App\Http\Controllers\HomeController::class, 'uploadProjectForm'])->name('multi-project-uploads');
Route::post('/multi-project-uploads', [App\Http\Controllers\HomeController::class, 'uploadProjectSubmit'])->name('multi-project-uploads');
Route::get('/multi-project-uploads-json', [App\Http\Controllers\HomeController::class, 'uploadProjectJson'])->name('multi-project-uploads');
Route::get('/delete-project/{id?}', [App\Http\Controllers\HomeController::class, 'deleteProject'])->name('delete-project');



Route::get('contact-detail', [App\Http\Controllers\HomeController::class, 'getContact'])->name('contact-detail');
Route::get('delete-contact/{id?}', [App\Http\Controllers\HomeController::class, 'deleteContact'])->name('delete-contact');
Route::get('project-details-load/{item_id?}', [App\Http\Controllers\HomeController::class, 'projectDetails'])->name('project-details-load');

Route::get('social-links', [App\Http\Controllers\HomeController::class, 'getSocialForm'])->name('social-links');
Route::post('social-links', [App\Http\Controllers\HomeController::class, 'saveSocialForm'])->name('social-links');
