<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CheckoutRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'event_id' => 'required|integer|exists:events,id',
            'ticket_type' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'payment_token' => 'required|string',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        // Strictly match legacy contract "error" string format
        $firstError = $validator->errors()->first();
        
        // Strip out the field name and generic messages to match legacy if possible,
        // but default Laravel messages are fine as long as it's a single "error" string.
        throw new HttpResponseException(response()->json([
            'error' => $firstError
        ], 400));
    }
}
