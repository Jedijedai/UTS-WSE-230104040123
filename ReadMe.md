 🧾 UTS Web Service Engineering 20251

## 👨‍💻 Identitas Diri
| Keterangan | Data |
|-------------|------|
| **Nama** | Husni Majedi |
| **NIM** | 230104040123 |
| **Kelas** | TI23B |
| **Mata Kuliah** | Web Service Engineering |
| **Dosen Pengampu** | Muhayat, M.IT |
| **Resource API** | `orders` |
| **Nama Proyek** | UTS-WSE-230104040123 |

---

## 📘 Deskripsi API
RESTful API ini dibuat sebagai bagian dari **Ujian Tengah Semester (UTS)** mata kuliah **Web Service Engineering**.  
Tujuannya adalah untuk mengimplementasikan konsep RESTful API dengan operasi CRUD lengkap menggunakan **Express.js** tanpa database (menggunakan data dummy dari file `.js`).  

API ini berfungsi untuk mengelola data **pesanan (orders)** dengan field utama:
- `product` → nama produk
- `quantity` → jumlah produk
- `price` → harga produk

Fitur yang disediakan meliputi:
- Menampilkan semua pesanan (`GET`)
- Menampilkan pesanan tertentu (`GET /:id`)
- Menambahkan pesanan baru (`POST`)
- Memperbarui data pesanan (`PUT`)
- Menghapus pesanan (`DELETE`)
- Menampilkan metadata API (`/api/info`)

Semua response API berbentuk **JSON** dan sudah menerapkan **7 prinsip RESTful**:
1. Resource-Oriented URI  
2. Proper HTTP Methods  
3. Stateless Communication  
4. Consistent Status Codes  
5. JSON Representation  
6. Validation & Error Handling  
7. Discoverability  

---

## 🌐 Tabel Endpoint RESTful API

| **Method** | **Endpoint** | **Deskripsi** | **Contoh Response** | **Status Code** |
|-------------|---------------|----------------|----------------------|-----------------|
| **GET** | `/api/orders` | Menampilkan semua pesanan | `{ "status": "success", "data": [...] }` | 200 |
| **GET** | `/api/orders/:id` | Menampilkan pesanan berdasarkan ID | `{ "status": "success", "data": {...} }` | 200 / 404 |
| **POST** | `/api/orders` | Menambah pesanan baru | `{ "status": "success", "data": {...} }` | 201 / 400 |
| **PUT** | `/api/orders/:id` | Memperbarui data pesanan berdasarkan ID | `{ "status": "success", "data": {...} }` | 200 / 400 / 404 |
| **DELETE** | `/api/orders/:id` | Menghapus pesanan berdasarkan ID | *(No Content)* | 204 / 404 |
| **GET** | `/api/info` | Menampilkan informasi metadata API | `{ "app": "UTS Web Service Engineering", "author": "Husni Majedi", ... }` | 200 |

---

> 🏁 **API ini dibuat oleh Husni Majedi (TI23B)** sebagai tugas **UTS Web Service Engineering Semester Ganjil 2025**.
