# Sample Data - Car Rental Database

This document describes the sample data that gets populated when you run `npm run seed`.

## Users Created

### Agencies (3 total)

#### 1. Luxury Cars Agency
- **Email:** luxury@agency.com
- **Password:** password123
- **Role:** agency
- **Cars:** 4 luxury vehicles

#### 2. Budget Rentals
- **Email:** budget@agency.com
- **Password:** password123
- **Role:** agency
- **Cars:** 5 budget-friendly vehicles

#### 3. Premium Auto Rentals
- **Email:** premium@agency.com
- **Password:** password123
- **Role:** agency
- **Cars:** 6 mid-range vehicles

### Customers (4 total)

#### 1. John Doe
- **Email:** john@customer.com
- **Password:** password123
- **Role:** customer
- **Bookings:** 2

#### 2. Jane Smith
- **Email:** jane@customer.com
- **Password:** password123
- **Role:** customer
- **Bookings:** 1

#### 3. Mike Johnson
- **Email:** mike@customer.com
- **Password:** password123
- **Role:** customer
- **Bookings:** 1

#### 4. Sarah Williams
- **Email:** sarah@customer.com
- **Password:** password123
- **Role:** customer
- **Bookings:** 0

---

## Cars Created (15 total)

### Luxury Cars Agency (4 vehicles)

1. **Mercedes-Benz S-Class**
   - Vehicle Number: LUX-1001
   - Seating: 5
   - Rent: $200/day

2. **BMW 7 Series**
   - Vehicle Number: LUX-1002
   - Seating: 5
   - Rent: $180/day

3. **Audi A8**
   - Vehicle Number: LUX-1003
   - Seating: 5
   - Rent: $190/day

4. **Lexus LS**
   - Vehicle Number: LUX-1004
   - Seating: 5
   - Rent: $175/day

### Budget Rentals (5 vehicles)

1. **Toyota Corolla**
   - Vehicle Number: BUD-2001
   - Seating: 5
   - Rent: $35/day

2. **Honda Civic**
   - Vehicle Number: BUD-2002
   - Seating: 5
   - Rent: $40/day

3. **Hyundai Elantra**
   - Vehicle Number: BUD-2003
   - Seating: 5
   - Rent: $38/day

4. **Nissan Sentra**
   - Vehicle Number: BUD-2004
   - Seating: 5
   - Rent: $36/day

5. **Kia Forte**
   - Vehicle Number: BUD-2005
   - Seating: 5
   - Rent: $37/day

### Premium Auto Rentals (6 vehicles)

1. **Toyota Camry**
   - Vehicle Number: PRE-3001
   - Seating: 5
   - Rent: $70/day

2. **Honda Accord**
   - Vehicle Number: PRE-3002
   - Seating: 5
   - Rent: $75/day

3. **Mazda6**
   - Vehicle Number: PRE-3003
   - Seating: 5
   - Rent: $68/day

4. **Subaru Legacy**
   - Vehicle Number: PRE-3004
   - Seating: 5
   - Rent: $72/day

5. **Volkswagen Passat**
   - Vehicle Number: PRE-3005
   - Seating: 5
   - Rent: $73/day

6. **Toyota RAV4**
   - Vehicle Number: PRE-3006
   - Seating: 5
   - Rent: $80/day

---

## Bookings Created (4 total)

1. **John Doe** books **Toyota Corolla** (BUD-2001)
   - Start Date: February 20, 2026
   - Duration: 3 days
   - Total Cost: $105

2. **Jane Smith** books **Toyota Camry** (PRE-3001)
   - Start Date: February 25, 2026
   - Duration: 5 days
   - Total Cost: $350

3. **Mike Johnson** books **Mercedes-Benz S-Class** (LUX-1001)
   - Start Date: March 1, 2026
   - Duration: 2 days
   - Total Cost: $400

4. **John Doe** books **Honda Civic** (BUD-2002)
   - Start Date: March 10, 2026
   - Duration: 7 days
   - Total Cost: $280

---

## Summary Statistics

- **Total Users:** 7 (3 agencies + 4 customers)
- **Total Cars:** 15
- **Total Bookings:** 4
- **Price Range:** $35/day - $200/day
- **Average Rental:** $283.75

---

## Testing Scenarios

### Scenario 1: Budget Customer
Login as: `john@customer.com`
- Browse all 15 cars
- Filter by budget options ($35-$40/day)
- Book Toyota Corolla or Honda Civic
- View booking confirmation

### Scenario 2: Luxury Customer
Login as: `sarah@customer.com`
- Browse luxury cars ($175-$200/day)
- Book Mercedes-Benz or BMW
- Experience premium service

### Scenario 3: Agency Management
Login as: `budget@agency.com`
- View your 5 cars
- Edit car details (price, vehicle number)
- Add new car to fleet
- View all bookings for your cars

### Scenario 4: Multi-Agency Comparison
- Browse cars from all 3 agencies
- Compare prices across agencies
- See variety from budget to luxury

---

## How to Re-seed

If you want to reset the database with fresh sample data:

```bash
npm run seed
```

This will:
1. Delete all existing users, cars, and bookings
2. Create new sample data
3. Display login credentials in the console

**Note:** All passwords in sample data are `password123` for easy testing.
