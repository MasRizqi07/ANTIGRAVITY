<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = null;

    public function toArray($request)
    {
        return [
            'order' => parent::toArray($request),
            'user' => $this->whenLoaded('user'),
            'payments' => $this->whenLoaded('payments'),
        ];
    }
}
