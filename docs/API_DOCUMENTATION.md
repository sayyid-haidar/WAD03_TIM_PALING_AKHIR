# API Documentation - Products & Carts

## Products API

### 1. Get All Products
**Endpoint:** `GET /products`

**Description:** Mendapatkan semua produk yang tersedia

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description",
    "price": "99.99",
    "stock": 100,
    "category": "Electronics",
    "imageUrl": "https://example.com/image.jpg",
    "sellerId": 1,
    "seller": {
      "id": 1,
      "username": "seller1",
      "name": "Seller Name",
      "email": "seller@example.com"
    },
    "createdAt": "2025-10-20T00:00:00.000Z",
    "updatedAt": "2025-10-20T00:00:00.000Z"
  }
]
```

---

### 2. Get Product by ID
**Endpoint:** `GET /products/:id`

**Description:** Mendapatkan detail produk berdasarkan ID

**Parameters:**
- `id` (path) - ID produk

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product Description",
  "price": "99.99",
  "stock": 100,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg",
  "sellerId": 1,
  "seller": {
    "id": 1,
    "username": "seller1",
    "name": "Seller Name",
    "email": "seller@example.com"
  },
  "createdAt": "2025-10-20T00:00:00.000Z",
  "updatedAt": "2025-10-20T00:00:00.000Z"
}
```

**Error Response:**
- `404 Not Found` - Product tidak ditemukan

---

### 3. Get Products by Seller
**Endpoint:** `GET /products/seller/:sellerId`

**Description:** Mendapatkan semua produk dari seller tertentu

**Parameters:**
- `sellerId` (path) - Username seller

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description",
    "price": "99.99",
    "stock": 100,
    "category": "Electronics",
    "imageUrl": "https://example.com/image.jpg",
    "sellerId": 1,
    "seller": {
      "id": 1,
      "username": "seller1",
      "name": "Seller Name",
      "email": "seller@example.com"
    }
  }
]
```

**Error Response:**
- `404 Not Found` - Seller tidak ditemukan

---

### 4. Create Product
**Endpoint:** `POST /products`

**Description:** Membuat produk baru (hanya untuk seller)

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "stock": 100,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg",
  "sellerId": "seller1"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product Description",
  "price": "99.99",
  "stock": 100,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg",
  "sellerId": 1,
  "createdAt": "2025-10-20T00:00:00.000Z",
  "updatedAt": "2025-10-20T00:00:00.000Z"
}
```

**Error Response:**
- `400 Bad Request` - Field wajib tidak diisi / validasi gagal
- `404 Not Found` - Seller tidak ditemukan / User bukan seller

---

### 5. Update Product
**Endpoint:** `PUT /products/:id`

**Description:** Mengupdate produk (hanya owner/seller yang bersangkutan)

**Parameters:**
- `id` (path) - ID produk

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated Description",
  "price": 129.99,
  "stock": 80,
  "category": "Electronics",
  "imageUrl": "https://example.com/new-image.jpg",
  "sellerId": "seller1"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated Description",
  "price": "129.99",
  "stock": 80,
  "category": "Electronics",
  "imageUrl": "https://example.com/new-image.jpg",
  "sellerId": 1,
  "updatedAt": "2025-10-20T00:00:00.000Z"
}
```

**Error Response:**
- `400 Bad Request` - Field wajib tidak diisi / validasi gagal
- `403 Forbidden` - Tidak memiliki akses untuk mengupdate
- `404 Not Found` - Product tidak ditemukan

---

### 6. Delete Product
**Endpoint:** `DELETE /products/:id`

**Description:** Menghapus produk (hanya owner/seller yang bersangkutan)

**Parameters:**
- `id` (path) - ID produk

**Request Body:**
```json
{
  "sellerId": "seller1"
}
```

**Response:**
```json
{
  "message": "Product berhasil dihapus"
}
```

**Error Response:**
- `400 Bad Request` - SellerId tidak diisi
- `403 Forbidden` - Tidak memiliki akses untuk menghapus
- `404 Not Found` - Product tidak ditemukan

---

## Carts API

### 1. Get Cart
**Endpoint:** `GET /carts/:userId`

**Description:** Mendapatkan isi cart user

**Parameters:**
- `userId` (path) - Username user

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "product": {
      "id": 1,
      "name": "Product Name",
      "price": "99.99",
      "stock": 100,
      "imageUrl": "https://example.com/image.jpg",
      "seller": {
        "id": 1,
        "username": "seller1",
        "name": "Seller Name"
      }
    },
    "createdAt": "2025-10-20T00:00:00.000Z",
    "updatedAt": "2025-10-20T00:00:00.000Z"
  }
]
```

**Error Response:**
- `404 Not Found` - User tidak ditemukan

---

### 2. Add to Cart
**Endpoint:** `POST /carts`

**Description:** Menambahkan produk ke cart

**Request Body:**
```json
{
  "userId": "buyer1",
  "productId": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 2,
  "createdAt": "2025-10-20T00:00:00.000Z",
  "updatedAt": "2025-10-20T00:00:00.000Z"
}
```

**Error Response:**
- `400 Bad Request` - Field wajib tidak diisi / Stock tidak mencukupi / Quantity tidak valid
- `404 Not Found` - User atau Product tidak ditemukan

---

### 3. Update Cart Quantity
**Endpoint:** `PUT /carts`

**Description:** Mengupdate quantity item di cart

**Request Body:**
```json
{
  "userId": "buyer1",
  "productId": 1,
  "quantity": 5
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 5,
  "updatedAt": "2025-10-20T00:00:00.000Z"
}
```

**Error Response:**
- `400 Bad Request` - Field wajib tidak diisi / Stock tidak mencukupi / Quantity tidak valid
- `404 Not Found` - User, Product, atau Item di cart tidak ditemukan

---

### 4. Remove from Cart
**Endpoint:** `DELETE /carts`

**Description:** Menghapus item dari cart

**Request Body:**
```json
{
  "userId": "buyer1",
  "productId": 1
}
```

**Response:**
```json
{
  "message": "Item berhasil dihapus dari cart"
}
```

**Error Response:**
- `400 Bad Request` - Field wajib tidak diisi
- `404 Not Found` - User atau Item tidak ditemukan

---

### 5. Clear Cart
**Endpoint:** `DELETE /carts/:userId/clear`

**Description:** Mengosongkan seluruh cart user

**Parameters:**
- `userId` (path) - Username user

**Response:**
```json
{
  "message": "Cart berhasil dikosongkan"
}
```

**Error Response:**
- `404 Not Found` - User tidak ditemukan

---

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(255),
  imageUrl VARCHAR(255),
  sellerId INTEGER NOT NULL REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Carts Table
```sql
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id),
  productId INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing dengan Postman/Thunder Client

### Contoh Test Flow:

1. **Create User (Seller)**
```
POST /users
{
  "username": "seller1",
  "name": "Seller Satu",
  "email": "seller1@example.com",
  "role": "seller"
}
```

2. **Create User (Buyer)**
```
POST /users
{
  "username": "buyer1",
  "name": "Buyer Satu",
  "email": "buyer1@example.com",
  "role": "buyer"
}
```

3. **Create Product**
```
POST /products
{
  "name": "Laptop Gaming",
  "description": "Laptop gaming spek tinggi",
  "price": 15000000,
  "stock": 10,
  "category": "Electronics",
  "imageUrl": "https://example.com/laptop.jpg",
  "sellerId": "seller1"
}
```

4. **Add to Cart**
```
POST /carts
{
  "userId": "buyer1",
  "productId": 1,
  "quantity": 2
}
```

5. **Get Cart**
```
GET /carts/buyer1
```
