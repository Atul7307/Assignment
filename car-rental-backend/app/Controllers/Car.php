<?php

namespace App\Controllers;

use App\Models\CarModel;

class Car extends BaseController
{
    public function index()
    {
        $model = new CarModel();
        return $this->response->setJSON($model->findAll());
    }

    public function create()
    {
        if (session()->get('role') !== 'agency') {
            return $this->response->setJSON(['error' => 'Unauthorized']);
        }

        $data = $this->request->getJSON(true);
        $model = new CarModel();

        $model->insert([
            'agency_id' => session()->get('user_id'),
            'model' => $data['model'],
            'vehicle_number' => $data['vehicle_number'],
            'seating_capacity' => $data['seating_capacity'],
            'rent_per_day' => $data['rent_per_day']
        ]);

        return $this->response->setJSON(['status' => 'car added']);
    }

    public function update($id)
    {
        if (session()->get('role') !== 'agency') {
            return $this->response->setJSON(['error' => 'Unauthorized']);
        }

        $model = new \App\Models\CarModel();
        $car = $model->find($id);

        // check ownership
        if (!$car || $car['agency_id'] != session()->get('user_id')) {
            return $this->response->setJSON(['error' => 'You can edit only your cars']);
        }

        $data = $this->request->getJSON(true);

        $model->update($id, [
            'model' => $data['model'],
            'vehicle_number' => $data['vehicle_number'],
            'seating_capacity' => $data['seating_capacity'],
            'rent_per_day' => $data['rent_per_day']
        ]);

        return $this->response->setJSON(['status' => 'car updated']);
    }

    public function agencyCars()
    {
        if (session()->get('role') !== 'agency') {
            return $this->response->setJSON(['error' => 'Unauthorized']);
        }

        $model = new CarModel();
        $agencyId = session()->get('user_id');
        
        $cars = $model->where('agency_id', $agencyId)->findAll();
        
        return $this->response->setJSON($cars);
    }
}
