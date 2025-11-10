# 🧾 UTS Web Service Engineering 20251  
**Nama:** Husni Majedi  
**NIM:** 230104040123  
**Kelas:** TI23B  
**Resource:** `orders`  
**Dosen Pengampu:** Muhayat, M.IT  

---

## 📘 Deskripsi Proyek  
Proyek ini merupakan implementasi **Ujian Tengah Semester (UTS)** mata kuliah **Web Service Engineering**.  
Mahasiswa diminta untuk membangun **RESTful API berbasis Express.js** dengan operasi CRUD lengkap, menggunakan resource sesuai digit akhir NIM.

Untuk digit akhir **3**, resource yang digunakan adalah **`orders`** dengan field utama:
- `product`
- `quantity`
- `price`

Semua data bersifat **dummy** dan disimpan dalam file `.js`, bukan database.

---

## ⚙️ Teknologi yang Digunakan
- **Node.js** (v22+)  
- **Express.js**  
- **Nodemon** (untuk mode development)  
- **Morgan** (HTTP request logger)

---

## 📂 Struktur Folder
UTS-WSE-230104040123/
├── app.js
├── package.json
├── routes/
│ └── ordersRoutes.js
├── controllers/
│ └── ordersController.js
├── data/
│ └── ordersData.js
└── README.md

---

## 🚀 Cara Menjalankan Aplikasi
1. Pastikan Node.js sudah terinstal di komputer kamu.  
2. Buka folder proyek ini di Visual Studio Code.  
3. Jalankan perintah berikut di terminal:
   ```bash
   npm install
   npm run dev
http://localhost:3000
| Method | Endpoint          | Deskripsi                  | Status Code     |
| ------ | ----------------- | -------------------------- | --------------- |
| GET    | `/api/orders`     | Ambil semua data order     | 200             |
| GET    | `/api/orders/:id` | Ambil order berdasarkan ID | 200 / 404       |
| POST   | `/api/orders`     | Tambah order baru          | 201 / 400       |
| PUT    | `/api/orders/:id` | Update order               | 200 / 400 / 404 |
| DELETE | `/api/orders/:id` | Hapus order                | 204 / 404       |
| GET    | `/api/info`       | Info layanan API           | 200             |
