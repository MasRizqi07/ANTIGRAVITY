<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\CheckoutResource;
use App\Http\Resources\OrderResource;
use App\Services\CheckoutService;
use App\Models\Order;
use Exception;

class LegacyTicketOrderController extends Controller
{
    protected $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
    }

    public function checkout(CheckoutRequest $request)
    {
        $user = $request->user() ?? \App\Models\User::first();
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $result = $this->checkoutService->processCheckout($user, $request->validated());
            
            $resource = new CheckoutResource(
                $result['order'], 
                $result['event'], 
                $request->input('ticket_type'), 
                $request->input('quantity')
            );
            
            return response()->json($resource->toArray($request), 200);

        } catch (Exception $e) {
            $code = $e->getCode() ?: 400;
            // Prevent returning status 0 if getCode is 0
            if ($code < 400 || $code > 599) {
                $code = 400;
            }
            return response()->json(['error' => $e->getMessage()], $code);
        }
    }

    public function show($id)
    {
        // Fix N+1 query by eagerly loading user and payments
        $order = Order::with(['user', 'payments'])->find($id);
        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json((new OrderResource($order))->toArray(request()));
    }
}
