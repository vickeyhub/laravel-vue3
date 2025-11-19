<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold">
                    <i class="fas fa-th-large mr-2 text-primary"></i>
                    Dashboard
                </h1>
                <p class="text-base-content/70 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            <button class="btn btn-primary gap-2">
                <i class="fas fa-plus"></i>
                New Report
            </button>
        </div>

        <!-- Stats Grid (Widgets) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Total Users -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-base-content/70 text-sm">Total Users</p>
                            <h2 class="text-3xl font-bold mt-2">25.6K</h2>
                            <div class="badge badge-success badge-sm mt-2 gap-1">
                                <i class="fas fa-arrow-up text-xs"></i>
                                21%
                            </div>
                        </div>
                        <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-12 flex items-center justify-center">
                                <i class="fas fa-users text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Revenue -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-base-content/70 text-sm">Revenue</p>
                            <h2 class="text-3xl font-bold mt-2">$45.2K</h2>
                            <div class="badge badge-success badge-sm mt-2 gap-1">
                                <i class="fas fa-arrow-up text-xs"></i>
                                15%
                            </div>
                        </div>
                        <div class="avatar placeholder">
                            <div class="bg-secondary text-secondary-content rounded-full w-12 flex items-center justify-center">
                                <i class="fas fa-dollar-sign text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Orders -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-base-content/70 text-sm">Orders</p>
                            <h2 class="text-3xl font-bold mt-2">1,234</h2>
                            <div class="badge badge-error badge-sm mt-2 gap-1">
                                <i class="fas fa-arrow-down text-xs"></i>
                                5%
                            </div>
                        </div>
                        <div class="avatar placeholder">
                            <div class="bg-accent text-accent-content rounded-full w-12 flex items-center justify-center">
                                <i class="fas fa-shopping-cart text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conversion Rate -->
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div class="card-body">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-base-content/70 text-sm">Conversion</p>
                            <h2 class="text-3xl font-bold mt-2">3.2%</h2>
                            <div class="badge badge-success badge-sm mt-2 gap-1">
                                <i class="fas fa-arrow-up text-xs"></i>
                                8%
                            </div>
                        </div>
                        <div class="avatar placeholder">
                            <div class="bg-info text-info-content rounded-full w-12 flex items-center justify-center">
                                <i class="fas fa-chart-line text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Sales Chart Card -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">
                        <i class="fas fa-chart-area mr-2"></i>
                        Sales Overview
                    </h2>
                    <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg mt-4">
                        <div class="text-center">
                            <i class="fas fa-chart-line text-6xl text-primary opacity-20"></i>
                            <p class="mt-4 text-base-content/50">Chart placeholder</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Activity Card -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">
                        <i class="fas fa-bell mr-2"></i>
                        Recent Activity
                    </h2>
                    <div class="space-y-4 mt-4">
                        <div class="flex gap-4">
                            <div class="avatar placeholder">
                                <div class="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">New user registered</p>
                                <p class="text-sm text-base-content/70">John Doe joined 2 hours ago</p>
                            </div>
                        </div>
                        <div class="divider my-0"></div>
                        <div class="flex gap-4">
                            <div class="avatar placeholder">
                                <div class="bg-success text-success-content rounded-full w-10 flex items-center justify-center">
                                    <i class="fas fa-shopping-bag"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">New order placed</p>
                                <p class="text-sm text-base-content/70">Order #1234 - $299.00</p>
                            </div>
                        </div>
                        <div class="divider my-0"></div>
                        <div class="flex gap-4">
                            <div class="avatar placeholder">
                                <div class="bg-warning text-warning-content rounded-full w-10 flex items-center justify-center">
                                    <i class="fas fa-exclamation"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">Low stock alert</p>
                                <p class="text-sm text-base-content/70">Product XYZ running low</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="card-title">
                        <i class="fas fa-list mr-2"></i>
                        Recent Orders
                    </h2>
                    <button class="btn btn-sm btn-ghost gap-2">
                        View All
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </th>
                                <td class="font-mono text-sm">#ORD-001</td>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-10 h-10">
                                                <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">Hart Hagerty</div>
                                            <div class="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>MacBook Pro M3</td>
                                <td class="font-semibold">$2,499.00</td>
                                <td>
                                    <div class="badge badge-success gap-2">
                                        <i class="fas fa-check"></i>
                                        Completed
                                    </div>
                                </td>
                                <td>2024-01-15</td>
                                <td>
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </div>
                                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a><i class="fas fa-eye mr-2"></i>View</a></li>
                                            <li><a><i class="fas fa-edit mr-2"></i>Edit</a></li>
                                            <li><a><i class="fas fa-trash mr-2"></i>Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </th>
                                <td class="font-mono text-sm">#ORD-002</td>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-10 h-10">
                                                <img src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">Brice Swyre</div>
                                            <div class="text-sm opacity-50">China</div>
                                        </div>
                                    </div>
                                </td>
                                <td>iPad Air</td>
                                <td class="font-semibold">$599.00</td>
                                <td>
                                    <div class="badge badge-warning gap-2">
                                        <i class="fas fa-clock"></i>
                                        Pending
                                    </div>
                                </td>
                                <td>2024-01-14</td>
                                <td>
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </div>
                                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a><i class="fas fa-eye mr-2"></i>View</a></li>
                                            <li><a><i class="fas fa-edit mr-2"></i>Edit</a></li>
                                            <li><a><i class="fas fa-trash mr-2"></i>Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-sm" />
                                    </label>
                                </th>
                                <td class="font-mono text-sm">#ORD-003</td>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-10 h-10">
                                                <img src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">Marjy Ferencz</div>
                                            <div class="text-sm opacity-50">Russia</div>
                                        </div>
                                    </div>
                                </td>
                                <td>AirPods Pro</td>
                                <td class="font-semibold">$249.00</td>
                                <td>
                                    <div class="badge badge-info gap-2">
                                        <i class="fas fa-truck"></i>
                                        Shipping
                                    </div>
                                </td>
                                <td>2024-01-13</td>
                                <td>
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </div>
                                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a><i class="fas fa-eye mr-2"></i>View</a></li>
                                            <li><a><i class="fas fa-edit mr-2"></i>Edit</a></li>
                                            <li><a><i class="fas fa-trash mr-2"></i>Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Dashboard home page with widgets and table
</script>
