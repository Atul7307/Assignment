<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Preflight OPTIONS requests for CORS
$routes->options('api/register', static function() {return ''; });

$routes->options('api/login', static function() {return '';});

$routes->options('api/logout', static function() {return '';});

$routes->options('api/me', static function() {return '';});

$routes->options('api/cars', static function() {return '';});

$routes->options('api/cars/(:num)', static function() { return ''; });

$routes->options('api/agency/cars', static function() { return ''; });

$routes->options('api/book', static function() { return ''; });

$routes->options('api/agency/bookings', static function() {return '';});

$routes->post('api/register', 'Auth::register');
$routes->post('api/login', 'Auth::login');
$routes->post('api/logout', 'Auth::logout');
$routes->get('api/me', 'Auth::me');

$routes->get('api/cars', 'Car::index');
$routes->post('api/cars', 'Car::create');
$routes->put('api/cars/(:num)', 'Car::update/$1');
$routes->get('api/agency/cars', 'Car::agencyCars');

$routes->post('api/book', 'Booking::rent');
$routes->get('api/agency/bookings', 'Booking::agencyBookings');

