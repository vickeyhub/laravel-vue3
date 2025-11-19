<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Welcome')</title>
    @vite(['resources/css/app.css', 'resources/js/customer.js'])
    @livewireStyles
</head>
<body class="flex flex-col min-h-screen">
    <livewire:header />
    
    <main class="flex-grow">
        @yield('content')
    </main>
    
    <livewire:footer />
    
    @livewireScripts
</body>
</html>

