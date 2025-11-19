<?php

namespace App\Livewire;

use Livewire\Component;

class Footer extends Component
{
    public $email = '';

    public function subscribe()
    {
        $this->validate([
            'email' => 'required|email',
        ]);

        // Handle subscription logic here
        session()->flash('message', 'Thank you for subscribing!');
        $this->email = '';
    }

    public function render()
    {
        return view('livewire.footer');
    }
}
