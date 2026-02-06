# E-Commerce System - Complete Setup Guide

This guide will walk you through setting up the complete E-Commerce System from scratch.

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Database Configuration](#database-configuration)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required Software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| Java JDK | 17+ | https://adoptium.net/ |
| Maven | 3.6+ | https://maven.apache.org/download.cgi |
| Node.js | 18+ | https://nodejs.org/ |
| MySQL | 8.0+ | https://dev.mysql.com/downloads/ |
| Git | Latest | https://git-scm.com/ |

### Verify Installations

Open terminal/command prompt and verify:

```bash
# Java
java -version
# Should show: openjdk version "17.x.x" or higher

# Maven
mvn -version
# Should show: Apache Maven 3.6.x or higher

# Node.js
node -v
# Should show: v18.x.x or higher

# npm
npm -v
# Should show: 9.x.x or higher

# MySQL
mysql --version
# Should show: mysql Ver 8.0.x or higher
```

---

## Initial Setup

### 1. Clone or Extract Project

If you have a Git repository:
```bash
git clone <repository-url>
cd ecommrce
```

If you have a ZIP file, extract it and navigate to the folder:
```bash
cd path/to/ecommrce
```

### 2. Project Structure Verification

Ensure you have these directories:
```
ecommrce/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

---

## Database Configuration

### 1. Start MySQL Server

**Windows:**
- Start MySQL from Services or MySQL Workbench

**Mac:**
```bash
mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
```

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE ecommerce_db;
```

Verify database creation:
```sql
SHOW DATABASES;
```

### 3. Create MySQL User (Optional but Recommended)

```sql
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce_password';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Test Database Connection

```bash
mysql -u ecommerce_user -p ecommerce_db
# Enter password: ecommerce_password
```

Type `exit` to leave MySQL.

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Configure Application Properties

Open `src/main/resources/application.properties` and update:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=ecommerce_user
spring.datasource.password=ecommerce_password

# Port (change if 8080 is busy)
server.port=8080
```

### 3. Build the Project

```bash
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX s
```

**If build fails:**
- Check internet connection (Maven downloads dependencies)
- Verify Java version: `java -version`
- Clear Maven cache: `mvn clean install -U`

### 4. Run Backend

```bash
mvn spring-boot:run
```

**Expected Output:**
```
Started EcommerceApplication in X.XXX seconds
```

**Backend is ready when you see:**
```
Tomcat started on port(s): 8080 (http)
```

### 5. Verify Backend is Running

Open browser or use curl:
```bash
curl http://localhost:8080/api/products
```

You should see JSON response with products list.

**Keep this terminal window open** - backend must run continuously.

---

## Frontend Setup

### 1. Open New Terminal

**Keep backend terminal running** and open a new terminal/command prompt.

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

(If you're in backend directory, use: `cd ../frontend`)

### 3. Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added XXX packages in XXs
```

**If installation fails:**
- Try: `npm install --legacy-peer-deps`
- Delete `node_modules` and `package-lock.json`, then retry
- Check npm version: `npm -v`

### 4. Configure Environment

Verify `.env.local` file exists with:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**If file doesn't exist, create it:**
```bash
# Windows
echo NEXT_PUBLIC_API_URL=http://localhost:8080/api > .env.local

# Mac/Linux
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
```

### 5. Run Frontend

```bash
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000
```

**Frontend is ready when you see:**
```
✓ Ready in X.Xs
```

---

## Running the Application

### 1. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

### 2. Test Guest Features

- Browse products on homepage
- Click "Products" to see all products
- Use search and filters
- View product details

### 3. Register New Account

- Click "Register" in top-right
- Fill in details:
  - Name: Your Name
  - Email: your@email.com
  - Password: password123 (min 6 characters)
- Click "Create account"
- You'll be redirected to products page

### 4. Test Customer Features

Once logged in:
- Add products to cart
- View cart
- Proceed to checkout
- Complete order with demo payment
- View order history

### 5. Test Admin Features

Login with admin account:
- Email: `admin@example.com`
- Password: `password123`

Admin can:
- Click "Admin" in navigation
- Manage Products (Add, Edit, Delete)
- Manage Categories (Add, Edit, Delete)
- View and Update Orders

---

## Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register new customer account
- [ ] Login with credentials
- [ ] Logout
- [ ] Login with admin account

#### Products
- [ ] Browse products
- [ ] Search products
- [ ] Filter by category
- [ ] Filter by price range
- [ ] View product details
- [ ] Pagination works

#### Shopping Cart
- [ ] Add product to cart
- [ ] Update quantity
- [ ] Remove item
- [ ] Cart persists after refresh

#### Checkout
- [ ] Cannot checkout without login
- [ ] Fill delivery address and phone
- [ ] Select payment method
- [ ] Complete order
- [ ] Stock reduces after order

#### Orders
- [ ] View order history
- [ ] View order details
- [ ] See order status

#### Admin
- [ ] Create new product
- [ ] Edit product
- [ ] Delete product
- [ ] Create category
- [ ] Edit category
- [ ] View all orders
- [ ] Update order status

### API Testing with curl

```bash
# Get all products
curl http://localhost:8080/api/products

# Get categories
curl http://localhost:8080/api/categories

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

---

## Troubleshooting

### Backend Issues

#### Port 8080 Already in Use
**Error:** `Port 8080 was already in use`

**Solution 1:** Change backend port in `application.properties`:
```properties
server.port=8081
```
Then update frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

**Solution 2:** Kill process using port 8080:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

#### Database Connection Error
**Error:** `Could not connect to database`

**Solutions:**
1. Verify MySQL is running
2. Check credentials in `application.properties`
3. Test MySQL connection: `mysql -u root -p`
4. Verify database exists: `SHOW DATABASES;`

#### Maven Build Fails
**Error:** `Build failure`

**Solutions:**
```bash
# Clear Maven cache
mvn clean install -U

# Skip tests
mvn clean install -DskipTests

# Check Java version
java -version  # Must be 17+
```

### Frontend Issues

#### npm install Fails
**Error:** `npm ERR!`

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# Try legacy peer deps
npm install --legacy-peer-deps
```

#### Port 3000 Already in Use
**Error:** `Port 3000 is already in use`

**Solutions:**
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

#### API Connection Error
**Error:** `Network Error` or `Cannot connect to backend`

**Solutions:**
1. Verify backend is running on port 8080
2. Check `.env.local` has correct API URL
3. Restart frontend: `Ctrl+C` then `npm run dev`
4. Check browser console for CORS errors

#### Images Not Loading
**Error:** Images show broken

**Solutions:**
1. Check internet connection (images are from Unsplash)
2. Update `next.config.js` domains if needed
3. Images will load on refresh if slow connection

### Database Issues

#### Tables Not Created
**Solution:** JPA auto-creates tables on first run. If not:
```sql
-- Check if tables exist
USE ecommerce_db;
SHOW TABLES;

-- If no tables, restart backend with:
spring.jpa.hibernate.ddl-auto=create
```
**Note:** This will drop existing tables! Use `update` for normal operation.

#### Sample Data Not Loading
**Solution:** Run SQL manually:
```bash
mysql -u ecommerce_user -p ecommerce_db < backend/src/main/resources/data.sql
```

### General Issues

#### Page Not Loading / Blank Screen
**Solutions:**
1. Clear browser cache
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Try incognito/private window
4. Check browser console (F12) for errors

#### Slow Performance
**Solutions:**
1. Increase JVM memory for backend:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx1024m"
   ```
2. Close unnecessary applications
3. Reduce product image quality if poor internet

---

## Production Deployment

### Build Production Artifacts

**Backend:**
```bash
cd backend
mvn clean package
# JAR file created: target/ecommerce-backend-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Creates optimized .next folder
```

### Run Production

**Backend:**
```bash
java -jar target/ecommerce-backend-1.0.0.jar
```

**Frontend:**
```bash
npm start
# Or use PM2, Docker, Vercel, etc.
```

---

## Support

### Getting Help

1. Check this guide thoroughly
2. Review README.md files in backend/ and frontend/
3. Check application logs for errors
4. Verify all prerequisites are installed correctly

### Common Questions

**Q: Can I use PostgreSQL instead of MySQL?**
A: Yes! Update dependencies in pom.xml and connection string in application.properties

**Q: How do I add more products?**
A: Login as admin and use Product Management page, or add to data.sql

**Q: Can I deploy to cloud?**
A: Yes! Backend works on any Java hosting, Frontend on Vercel/Netlify

**Q: Is this production-ready?**
A: This is a demo. For production, add: SSL, email verification, payment gateway, monitoring, etc.

---

## Next Steps

1. ✅ Explore the application
2. ✅ Add your own products and categories
3. ✅ Customize colors in `tailwind.config.js`
4. ✅ Modify business logic as needed
5. ✅ Add new features (reviews, wishlists, etc.)

---

**Happy Coding! 🚀**
