<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use App\Models\Ticket;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_checkout()
    {
        // Mock DB records for testing
        // In a real sandbox we would have factories, here we just insert directly or mock.
        $user = new User(['name' => 'Test', 'email' => 'test@test.com', 'password' => 'secret']);
        $user->save();

        $event = new Event(['name' => 'Rock Concert', 'event_date' => now(), 'location' => 'Stadium']);
        $event->save();

        $ticket = new Ticket(['event_id' => $event->id, 'type' => 'VIP', 'price' => 100, 'stock_available' => 10]);
        $ticket->save();

        $response = $this->actingAs($user)->postJson('/api/v1/checkout', [
            'event_id' => $event->id,
            'ticket_type' => 'VIP',
            'quantity' => 2,
            'payment_token' => 'tok_success'
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('status', 'success')
                 ->assertJsonPath('data.tickets.quantity', 2);
                 
        $this->assertDatabaseHas('orders', ['user_id' => $user->id, 'status' => 'PAID']);
        $this->assertDatabaseHas('tickets', ['id' => $ticket->id, 'stock_available' => 8]);
    }
    
    public function test_payment_failure_rolls_back_stock()
    {
        $user = new User(['name' => 'Test2', 'email' => 'test2@test.com', 'password' => 'secret']);
        $user->save();

        $event = new Event(['name' => 'Pop Concert', 'event_date' => now(), 'location' => 'Arena']);
        $event->save();

        $ticket = new Ticket(['event_id' => $event->id, 'type' => 'Standard', 'price' => 50, 'stock_available' => 10]);
        $ticket->save();

        $response = $this->actingAs($user)->postJson('/api/v1/checkout', [
            'event_id' => $event->id,
            'ticket_type' => 'Standard',
            'quantity' => 2,
            'payment_token' => 'fail_me'
        ]);

        $response->assertStatus(400)
                 ->assertJsonPath('error', 'Payment failed');
                 
        $this->assertDatabaseHas('tickets', ['id' => $ticket->id, 'stock_available' => 10]);
    }
}
