<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CheckoutResource extends JsonResource
{
    private $event;
    private $ticketType;
    private $quantity;

    public function __construct($resource, $event, $ticketType, $quantity)
    {
        parent::__construct($resource);
        $this->event = $event;
        $this->ticketType = $ticketType;
        $this->quantity = $quantity;
    }

    public function toArray($request)
    {
        return [
            'status' => 'success',
            'message' => 'Order completed successfully',
            'data' => [
                'order_id' => $this->id,
                'total_amount' => (float) $this->total_amount,
                'status' => $this->status,
                'tickets' => [
                    'event' => $this->event->name,
                    'type' => $this->ticketType,
                    'quantity' => (int) $this->quantity,
                ]
            ]
        ];
    }
}
