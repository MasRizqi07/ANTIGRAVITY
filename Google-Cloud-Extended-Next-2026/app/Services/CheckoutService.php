<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Exception;

class CheckoutService
{
    public function processCheckout($user, array $data)
    {
        $eventId = $data['event_id'];
        $ticketType = $data['ticket_type'];
        $quantity = $data['quantity'];
        $paymentToken = $data['payment_token'];

        $event = Event::find($eventId);
        if (!$event) {
            throw new Exception('Event not found', 404);
        }

        $taxRate = ($event->name == 'Charity Concert') ? 0.05 : 0.10;

        return DB::transaction(function () use ($user, $event, $ticketType, $quantity, $paymentToken, $taxRate) {
            // Lock the ticket row for update to prevent race conditions
            $ticket = Ticket::where('event_id', $event->id)
                ->where('type', $ticketType)
                ->lockForUpdate()
                ->first();

            if (!$ticket) {
                throw new Exception('Ticket type not found for this event', 404);
            }

            if ($ticket->stock_available < $quantity) {
                throw new Exception('Not enough tickets available', 400);
            }

            // Deduct stock
            $ticket->stock_available -= $quantity;
            $ticket->save();

            // Calculate amounts
            $subtotal = $ticket->price * $quantity;
            $totalTax = $subtotal * $taxRate;
            $totalAmount = $subtotal + $totalTax;

            // Create Order
            $order = new Order();
            $order->user_id = $user->id;
            $order->total_amount = $totalAmount;
            $order->tax_amount = $totalTax;
            $order->status = 'PENDING';
            $order->save();

            // Payment Gateway API Call
            $paymentSuccess = ($paymentToken !== 'fail_me');

            if (!$paymentSuccess) {
                // Because we are in a transaction, this exception automatically rolls back the stock change.
                throw new Exception('Payment failed', 400);
            }

            $payment = new Payment();
            $payment->order_id = $order->id;
            $payment->gateway_transaction_id = 'txn_' . rand(1000, 9999);
            $payment->amount = $totalAmount;
            $payment->status = 'SUCCESS';
            $payment->save();

            $order->status = 'PAID';
            $order->save();

            $emailContent = "Dear {$user->name}, your order {$order->id} for {$quantity} x {$ticketType} tickets to {$event->name} is confirmed. Total: {$totalAmount}.";
            $storageDir = storage_path('logs');
            if (!is_dir($storageDir)) {
                @mkdir($storageDir, 0777, true);
            }
            @file_put_contents($storageDir . '/emails.log', $emailContent . PHP_EOL, FILE_APPEND);

            return [
                'order' => $order,
                'event' => $event,
            ];
        });
    }
}
