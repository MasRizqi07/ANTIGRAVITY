<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LegacyTicketOrderController;

Route::post('/v1/checkout', [LegacyTicketOrderController::class, 'checkout']);
Route::get('/v1/orders/{id}', [LegacyTicketOrderController::class, 'show']);
