<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function getUsers(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $role = $request->input('role', 'all');

        $query = User::query();

        // Search by name or email
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        // Filter by role
        if ($role === 'admin') {
            $query->where('is_admin', true);
        } elseif ($role === 'user') {
            $query->where('is_admin', false);
        }

        // Order by created_at descending (newest first)
        $query->orderBy('created_at', 'desc');

        // Paginate results
        $users = $query->paginate($perPage);

        // Get total counts for stats
        $totalUsers = User::count();
        $totalAdmins = User::where('is_admin', true)->count();
        $totalRegularUsers = User::where('is_admin', false)->count();

        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
            ],
            'stats' => [
                'total_users' => $totalUsers,
                'total_admins' => $totalAdmins,
                'total_regular_users' => $totalRegularUsers,
            ],
        ]);
    }

    public function getUser($id){
        $user = User::find($id);
        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }
}
