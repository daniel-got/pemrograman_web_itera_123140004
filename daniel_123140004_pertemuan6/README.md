## Teknologi yang Digunakan
- **Language:** Python 3.7+
- **Framework:** Pyramid
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migration:** Alembic
- **Driver:** Psycopg2

---

## 1. Prasyarat Sistem
Pastikan di komputer Anda sudah terinstall:
- Python 3
- PostgreSQL Server (Service harus sudah berjalan)
- `pip` dan `virtualenv`

---

## 2. Instalasi & Setup Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan lokal (Arch Linux/Unix).

### A. Clone & Virtual Environment
1. Masuk ke direktori project:
   ```bash
   cd daniel_123140004_pertemuan6
2. Aktifkan virtual env:
  ```bash
  python -m venv venv
  source venv/bin/activate
  ```
3. Instal depedencies : 
  ```bash
  pip install --upgrade pip setuptools
pip install -e .
pip install psycopg2-binary
  ```

## 3. Database (PSQL)
1. Buat user :
```bash
sudo -u postgres psql
CREATE USER user WITH PASSWORD '';
CREATE DATABASE matakuliah_db OWNER user;
GRANT ALL PRIVILEGES ON DATABASE matakuliah_db TO user;
\q 
```
2. edit development.ini : 
```bash
sqlalchemy.url = postgresql+psycopg2://user:password@localhost:5432/matakuliah_db
```

## 4. Migration
1. Membuat tabel : 
```bash
alembic -c development.ini upgrade head
```

## 5. Run code : 
```bash
pserve development.ini --reload
```

## Dokumentasi API 
1. Model data JSON : 
```JSON
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Algoritma",
  "sks": 3,
  "semester": 1
}
```
2. Endpoint :
| Method | URL | Description |
|:------:|:---:|:-----------:|
|GET     |/api/matakuliah|Mengambil semua data matakuliah|
|GET     |/api/matakuliah/{id}|Mengambil detail satu matakuliah|
|POST    |/api/matakuliah| Menambahkan matakuliah baru|
|PUT     |/api/matakuliah/{id}| Mengupdate data matakuliah|
|DELETE  |/api/matakuliah/{id}| Menghapus data matakuliah|

## Testing 
1. Create :
```bash
curl -X POST http://localhost:6543/api/matakuliah \
-H "Content-Type: application/json" \
-d '{"kode_mk": "IF202", "nama_mk": "Sistem Operasi", "sks": 3, "semester": 4}'
```
2. Read all : 
```bash
curl -X GET http://localhost:6543/api/matakuliah
```
3. Read by id : 
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```
4. Update : 
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
-H "Content-Type: application/json" \
-d '{"sks": 4, "nama_mk": "Sistem Operasi Lanjut"}'
```
5. Delete : 
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```
```

