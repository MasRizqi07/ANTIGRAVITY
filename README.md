# 🚀 ANTIGRAVITY Workspace Hub

Selamat datang di **ANTIGRAVITY Workspace Hub**! Workspace ini dirancang sebagai repositori pusat (monorepo & multirepo hub) yang mengintegrasikan **8 proyek web dan backend** yang telah dibangun. Proyek-proyek di dalam workspace ini mencakup berbagai macam sistem, mulai dari e-commerce multi-role, platform AI untuk UMKM dan mahasiswa STEM, hingga portofolio pribadi bertema retro-futuristik.

Dokumen ini disusun secara **detail, lengkap, dan jelas** sebagai panduan onboarding, referensi teknis, serta cetak biru (blueprint) untuk melakukan peningkatan (*improvement*), pemutakhiran (*upgrade*), dan pengembangan lebih lanjut di masa mendatang.

---

## 🗺️ Peta Proyek Workspace

Berikut adalah ringkasan seluruh folder proyek aktif yang ada di dalam workspace `D:\MY CODE\ANTIGRAVITY`:

| # | Nama Folder / Proyek | Deskripsi Singkat | Tech Stack Utama | Arsitektur & Tipe Proyek | Status Kesiapan |
|---|---|---|---|---|---|
| 1 | **[AI Software Startup Advisor](file:///d:/MY%20CODE/ANTIGRAVITY/AI%20Software%20Startup%20Advisor)** | Konsultan strategi produk & analisis arsitektural bertenaga AI. | React 19, Express, SQLite, Gemini API | Full-Stack (Vite + Express) | Siap Pakai (Grade A) |
| 2 | **[Cake Boss Platform](file:///d:/MY%20CODE/ANTIGRAVITY/Cake%20Boss%20Platform)** | Platform toko roti digital Surabaya dengan manajemen multi-cabang & aset redesign presisi tinggi. | Next.js 15, NestJS, Prisma, PostgreSQL, Redis | Full-Stack (Next.js + NestJS REST API) + UI Assets | Pengembangan UI & Integrasi (Grade B+) |
| 3 | **[Portfolio Website](file:///d:/MY%20CODE/ANTIGRAVITY/Portfolio%20Website)** | Website portofolio pribadi retro-futuristik bertema terminal interaktif untuk Ahmad Rizqi Mubarok. | React, Vite, Tailwind CSS, Framer Motion | Single Page App (SPA) | Siap Pakai (Grade B-) |
| 4 | **[StudyFlowAI](file:///d:/MY%20CODE/ANTIGRAVITY/StudyFlowAI)** | Collaborative AI Planner untuk penjadwalan kalender belajar non-overlapping bagi STEM & Pre-Med. | Next.js, Prisma (Postgres), Clerk Auth, OpenAI | Next.js Serverless App with Sandbox Mode | Siap Pakai |
| 5 | **[ai-coo](file:///d:/MY%20CODE/ANTIGRAVITY/ai-coo)** | Platform Chief Operating Officer (COO) virtual berbasis AI untuk UMKM Indonesia. | Next.js 15, NestJS 11, Prisma, Redis, Turborepo | Monorepo (pnpm workspaces) | Siap Pakai (Grade A-) |
| 6 | **[careerforge-ai](file:///d:/MY%20CODE/ANTIGRAVITY/careerforge-ai)** | Asisten optimalisasi resume & analisis kecocokan sistem ATS bertenaga AI. | Next.js 16, Supabase, Tailwind CSS, Vitest | Next.js Client-Server | Siap Pakai (Grade B-) |
| 7 | **[seapedia](file:///d:/MY%20CODE/ANTIGRAVITY/seapedia)** | Marketplace e-commerce multi-role (Admin, Seller, Buyer, Driver) dengan sweeper SLA otomatis. | Next.js 14, NestJS, Prisma, Redis, Turborepo | Monorepo (pnpm workspaces) | Siap Pakai (Level 7) |
| 8 | **[warkop-yareh](file:///d:/MY%20CODE/ANTIGRAVITY/warkop-yareh)** | Ekosistem digital coworking space & warkop modern dengan integrasi payment gateway Midtrans. | Next.js 16, NestJS 11, Prisma, Redis, Midtrans | Monorepo (DDD + Clean Architecture) | Siap Pakai (Grade A-) |

---

## 🔍 Detail Proyek & Panduan Pengembangan Lanjutan

### 1. AI Software Startup Advisor
Alat analisis arsitektural dan strategi produk berbasis AI untuk membantu founder software mengambil keputusan startup secara terstruktur.

*   **Teknologi & Integrasi**:
    *   **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Mermaid.js (untuk visualisasi diagram alur otomatis), Framer Motion.
    *   **Backend**: Node.js, Express, `Better-SQLite3` (database lokal ringan), `argon2` (enkripsi password), JWT.
    *   **AI**: Google GenAI SDK (menggunakan model Gemini untuk analisis strategi dan penulisan arsitektur).
    *   **Testing**: Vitest, React Testing Library, Supertest.
*   **Struktur Folder Utama**:
    ```lisptemplate
    AI Software Startup Advisor/
    ├── data/               # Lokasi database SQLite lokal (dev.db)
    ├── server/             # Source code Express & file testing backend
    │   ├── db/             # Migrasi & inisialisasi SQLite
    │   └── tests/          # Unit & integration testing backend
    ├── src/                # Aplikasi frontend React (Vite)
    │   ├── components/     # UI components (termasuk visualisasi Mermaid)
    │   └── context/        # State management (auth & AI session)
    └── server.ts           # Entry point backend server
    ```
*   **Fitur Utama**:
    *   Generasi diagram alur interaktif menggunakan Mermaid.js berdasarkan input kebutuhan sistem.
    *   Analisis otomatis model bisnis (SaaS, transactional, dll.) dan struktur tech stack yang direkomendasikan.
    *   Sistem autentikasi JWT aman berbasis cookie.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **Ekspor Dokumen**: Tambahkan fitur ekspor hasil analisis menjadi file PDF atau dokumen Markdown formal (PRD Template).
    *   **Multi-Agent Mode**: Integrasikan sistem multi-agent di mana pengguna bisa berdiskusi dengan AI yang memiliki peran terspesialisasi (contoh: *AI Product Manager* vs *AI Software Architect*).
    *   **Cloud Cost Estimator**: Hubungkan dengan database biaya AWS/GCP untuk memperkirakan biaya infrastruktur bulanan berdasarkan rancangan arsitektur.

---

### 2. Cake Boss Platform
Platform e-commerce toko roti digital kelas enterprise yang disesuaikan untuk operasi multi-cabang (cabang Surabaya, Indonesia).

*   **Teknologi & Integrasi**:
    *   **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Zustand (state), react-hook-form + Zod, TanStack Query.
    *   **Backend**: NestJS REST API, Passport-JWT, Argon2, class-validator, Swagger OpenAPI (tersedia di `/api/docs`), BullMQ + Redis (antrean email & tugas asinkron).
    *   **Database**: PostgreSQL dengan Prisma ORM.
*   **Struktur Folder Utama**:
    ```lisptemplate
    Cake Boss Platform/
    ├── Cake Boss Platform/             # Aplikasi utama (Full-stack)
    │   ├── backend/                    # NestJS API Server
    │   └── frontend/                   # Next.js 15 Storefront
    └── Redesign Cake Boss Platform/    # Aset mockup HTML presisi tinggi
        ├── landing_page_cake_boss/     # Mockup landing page
        ├── admin_dashboard_cake_boss/  # Mockup panel admin
        └── product_catalog_cake_boss/  # Mockup katalog produk
    ```
    > [!NOTE]
    > Folder `Redesign Cake Boss Platform` berisi rancangan wireframe HTML statis berkualitas tinggi dengan variasi Light Mode, Dark Mode, serta tata letak mobile untuk mempermudah implementasi visual di frontend.
*   **Fitur Utama**:
    *   *Multi-branch inventory*: Pembatasan stok produk dan menu berdasarkan cabang terdekat dari pelanggan.
    *   *Point & Loyalty System*: Pelanggan mengumpulkan poin belanja yang dapat ditukar dengan voucher diskon.
    *   *Audit Logs*: Pencatatan mutasi inventaris dan aksi admin untuk keamanan internal toko.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **Implementasi Mockup Redesign**: Migrasikan seluruh struktur visual dari folder `Redesign Cake Boss Platform` (HTML/CSS) ke dalam komponen React/Next.js di folder `frontend`.
    *   **Payment Gateway**: Hubungkan Midtrans Sandbox untuk mendukung pembayaran digital lokal (QRIS, GoPay, virtual account).
    *   **Integrasi Peta**: Gunakan Google Maps API / OpenStreetMap untuk kalkulasi otomatis jarak pengiriman dari cabang terdekat ke alamat buyer.

---

### 3. Portfolio Website
Website portofolio interaktif pribadi milik Ahmad Rizqi Mubarok dengan tema konsol terminal retro hacker-style.

*   **Teknologi & Integrasi**:
    *   **Teknologi**: React, Vite, Tailwind CSS, Framer Motion.
    *   **Aset Kustom**: Efek 3D Tilt interaktif pada card proyek menggunakan JavaScript Vanilla dan animasi boot retro terminal.
*   **Struktur Folder Utama**:
    ```lisptemplate
    Portfolio Website/
    ├── src/
    │   ├── components/
    │   │   ├── BootScreen.jsx     # Animasi CLI loading saat website pertama dibuka
    │   │   ├── Navbar.jsx         # Navigasi melayang futuristik
    │   │   ├── TerminalButton.jsx # Widget terminal melayang interaktif
    │   │   └── sections/          # Komponen layout (Hero, About, Stack, Projects, dll.)
    │   └── main.jsx
    └── agent-prompt-portfolio-rizqi.md # Panduan konfigurasi personalisasi portofolio
    ```
*   **Fitur Utama**:
    *   *Floating CLI Terminal*: Terminal interaktif yang mendukung berbagai perintah kustom (seperti `help`, `about`, `projects`, `clear`, `contact`).
    *   *Retro Boot Animation*: Efek visual meniru proses booting sistem operasi Linux/Unix jadul sebelum masuk ke menu utama.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **AI Chatbot Terminal**: Integrasikan API Gemini langsung di dalam widget terminal sehingga recruiter bisa "mengobrol" langsung dengan representasi AI tentang keahlian Anda.
    *   **Interactive Mini Games**: Tambahkan game berbasis teks di dalam terminal (seperti tic-tac-toe atau tebak angka) untuk meningkatkan *user engagement*.
    *   **Integrasi Headless CMS**: Hubungkan portofolio dengan CMS (seperti Sanity atau Notion API) untuk memperbarui isi proyek atau pengalaman kerja tanpa mengubah kode sumber.

---

### 4. StudyFlowAI
Aplikasi penjadwalan mingguan otomatis bebas tabrakan (non-overlapping calendar) bertenaga AI yang dirancang khusus untuk mahasiswa STEM dan Pre-Med.

*   **Teknologi & Integrasi**:
    *   **Framework**: Next.js (App Router), Tailwind CSS v4, TypeScript.
    *   **Autentikasi**: Clerk Authentication.
    *   **AI**: OpenAI API (GPT-4o) untuk analisis beban belajar dan optimasi slot kalender mingguan.
    *   **Database**: Neon Serverless PostgreSQL dengan Prisma ORM.
    *   **Notifikasi**: Resend API (untuk pengiriman email laporan belajar harian).
*   **Struktur Folder Utama**:
    ```lisptemplate
    StudyFlowAI/
    ├── prisma/
    │   └── schema.prisma         # Model User, Course, Assignment, PlannerOutput
    └── src/
        ├── app/
        │   ├── api/
        │   │   ├── cron/         # Automasi pengiriman email pengingat harian
        │   │   └── planner/      # AI engine pembuat jadwal kalender
        │   ├── dashboard/        # Visualisasi kalender interaktif mingguan
        │   └── mcat/             # Modul persiapan ujian MCAT
        ├── components/
        │   └── PlannerButton.tsx # Tombol pemicu AI scheduler dengan loading state
        └── middleware.ts         # Proteksi route menggunakan Clerk
    ```
*   **Fitur Utama**:
    *   **Offline Sandbox Mode**: Aplikasi otomatis mendeteksi jika database/API key tidak dikonfigurasi, lalu beralih ke mode simulasi (mock) sehingga development antarmuka tetap berjalan lancar tanpa billing.
    *   **MCAT Prep Timeline**: Impor jadwal belajar target topik persiapan ujian masuk kedokteran (MCAT) secara instan.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **Kalender Sinkron Dua Arah**: Sinkronisasikan jadwal kalender StudyFlow AI dengan Google Calendar atau Outlook Calendar menggunakan OAuth2.
    *   **Study Analytics**: Tambahkan chart analitik visual (menggunakan Recharts) untuk memantau produktivitas belajar mingguan dan membandingkan target jam belajar dengan realisasinya.
    *   **Voice Tasks Input**: Tambahkan input suara berbasis AI untuk mencatat tugas baru secara cepat (menggunakan Whisper API).

---

### 5. ai-coo
Platform asisten operasional bisnis virtual (AI Chief Operating Officer) terintegrasi yang disesuaikan khusus untuk membantu UMKM di Indonesia menganalisis data keuangan harian.

*   **Teknologi & Integrasi**:
    *   **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Framer Motion.
    *   **Backend**: NestJS 11 (Clean Architecture: Use Cases, Repositories).
    *   **Monorepo**: Turborepo dengan `pnpm workspaces`.
    *   **Infrastruktur**: PostgreSQL 16 (Prisma), Redis + BullMQ (antrean background job).
    *   **AI & Validasi**: OpenAI API, Zod (`@ai-coo/shared-types` & `@ai-coo/validation`).
*   **Struktur Folder Utama**:
    ```lisptemplate
    ai-coo/
    ├── apps/
    │   ├── api/                  # NestJS API Server
    │   └── web/                  # Next.js 15 Dashboard
    └── packages/
        ├── database/             # Skema Prisma & koneksi PostgreSQL
        ├── shared-types/         # Zod schemas untuk transfer data (DTO)
        └── validation/           # Aturan validasi logika bisnis UMKM
    ```
*   **Fitur Utama**:
    *   Analisis otomatis terhadap laba kotor, margin operasional, dan pengeluaran harian UMKM.
    *   Rekomendasi bisnis harian yang dipersonalisasi dalam Bahasa Indonesia yang santai tapi taktis.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **AI OCR Struk**: Integrasikan model Vision AI agar pemilik UMKM bisa memotret nota/struk pengeluaran fisik mereka dan secara otomatis diinput ke dalam database pembukuan.
    *   **WhatsApp Bot integration**: Hubungkan asisten COO dengan WhatsApp Business API agar pelaku UMKM bisa melaporkan omzet harian atau menanyakan saran bisnis langsung via chat WA.
    *   **Financial Calculator**: Modul simulasi harga jual produk (HPP) berdasarkan variabel bahan baku, tenaga kerja, dan margin laba yang ditargetkan.

---

### 6. careerforge-ai
Aplikasi web optimalisasi resume dan pengecekan tingkat kelayakan ATS (Applicant Tracking System) secara langsung menggunakan kecerdasan buatan.

*   **Teknologi & Integrasi**:
    *   **Frontend & Routing**: Next.js 16 (versi terbaru), React, Tailwind CSS.
    *   **Backend & DB**: Supabase (Auth, Database Relasional, Storage untuk resume PDF).
    *   **Testing**: Vitest + React Testing Library (menggunakan konfigurasi `vitest.setup.ts`).
*   **Struktur Folder Utama**:
    ```lisptemplate
    careerforge-ai/
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── auth/             # Callback otentikasi Supabase
    │   │   ├── dashboard/        # Halaman editor resume & hasil ATS check
    │   │   └── login/            # Halaman sign-in
    │   ├── components/ui/        # Komponen UI dasar berbasis shadcn/ui
    │   └── utils/
    └── vitest.config.ts          # Konfigurasi testing framework
    ```
*   **Fitur Utama**:
    *   Upload resume PDF dan lakukan parsing data otomatis.
    *   Analisis perbandingan kata kunci antara resume dengan Job Description yang di-input pengguna untuk menghitung skor kecocokan ATS.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **AI Cover Letter Generator**: Tambahkan fitur pembuatan surat lamaran kerja kustom berdasarkan resume dan deskripsi pekerjaan dalam sekali klik.
    *   **AI Mock Interview Prep**: Tambahkan simulator wawancara kerja interaktif dengan AI berbasis teks atau suara (menggunakan Web Speech API).
    *   **PDF Builder**: Buat editor template resume berbasis HTML-to-PDF yang secara otomatis memastikan format output PDF 100% ramah mesin scanner ATS.

---

### 7. seapedia
Platform e-commerce e-marketplace multi-role level 7 yang membagi alur kerja untuk 4 aktor: Admin, Seller, Buyer, dan Driver secara transparan dalam satu sistem terpadu.

*   **Teknologi & Integrasi**:
    *   **Monorepo**: Turborepo dengan pnpm workspaces.
    *   **Stack**: Next.js 14 (App Router) + NestJS + PostgreSQL (Prisma ORM) + Redis (BullMQ).
    *   **Sanitisasi**: `sanitize-html` untuk mencegah injeksi kode berbahaya (XSS).
*   **Struktur Folder Utama**:
    ```lisptemplate
    seapedia/
    ├── apps/
    │   ├── api/                  # NestJS REST API Server
    │   └── web/                  # Next.js 14 Storefront & Multi-role Panel
    ├── packages/
    │   ├── config/               # ESLint & TS Shared Configuration
    │   └── types/                # Tipe data entitas bersama
    └── docker-compose.yml        # Setup instans PostgreSQL & Redis lokal
    ```
*   **Aturan Bisnis Spesifik (Core Logic)**:
    1.  *Single-Store Checkout*: Buyer hanya boleh checkout barang dari satu toko yang sama di setiap keranjang belanja.
    2.  *PPN & Voucher*: Diskon dihitung terlebih dahulu sebelum dikenakan pajak pertambahan nilai (PPN) sebesar 11% (`Total = (Subtotal - Discount + Delivery Fee) * 1.11`).
    3.  *Driver Wallet System*: Driver berhak menerima 80% dari biaya ongkir yang dibayarkan oleh buyer saat pesanan selesai.
    4.  *Overdue SLA Sweeper*: Jika status pesanan berada dalam pengantaran (`SHIPPING`) melampaui batas SLA (Instant: 3 jam, Next Day: 24 jam, Regular: 72 jam), background job BullMQ otomatis membatalkan pesanan, mengembalikan stok penjual, dan melakukan refund dana 100% ke saldo dompet buyer.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **Sistem Maps & Live Tracking**: Gunakan Leaflet atau Google Maps di frontend untuk memvisualisasikan rute pengiriman dan posisi driver secara real-time menggunakan WebSockets.
    *   **Multiseller Checkout (Pengembangan)**: Upgrade logika keranjang belanja agar buyer dapat membeli dari beberapa toko sekaligus dengan memecah transaksi menjadi beberapa sub-order berdasarkan storeId.
    *   **Sistem Chatting Internal**: Tambahkan fitur kirim pesan instan (chat) antara Buyer-Seller dan Buyer-Driver menggunakan Socket.io.

---

### 8. warkop-yareh
Platform monorepo modern untuk ekosistem coworking space dan kedai kopi premium ("Warkop") multi-cabang yang menargetkan komunitas kreator dan developer.

*   **Teknologi & Integrasi**:
    *   **Arsitektur**: Clean Architecture & Domain-Driven Design (DDD) di sisi NestJS API.
    *   **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS.
    *   **Backend**: NestJS 11, Prisma Client, Redis (BullMQ).
    *   **Integrasi Pembayaran**: Midtrans Payment Gateway (QRIS, GoPay, Bank Transfer).
*   **Struktur Folder Utama**:
    ```lisptemplate
    warkop-yareh/
    ├── apps/
    │   ├── api/                  # NestJS Server (DDD: Domain, Application, Infrastructure, Presentation)
    │   ├── admin/                # Next.js Panel Admin (Cabang & Reservasi)
    │   └── web/                  # Next.js Customer Facing Storefront
    ├── docs/                     # Dokumentasi komprehensif (PRD, ADR, Architecture Blueprint, Roadmap)
    └── packages/
        ├── database/             # Prisma PostgreSQL schema
        ├── ui/                   # Shared UI Component library
        └── validation/           # Skema Zod untuk input request
    ```
*   **Fitur Utama**:
    *   *Omnichannel Ordering*: Mendukung pemesanan bawa pulang (pickup) maupun makan di tempat dengan QR meja.
    *   *Community Hub & Events*: Fitur reservasi tiket meetup developer dan forum diskusi komunitas terintegrasi.
    *   *Loyalty Tiers*: Tingkatan akun (Bronze, Silver, Gold) berdasarkan poin transaksi untuk diskon produk otomatis.
*   **Rencana Upgrade & Improvement Selanjutnya**:
    *   **Interactive Seat & Desk Booking**: Buat visualisasi tata letak denah ruangan interaktif (menggunakan SVG interaktif) agar pelanggan dapat memilih meja kerja coworking secara langsung saat memesan.
    *   **Smart Access (IoT)**: Integrasikan sistem reservasi dengan kunci pintar (smart lock) coworking space, di mana setelah pembayaran Midtrans sukses, pelanggan mendapatkan kode QR/PIN temporer untuk akses masuk ruangan.
    *   **Push Notifications**: Gunakan Web Push API untuk mengirimkan notifikasi status pemesanan kopi langsung ke peramban pelanggan saat pesanan siap diambil di meja barista.

---

## ⚙️ Panduan Menjalankan Seluruh Proyek Secara Lokal

Untuk mulai mengerjakan proyek di workspace ini, Anda harus memiliki peralatan dasar berikut:

*   **Node.js**: Versi `20.x` atau `24.x` (Direkomendasikan menggunakan NVM).
*   **Package Manager**: `npm` (untuk proyek tunggal) dan `pnpm` (wajib untuk monorepo: `ai-coo`, `seapedia`, `warkop-yareh`).
*   **Docker** (Opsional, tapi direkomendasikan untuk menjalankan database Postgres & Redis lokal secara cepat menggunakan `docker-compose`).

### Prosedur Umum Menjalankan Proyek:

```bash
# 1. Masuk ke folder proyek pilihan Anda
cd <nama-folder-proyek>

# 2. Salin environment variable template
cp .env.example .env          # Jika proyek standard
# ATAU
cp .env.example .env.local    # Jika menggunakan Next.js / Supabase

# 3. Instalasi dependensi
npm install                   # Untuk proyek berbasis npm (AI Advisor, Portfolio, StudyFlowAI)
# ATAU
pnpm install                  # Untuk proyek berbasis pnpm (ai-coo, seapedia, warkop-yareh)

# 4. Inisialisasi Database (Jika menggunakan Prisma)
npx prisma db push            # Sinkronisasi skema ke database target
npx prisma generate           # Regenerasi Prisma client library

# 5. Jalankan server lokal
npm run dev                   # Proyek Vite/Next standard
# ATAU
pnpm dev                      # Proyek Monorepo (menjalankan Frontend & Backend secara bersamaan via Turborepo)
```

---

## 🛠️ Tips & Aturan Keamanan Pengembangan Workspace

1.  **Pengerasan Environment Variables**:
    Pastikan file `.env`, `.env.local`, `.env.production` tidak akan pernah terdorong (push) ke Git. Modifikasi file `.gitignore` di setiap sub-proyek jika diperlukan.
2.  **Manajemen Dependensi Monorepo**:
    Saat bekerja di dalam monorepo (`ai-coo`, `seapedia`, `warkop-yareh`), jika ingin menambahkan package baru ke salah satu aplikasi (misal `apps/api`), gunakan flag `--filter`:
    ```bash
    pnpm --filter api add <package-name>
    ```
    Hindari menjalankan perintah instalasi di luar direktori workspace root tanpa filter yang tepat untuk menghindari rusaknya symlink pnpm.
3.  **Protokol Modifikasi Skema Database**:
    Jika Anda memperbarui `schema.prisma`, selalu jalankan `prisma generate` setelahnya agar type editor Anda terbarukan secara otomatis. Untuk database produksi, gunakan migrasi terstruktur:
    ```bash
    npx prisma migrate dev --name <nama-perubahan-skema>
    ```

---

*Selamat berkreasi dan selamat melakukan scaling pada proyek-proyek hebat ini! Workspace ini sepenuhnya milik Anda untuk bereksperimen, meningkatkan performa sistem, dan membangun masa depan startup teknologi yang luar biasa.* 🚀
# warkop-yareh
