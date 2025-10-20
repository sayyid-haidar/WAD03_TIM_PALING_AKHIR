# API Testing Guide

## Setup
Server berjalan di: `http://localhost:3000`

## Endpoints Summary

### 👥 Users API
- `GET /users` - Get all users
- `POST /users` - Create user
- `PUT /users/:username` - Update user

### 📦 Products API
- `GET /products` - Get all products
- `GET /products/seller/:sellerId` - Get products by seller
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (requires sellerId)
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### 🛒 Carts API
- `GET /carts/:userId` - Get user's cart
- `POST /carts` - Add item to cart
- `PUT /carts` - Update cart item quantity
- `DELETE /carts` - Remove item from cart
- `DELETE /carts/:userId/clear` - Clear entire cart

---

## Test Scenarios

### 1. Create Seller User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "seller1",
    "name": "Seller Satu",
    "email": "seller1@example.com",
    "role": "seller"
  }'
```

### 2. Create Buyer User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "buyer1",
    "name": "Buyer Satu",
    "email": "buyer1@example.com",
    "role": "buyer"
  }'
```

### 3. Create Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming ASUS ROG",
    "description": "Laptop gaming dengan spesifikasi tinggi",
    "price": 15000000,
    "stock": 10,
    "category": "Electronics",
    "imageUrl": "https://example.com/laptop.jpg",
    "sellerId": "seller1"
  }'
```

### 4. Get All Products
```bash
curl http://localhost:3000/products
```

### 5. Get Product by ID
```bash
curl http://localhost:3000/products/1
```

### 6. Get Products by Seller
```bash
curl http://localhost:3000/products/seller/seller1
```

### 7. Add to Cart
```bash
curl -X POST http://localhost:3000/carts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "buyer1",
    "productId": 1,
    "quantity": 2
  }'
```

### 8. Get Cart
```bash
curl http://localhost:3000/carts/buyer1
```

### 9. Update Cart Quantity
```bash
curl -X PUT http://localhost:3000/carts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "buyer1",
    "productId": 1,
    "quantity": 5
  }'
```

### 10. Remove from Cart
```bash
curl -X DELETE http://localhost:3000/carts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "buyer1",
    "productId": 1
  }'
```

### 11. Update Product
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming ASUS ROG Updated",
    "description": "Updated description",
    "price": 14500000,
    "stock": 8,
    "category": "Electronics",
    "imageUrl": "https://example.com/laptop-new.jpg",
    "sellerId": "seller1"
  }'
```

### 12. Delete Product
```bash
curl -X DELETE http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": "seller1"
  }'
```

### 13. Clear Cart
```bash
curl -X DELETE http://localhost:3000/carts/buyer1/clear
```

---

## Testing with Thunder Client / Postman

### Collection Structure:
```
WAD03_API/
├── Users/
│   ├── Get All Users
│   ├── Create User (Seller)
│   ├── Create User (Buyer)
│   └── Update User
├── Products/
│   ├── Get All Products
│   ├── Get Product by ID
│   ├── Get Products by Seller
│   ├── Create Product
│   ├── Update Product
│   └── Delete Product
└── Carts/
    ├── Get Cart
    ├── Add to Cart
    ├── Update Cart Quantity
    ├── Remove from Cart
    └── Clear Cart
```

---

## Expected Responses

### Success Response (Create Product)
```json
{
  "id": 1,
  "name": "Laptop Gaming ASUS ROG",
  "description": "Laptop gaming dengan spesifikasi tinggi",
  "price": "15000000.00",
  "stock": 10,
  "category": "Electronics",
  "imageUrl": "https://example.com/laptop.jpg",
  "sellerId": 1,
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T10:00:00.000Z"
}
```

### Success Response (Get Cart)
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "product": {
      "id": 1,
      "name": "Laptop Gaming ASUS ROG",
      "price": "15000000.00",
      "stock": 10,
      "imageUrl": "https://example.com/laptop.jpg",
      "seller": {
        "id": 1,
        "username": "seller1",
        "name": "Seller Satu"
      }
    },
    "createdAt": "2025-10-20T10:00:00.000Z",
    "updatedAt": "2025-10-20T10:00:00.000Z"
  }
]
```

### Error Response (Validation)
```json
{
  "message": "Name, price, stock, dan sellerId harus diisi"
}
```

### Error Response (Not Found)
```json
{
  "message": "Product tidak ditemukan"
}
```

### Error Response (Forbidden)
```json
{
  "message": "Anda tidak memiliki akses untuk mengupdate product ini"
}
```

---

## Status Codes

- `200 OK` - Request berhasil
- `201 Created` - Resource berhasil dibuat
- `400 Bad Request` - Validasi gagal
- `403 Forbidden` - Tidak memiliki akses
- `404 Not Found` - Resource tidak ditemukan
- `409 Conflict` - Conflict (username sudah digunakan)
- `500 Internal Server Error` - Server error
