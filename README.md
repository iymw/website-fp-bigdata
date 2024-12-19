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

##  Architecture Diagram
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

## .env

```
NEXT_PUBLIC_API_URL_1=http://127.0.0.1:5000
NEXT_PUBLIC_API_URL_2=http://127.0.0.1:5001
```

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.
