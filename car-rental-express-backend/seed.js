const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Users (Agencies and Customers)
    const users = await User.create([
      // Agencies
      {
        name: 'Luxury Cars Agency',
        email: 'luxury@agency.com',
        password: hashedPassword,
        role: 'agency'
      },
      {
        name: 'Budget Rentals',
        email: 'budget@agency.com',
        password: hashedPassword,
        role: 'agency'
      },
      {
        name: 'Premium Auto Rentals',
        email: 'premium@agency.com',
        password: hashedPassword,
        role: 'agency'
      },
      // Customers
      {
        name: 'John Doe',
        email: 'john@customer.com',
        password: hashedPassword,
        role: 'customer'
      },
      {
        name: 'Jane Smith',
        email: 'jane@customer.com',
        password: hashedPassword,
        role: 'customer'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@customer.com',
        password: hashedPassword,
        role: 'customer'
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@customer.com',
        password: hashedPassword,
        role: 'customer'
      }
    ]);

    console.log(`Created ${users.length} users`);

    // Get agency IDs
    const luxuryAgency = users[0];
    const budgetAgency = users[1];
    const premiumAgency = users[2];

    // Create Cars
    const cars = await Car.create([
      // Luxury Cars Agency vehicles
      {
        agency_id: luxuryAgency._id,
        model: 'Mercedes-Benz S-Class',
        vehicle_number: 'LUX-1001',
        seating_capacity: 5,
        rent_per_day: 200
      },
      {
        agency_id: luxuryAgency._id,
        model: 'BMW 7 Series',
        vehicle_number: 'LUX-1002',
        seating_capacity: 5,
        rent_per_day: 180
      },
      {
        agency_id: luxuryAgency._id,
        model: 'Audi A8',
        vehicle_number: 'LUX-1003',
        seating_capacity: 5,
        rent_per_day: 190
      },
      {
        agency_id: luxuryAgency._id,
        model: 'Lexus LS',
        vehicle_number: 'LUX-1004',
        seating_capacity: 5,
        rent_per_day: 175
      },
      
      // Budget Rentals vehicles
      {
        agency_id: budgetAgency._id,
        model: 'Toyota Corolla',
        vehicle_number: 'BUD-2001',
        seating_capacity: 5,
        rent_per_day: 35
      },
      {
        agency_id: budgetAgency._id,
        model: 'Honda Civic',
        vehicle_number: 'BUD-2002',
        seating_capacity: 5,
        rent_per_day: 40
      },
      {
        agency_id: budgetAgency._id,
        model: 'Hyundai Elantra',
        vehicle_number: 'BUD-2003',
        seating_capacity: 5,
        rent_per_day: 38
      },
      {
        agency_id: budgetAgency._id,
        model: 'Nissan Sentra',
        vehicle_number: 'BUD-2004',
        seating_capacity: 5,
        rent_per_day: 36
      },
      {
        agency_id: budgetAgency._id,
        model: 'Kia Forte',
        vehicle_number: 'BUD-2005',
        seating_capacity: 5,
        rent_per_day: 37
      },
      
      // Premium Auto Rentals vehicles
      {
        agency_id: premiumAgency._id,
        model: 'Toyota Camry',
        vehicle_number: 'PRE-3001',
        seating_capacity: 5,
        rent_per_day: 70
      },
      {
        agency_id: premiumAgency._id,
        model: 'Honda Accord',
        vehicle_number: 'PRE-3002',
        seating_capacity: 5,
        rent_per_day: 75
      },
      {
        agency_id: premiumAgency._id,
        model: 'Mazda6',
        vehicle_number: 'PRE-3003',
        seating_capacity: 5,
        rent_per_day: 68
      },
      {
        agency_id: premiumAgency._id,
        model: 'Subaru Legacy',
        vehicle_number: 'PRE-3004',
        seating_capacity: 5,
        rent_per_day: 72
      },
      {
        agency_id: premiumAgency._id,
        model: 'Volkswagen Passat',
        vehicle_number: 'PRE-3005',
        seating_capacity: 5,
        rent_per_day: 73
      },
      {
        agency_id: premiumAgency._id,
        model: 'Toyota RAV4',
        vehicle_number: 'PRE-3006',
        seating_capacity: 5,
        rent_per_day: 80
      }
    ]);

    console.log(`Created ${cars.length} cars`);

    // Get customer IDs
    const johnDoe = users[3];
    const janeSmith = users[4];
    const mikeJohnson = users[5];

    // Create some sample bookings
    const bookings = await Booking.create([
      {
        car_id: cars[4]._id, // Toyota Corolla
        customer_id: johnDoe._id,
        start_date: new Date('2026-02-20'),
        days: 3
      },
      {
        car_id: cars[9]._id, // Toyota Camry
        customer_id: janeSmith._id,
        start_date: new Date('2026-02-25'),
        days: 5
      },
      {
        car_id: cars[0]._id, // Mercedes-Benz
        customer_id: mikeJohnson._id,
        start_date: new Date('2026-03-01'),
        days: 2
      },
      {
        car_id: cars[5]._id, // Honda Civic
        customer_id: johnDoe._id,
        start_date: new Date('2026-03-10'),
        days: 7
      }
    ]);

    console.log(`Created ${bookings.length} bookings`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('\nAgencies:');
    console.log('  Email: luxury@agency.com | Password: password123');
    console.log('  Email: budget@agency.com | Password: password123');
    console.log('  Email: premium@agency.com | Password: password123');
    console.log('\nCustomers:');
    console.log('  Email: john@customer.com | Password: password123');
    console.log('  Email: jane@customer.com | Password: password123');
    console.log('  Email: mike@customer.com | Password: password123');
    console.log('  Email: sarah@customer.com | Password: password123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
