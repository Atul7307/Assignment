<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Preflight OPTIONS requests for CORS
$routes->options('api/register', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/login', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/logout', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/me', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/cars', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/cars/(:num)', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/agency/cars', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/book', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

$routes->options('api/agency/bookings', static function() {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->setHeader('Access-Control-Allow-Credentials', 'true')
        ->setStatusCode(200);
});

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

