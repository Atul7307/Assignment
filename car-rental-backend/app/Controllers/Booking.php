<?php

namespace App\Controllers;

use App\Models\BookingModel;

class Booking extends BaseController
{
    public function rent()
    {
        if (session()->get('role') !== 'customer') {
            return $this->response->setJSON(['error' => 'Only customers can book']);
        }

        $data = $this->request->getJSON(true);
        $model = new BookingModel();

        $model->insert([
            'car_id' => $data['car_id'],
            'customer_id' => session()->get('user_id'),
            'start_date' => $data['start_date'],
            'days' => $data['days']
        ]);

        return $this->response->setJSON(['status' => 'car booked']);
    }

    public function agencyBookings()
    {
        if (session()->get('role') !== 'agency') {
            return $this->response->setJSON(['error' => 'Unauthorized']);
        }

        $db = \Config\Database::connect();

        $agencyId = session()->get('user_id');

        $query = $db->query("
            SELECT bookings.*, users.name AS customer_name, cars.model
            FROM bookings
            JOIN cars ON bookings.car_id = cars.id
            JOIN users ON bookings.customer_id = users.id
            WHERE cars.agency_id = ?
        ", [$agencyId]);

        return $this->response->setJSON($query->getResult());
    }

}
