<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function register()
    {
        try {
            $model = new \App\Models\UserModel();
            $data = $this->request->getJSON(true);

            if (!$data) {
                return $this->response->setJSON(['error' => 'No JSON received']);
            }

            if (!isset($data['name']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
                return $this->response->setJSON(['error' => 'All fields are required']);
            }

            // Check if email already exists
            $existing = $model->where('email', $data['email'])->first();
            if ($existing) {
                return $this->response->setJSON(['error' => 'Email already registered']);
            }

            $model->insert([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => password_hash($data['password'], PASSWORD_DEFAULT),
                'role' => $data['role']
            ]);

            return $this->response->setJSON(['status' => 'registered', 'message' => 'Registration successful']);
        } catch (\Exception $e) {
            log_message('error', 'Register error: ' . $e->getMessage());
            return $this->response->setJSON(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }


    public function login()
    {
        try {
            $model = new UserModel();
            $data = $this->request->getJSON(true);

            if (!$data || !isset($data['email']) || !isset($data['password'])) {
                return $this->response->setJSON(['error' => 'Email and password required']);
            }

            $user = $model->where('email', $data['email'])->first();

            if (!$user || !password_verify($data['password'], $user['password'])) {
                return $this->response->setJSON(['error' => 'Invalid credentials']);
            }

            session()->set([
                'user_id' => $user['id'],
                'role' => $user['role'],
                'name' => $user['name']
            ]);

            return $this->response->setJSON([
                'status' => 'login success',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);
        } catch (\Exception $e) {
            log_message('error', 'Login error: ' . $e->getMessage());
            return $this->response->setJSON(['error' => 'Server error: ' . $e->getMessage()]);
        }
    }

    public function logout()
    {
        session()->destroy();
        return $this->response->setJSON(['status' => 'logged out']);
    }

    public function me()
    {
        $userId = session()->get('user_id');
        
        if (!$userId) {
            return $this->response->setJSON(['error' => 'Not authenticated']);
        }

        $model = new UserModel();
        $user = $model->find($userId);

        if (!$user) {
            return $this->response->setJSON(['error' => 'User not found']);
        }

        return $this->response->setJSON([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    }
}
