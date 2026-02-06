# E-Commerce System Demo

A full-stack e-commerce application built with Spring Boot and Next.js.

## 🚀 Features

### Customer Features
- User Registration & Login (JWT Authentication)
- Product Browsing with Search, Filters & Pagination
- Shopping Cart Management
- Checkout with Address & Payment Method
- Order History & Tracking
- Responsive Design (Mobile & Desktop)

### Admin Features
- Product Management (CRUD)
- Category Management (CRUD)
- Order Management & Status Updates
- Admin Dashboard with Statistics

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- MySQL 8+
- BCrypt Password Hashing
- Maven

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios (API Client)
- React Hook Form
- React Hot Toast

## 📋 Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 18+ and npm
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommrce
```

### 2. Database Setup

Create MySQL database:

```sql
CREATE DATABASE ecommerce_db;
```

The application will automatically create tables on first run. Sample data is provided in `backend/src/main/resources/data.sql`.

### 3. Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Update database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

Build and run:

```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on: http://localhost:8080

### 4. Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env.local` file (already provided):

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Run development server:

```bash
npm run dev
```

Frontend will run on: http://localhost:3000

## 👤 Demo Accounts

### Admin Account
- Email: `admin@example.com`
- Password: `password123`

### Customer Account
- Email: `john@example.com`
- Password: `password123`

Or register a new account.

## 📁 Project Structure

```
ecommrce/
├── backend/
│   ├── src/main/java/com/ecommerce/
│   │   ├── config/          # Security & CORS configuration
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── exception/       # Exception handlers
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT & Security
│   │   └── service/         # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Sample data
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── app/             # Next.js pages & routes
    │   ├── components/      # React components
    │   ├── lib/             # API client
    │   ├── store/           # Zustand stores
    │   └── types/           # TypeScript types
    ├── public/              # Static assets
    ├── package.json
    └── tailwind.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/{id}` - Get product details
- `POST /api/admin/products` - Create product (Admin)
- `PUT /api/admin/products/{id}` - Update product (Admin)
- `DELETE /api/admin/products/{id}` - Delete product (Admin)

### Categories
- `GET /api/categories` - List categories
- `POST /api/admin/categories` - Create category (Admin)
- `PUT /api/admin/categories/{id}` - Update category (Admin)
- `DELETE /api/admin/categories/{id}` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove cart item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order details
- `GET /api/admin/orders` - List all orders (Admin)
- `PUT /api/admin/orders/{id}/status` - Update order status (Admin)

## 🔐 Security

- Passwords hashed using BCrypt
- JWT token-based authentication
- Role-based access control (CUSTOMER, ADMIN)
- CORS configured for frontend
- Input validation on all endpoints

## 🧪 Testing

Access the application:
1. Open browser: http://localhost:3000
2. Browse products without login
3. Register/Login to add to cart
4. Complete checkout process
5. Login as admin to manage products/orders

## 📝 Business Rules

- Email must be unique
- Cannot checkout with empty cart
- Cannot order quantity > stock
- Stock is reduced when order is placed
- Order stores product snapshot (price, name)
- Only admin can change order status
- Payment is demo mode (instant success for card payment)

## 🚢 Deployment

### Backend (Spring Boot)
```bash
cd backend
mvn clean package
java -jar target/ecommerce-backend-1.0.0.jar
```

### Frontend (Next.js)
```bash
cd frontend
npm run build
npm start
```

## 📄 License

This is a demo project for educational purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and modify as needed.

## 📧 Contact

For questions or issues, please open an issue in the repository.
