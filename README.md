# FP-Big-Data-DataLakehouse

## Kelompok 5 - Big Data (B)
Anggota : 
| Nama           | NRP           |
|----------------|---------------|
| Ong Valencio Jesse Purnomo  | 5027221002    |
| Agas Ananta Wijaya   | 5027221004   |
| Sylvia Febrianti  | 5027221019 |
| Fazrul Ahmad F.  | 5027221025  |
| Michael Wayne  | 5027221037  |

## Project Overview
Proyek ini bertujuan melakukan **kategorisasi rekomendasi produk** untuk meningkatkan SEO penjualan. Berbagai teknologi diintegrasi dalam projek ini, seperti **MinIo**, **Kafka**, dan juga otomatisasi berbasis machine learning.

---

##  Flow Diagram
![Shopping Process Flow Graph](https://github.com/user-attachments/assets/614ff80f-0747-40ad-a92e-61922bedc21b)


---

## Teknologi yang Digunakan:
1. **Kafka**: Untuk membangun sistem pada data streaming real-time
2. **Bidirectional Encoder Representations from Transformers (BERT)**: Untuk memahami konteks ulasan dengan lebih baik melalui pemrosesan bahasa alami (NLP) berbasis transformer
3. **Dataset**: Dalam projek ini kita menggunakan dataset **Amazon Sales Dataset** yang memiliki data 1K+ Peringkat dan Ulasan Produk Amazon sesuai detailnya yang tercantum di situs web resmi Amazon
4. **MinIo**: Penyimpanan objek (object storage) untuk menjadi alternatif yang sangat kompatibel dengan Amazon S3
5. **PySpark**: Untuk memproses dataset dalam skala besar dengan distribusi komputasi yang efisien
6. **Scikit-learn**: Untuk tugas pembelajaran mesin tradisional seperti klasifikasi dan evaluasi model
7. **Flask**: Untuk membangun API RESTful yang dapat digunakan untuk menganalisis sentimen secara real-time atau sebagai backend untuk integrasi dengan sistem lain
8. **PyTorch**: Untuk membangun dan melatih model deep learning berbasis BERT

---

### Kebutuhan Software:
1. **Docker**.
2. **Apache Kafka**.
3. **MinIO**.
4. **Apache Spark** (PySpark).
5. **Python Libraries**:
   - `pandas` 
   - `kafka-python` 
   - `boto3` 
   - `pyspark` 

---

## Setup and Running Project
1. Pastikan semua dependencies sudah terinstall, seperti `npm install` (jika ada error, cobalah untuk menggunakan command `npm install --legacy-peer-deps`), docker, kafka, MinIo, Apache Spark, Python libraries, dan juga **Amazon Sales Dataset** (https://www.kaggle.com/datasets/karkavelrajaj/amazon-sales-dataset).
2. Buat file `.env` pada project: 
```
NEXT_PUBLIC_API_URL_1=http://127.0.0.1:5000
NEXT_PUBLIC_API_URL_2=http://127.0.0.1:5001
```
3. Run server dengan `npm run dev`, atau `yarn dev`, atau `pnpm dev`, atau `bun dev`. Lalu buka http://localhost:3000
4. Masuk ke folder /bigData, letakkan file dataset disini, lalu ketikkan command berikut:
   - `docker-compose up -d`
   - `docker exec -it kafka kafka-topics --create --topic amazon-data --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`
   - `docker pull minio/minio`
   - `docker run -d --name minio -p 9000:9000 -p 9090:9090 -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" minio/minio server /data --console-address ":9090"`
   - `python3 producer.py`
   - `python3 consumer.py`
5. Kemudian masuk ke folder /be, letakkan file dataset disini juga, lalu ketikkan command berikut:
   - `python3 csvToJson.py`
   - `python3 api.py`
   - `python3 predict.py`


---

## Hasil dan Output
1. **Katalog Produk** <br>
   Berikut adalah halaman utama aplikasi web yang menampilkan katalog produk. <br>
   Fitur:
   - Daftar Produk: Produk seperti blender, air fryer, dan lainnya ditampilkan secara horizontal. Setiap produk memiliki nama, harga, kategori, dan rating.
   - Desain UI/UX: Tata letak yang rapi dan minimalis membuat pengalaman pengguna intuitif, dengan elemen visual utama seperti gambar produk besar dan informasi produk yang singkat.
     ![catalog](https://github.com/user-attachments/assets/a8e3fd8d-f16b-4600-9de1-c8cd6f6d75bf)
2. **Create Product** <br>
   Halaman ini digunakan untuk menambahkan produk baru ke dalam katalog. Terdapat kolom untuk memasukkan nama produk, kategori, tautan gambar, dan harga. Fitur ini mendukung penambahan produk secara manual oleh pengguna ke dalam basis data atau sistem manajemen produk. <br>
   Fitur:
   - Pengguna dapat memasukkan nama produk, kategori, tautan gambar, dan harga.
   - Tombol Generate Category berbasis Machine Learning: Ketika pengguna menekan tombol generate, maka sistem akan otomatis menyesuaikan dengan *Product Name* yang dimasukkan.
   - Automasi Data Training: Machine Learning dalam fitur ini sudah dirancang dengan automasi, dimana model akan selalu ditraining setiap 10 menit. Sehingga model akan terus updated terhadap produk-produk baru yang dimasukkan pengguna.
   ![create product](https://github.com/user-attachments/assets/17d79011-c113-4e0b-8403-a01596a15a62)
3. **MinIo** <br>
   MinIO digunakan untuk menyimpan data produk yang diolah oleh aplikasi. File JSON berisi data produk dari katalog atau produk baru yang dibuat melalui halaman Create Product. <br>
   Fitur:
   - Integrasi JSON ke MinIO secara live: Setiap produk yang berhasil dibuat oleh pengguna (pada Create Product), maka akan otomatis masuk ke dalam MinIO.
   - Metadata File: Informasi seperti ukuran file dan waktu modifikasi disediakan untuk setiap file.
   - Akses Objek: Akses terhadap data ini bersifat privat, menandakan bahwa hanya pengguna dengan izin tertentu yang dapat mengaksesnya.
   ![minIO](https://github.com/user-attachments/assets/ca5dd749-b894-44f7-a743-8a913e619a79)


---

## Kesimpulan
Proyek ini bertujuan untuk mengoptimalkan rekomendasi produk demi meningkatkan SEO penjualan melalui integrasi teknologi modern, seperti Kafka, MinIO, dan machine learning berbasis BERT. Dengan menggunakan Amazon Sales Dataset sebagai sumber data utama, sistem ini menggabungkan pemrosesan data real-time, otomatisasi pembelajaran mesin, dan UI/UX interaktif untuk menyediakan pengalaman pengguna yang optimal. 

Proyek ini berhasil mengintegrasikan teknologi canggih untuk membangun sistem rekomendasi produk yang handal, adaptif, dan interaktif. Dengan kombinasi pengelolaan data yang efektif, machine learning otomatis, dan penyimpanan data terpusat, aplikasi ini berpotensi memberikan dampak besar pada peningkatan SEO penjualan dan pengalaman pengguna secara keseluruhan.

---
