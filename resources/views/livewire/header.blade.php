<header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
                <a href="{{ route('customer.home') }}" class="flex items-center space-x-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">L</span>
                    </div>
                    <span class="text-2xl font-bold text-gray-900">Logo</span>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="{{ route('customer.home') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 {{ request()->routeIs('customer.home') ? 'text-blue-600' : '' }}">
                    Home
                </a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                    About
                </a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                    Services
                </a>
                <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                    Contact
                </a>
            </div>

            <!-- CTA Buttons -->
            <div class="hidden md:flex items-center space-x-4">
                <a href="#" class="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                    Login
                </a>
                <a href="#" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                    Sign Up
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button 
                wire:click="toggleMobileMenu"
                class="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
            >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    @if($showMobileMenu)
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    @else
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    @endif
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        @if($showMobileMenu)
            <div class="md:hidden py-4 border-t border-gray-200">
                <div class="flex flex-col space-y-4">
                    <a href="{{ route('customer.home') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2 {{ request()->routeIs('customer.home') ? 'text-blue-600 bg-blue-50' : '' }}">
                        Home
                    </a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2">
                        About
                    </a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2">
                        Services
                    </a>
                    <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-2">
                        Contact
                    </a>
                    <div class="px-4 pt-4 border-t border-gray-200 space-y-2">
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Login
                        </a>
                        <a href="#" class="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        @endif
    </nav>
</header>
