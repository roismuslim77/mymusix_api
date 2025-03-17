# MyMusix API

API sederhana untuk mengelola lagu menggunakan **NestJS** dan **MongoDB**, serta dilengkapi dengan **JWT Authentication**.

---

## Dokumentasi
- Swagger: http://localhost:3000/api/docs/
- Postman: MyMusix.postman_collection.json
---

## Teknologi yang Digunakan
- **NestJS** (Framework Node.js)
- **MongoDB** (Database NoSQL)
- **Mongoose** (ODM untuk MongoDB)
- **JWT** (JSON Web Token untuk autentikasi)
- **Multer** (Upload file musik ke penyimpanan lokal)

---

## Instalasi dan Menjalankan API

1. **Clone repository ini**
```sh
git clone <repo-url>
cd mymusix
```

2. **Install dependencies**
```sh
npm install --legacy-peer-deps
```

3. **Buat file `.env`** dan tambahkan konfigurasi berikut:
```env
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=1h
MONGO_URI=mongodb://localhost:27017/music-api
```

4. **Jalankan server**
```sh
npm run start:dev
```

---

## Autentikasi (JWT)
Sebelum mengakses API, pengguna harus **register dan login** untuk mendapatkan token JWT.

### ** 1 Register**
```http
POST /auth/register
```
**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

### ** 2 Login**
```http
POST /auth/login
```
**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
 **Respon:**
```json
{
  "access_token": "<JWT_TOKEN>"
}
```

Gunakan **token** ini untuk mengakses endpoint yang memerlukan autentikasi.

---

## API Songs
Semua endpoint lagu memerlukan **Bearer Token** dalam header.

### ** Upload Lagu**
```http
POST /songs/upload
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```
**Body:**
- `file`: (mp3 file)
- `title`: judul lagu
- `artist`
- `album`
- `duration`

### ** Dapatkan Semua Lagu**
```http
GET /songs
Authorization: Bearer <JWT_TOKEN>
```
 **Respon:**
```json
[
  {
    "_id": "660b1234567890",
    "title": "Song 1",
    "fileUrl": "/uploads/song1.mp3"
  }
]
```

### ** Dapatkan Detail Lagu**
```http
GET /songs/{id}
Authorization: Bearer <JWT_TOKEN>
```

---

Setiap file dapat diakses melalui:
```
http://localhost:3000/uploads/song1.mp3
```

---

## Kesimpulan
Music API ini memungkinkan pengguna untuk:
- **Mengunggah lagu**
- **Mengelola daftar lagu**
- **Menggunakan JWT untuk keamanan API**

