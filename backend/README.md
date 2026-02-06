# E-Commerce Backend - Spring Boot

REST API for E-Commerce System Demo.

## Quick Start

1. **Install Prerequisites**
   - JDK 17+
   - Maven 3.6+
   - MySQL 8.0+

2. **Create Database**
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

3. **Configure Database**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

4. **Run Application**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access API**
   - Base URL: http://localhost:8080
   - API Docs: http://localhost:8080/api

## Configuration

### JWT Secret
Change JWT secret in `application.properties` for production:
```properties
jwt.secret=YOUR_SECURE_SECRET_KEY_HERE
jwt.expiration=86400000
```

### CORS
Update allowed origins:
```properties
cors.allowed-origins=http://localhost:3000,https://yourdomain.com
```

## Sample Data

Sample data is automatically loaded from `src/main/resources/data.sql`:
- Default admin: admin@example.com / password123
- Demo products across 5 categories
- 2 demo customer accounts

## API Testing

Use tools like Postman or curl:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get Products
curl -X GET http://localhost:8080/api/products

# Create Product (with JWT token)
curl -X POST http://localhost:8080/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name":"New Product",
    "description":"Product description",
    "price":99.99,
    "stock":50,
    "categoryId":1,
    "imageUrl":"https://example.com/image.jpg"
  }'
```

## Build for Production

```bash
mvn clean package
java -jar target/ecommerce-backend-1.0.0.jar
```

## Database Schema

The application uses JPA Auto DDL to create tables:
- users
- categories
- products
- carts
- cart_items
- orders
- order_items

## Troubleshooting

**MySQL Connection Issues:**
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists

**Port Already in Use:**
Change port in application.properties:
```properties
server.port=8081
```

**Build Failures:**
```bash
mvn clean install -U
```
