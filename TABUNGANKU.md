# JarWis — Save Wisely, Complete Your Quests

## 1. Gambaran Ide

**JarWis** adalah aplikasi web untuk mengelola dan memantau tabungan berdasarkan **tujuan finansial**, dengan pendekatan seperti game RPG.

Nama **JarWis** merupakan gabungan dari:

* **Jar** — toples atau tempat menyimpan uang.
* **Wise** — menggunakan uang dan mengatur tabungan secara bijak.

Konsep utama JarWis adalah:

> **Setiap tabungan adalah sebuah “Jar”, dan setiap target tabungan adalah sebuah “Quest”.**

Alih-alih hanya melihat saldo tabungan, pengguna dapat melihat perjalanan mereka menuju suatu tujuan.

Contoh:

**Quest: Beli PC Baru**
Target: Rp20.000.000
Progress: Rp13.500.000 / Rp20.000.000
Progress: 67,5%

Ketika saldo mencapai Rp20.000.000, quest dianggap selesai dan JarWis memberikan notifikasi serta achievement kepada pengguna.

Dengan demikian, aktivitas finansial sehari-hari diterjemahkan menjadi sebuah progress system yang lebih mudah dipahami dan lebih memotivasi.

---

# 2. Masalah yang Ingin Diselesaikan

Banyak aplikasi pencatatan keuangan hanya berfokus pada:

* pemasukan
* pengeluaran
* saldo
* laporan transaksi

Masalahnya, pengguna sering mengetahui **berapa uang yang mereka punya**, tetapi tidak mengetahui secara jelas:

> “Uang ini sebenarnya sedang dikumpulkan untuk apa?”

JarWis berfokus pada sisi tersebut.

Pengguna dapat memisahkan uang berdasarkan tujuan:

* Beli PC
* Dana Darurat
* Liburan
* DP Rumah
* Pendidikan
* Gadget
* Pernikahan
* Tabungan Bebas
* dan tujuan lainnya

Setiap tujuan memiliki konteks dan progress tersendiri.

---

# 3. Konsep Utama: Jar

**Jar** adalah wadah tabungan yang dimiliki pengguna.

Setiap Jar dapat memiliki:

* Nama
* Logo/icon
* Deskripsi
* Saldo
* Target
* Urutan
* Status
* Warna/tema visual
* Riwayat transaksi

Contoh:

### 🫙 Beli PC Baru

Target: Rp20.000.000
Saldo: Rp13.500.000
Progress: 67,5%

### 🫙 Dana Darurat

Target: Rp30.000.000
Saldo: Rp18.000.000
Progress: 60%

### 🫙 Liburan Jepang

Target: Rp15.000.000
Saldo: Rp7.500.000
Progress: 50%

### 🫙 Tabungan Bebas

Tanpa target
Saldo: Rp4.000.000

Jar tanpa target tetap dapat digunakan sebagai tabungan biasa.

---

# 4. Quest System

Target pada sebuah Jar diperlakukan sebagai **Quest**.

Misalnya:

**Quest #001 — Beli PC Baru**

Target:
Rp20.000.000

Progress:
Rp13.500.000

Sisa:
Rp6.500.000

Progress bar:

`█████████████░░░░░░░ 67.5%`

Ketika saldo mencapai target:

> 🎉 Quest Completed
> Kamu berhasil menyelesaikan “Beli PC Baru”!

Quest yang selesai kemudian masuk ke **Quest History** sehingga pengguna dapat melihat pencapaian finansial mereka sepanjang waktu.

---

# 5. Milestone dan Achievement

Selain target utama, JarWis dapat memiliki sistem pencapaian.

Contoh achievement:

### 🥉 First Jar

Membuat tabungan pertama.

### 💰 First Deposit

Melakukan setoran pertama.

### 🔥 Saving Streak

Menabung selama 7 hari berturut-turut.

### 🎯 Quest Completed

Menyelesaikan satu target tabungan.

### 🏆 Big Saver

Berhasil mengumpulkan Rp10.000.000.

### 🏆 Millionaire

Total seluruh tabungan mencapai Rp100.000.000.

### 🫙 Jar Collector

Memiliki 10 Jar aktif.

Achievement ini tidak harus memberikan hadiah finansial. Fungsinya adalah memberikan **feedback dan sense of progression** kepada pengguna.

---

# 6. Model Transaksi

Untuk menjaga model finansial tetap jelas, JarWis sebaiknya tidak menggunakan “debit” dan “credit” sebagai istilah utama di UI.

Gunakan model sederhana:

### Deposit

Uang masuk ke Jar.

Contoh:
Rp1.000.000 ditambahkan ke “Beli PC Baru”.

Saldo:

`Rp5.000.000 → Rp6.000.000`

### Withdrawal

Uang keluar dari Jar.

Contoh:
Pengguna mengambil Rp500.000 untuk membeli sesuatu.

Saldo:

`Rp6.000.000 → Rp5.500.000`

Withdrawal memiliki **purpose**.

Contoh:

* Belanja
* Transfer
* Pinjam
* Keperluan pribadi
* Darurat
* Lainnya

Kategori tersebut dapat dikustomisasi pengguna.

---

# 7. Temporary Withdrawal / Uang yang Harus Dikembalikan

Ini merupakan salah satu fitur yang cukup menarik dari konsep JarWis.

Misalnya pengguna memiliki:

**Dana Darurat: Rp10.000.000**

Kemudian mengambil:

**Rp2.000.000**

untuk kebutuhan tertentu.

Saat melakukan withdrawal, pengguna dapat memilih:

> Apakah uang ini akan dikembalikan?

### Jika Tidak

Transaksi dianggap sebagai pengeluaran biasa.

Saldo:

`10.000.000 → 8.000.000`

Tidak ada kewajiban berikutnya.

### Jika Ya

JarWis membuat **Repayment Record**.

Contoh:

**Repayment #001**
Jumlah: Rp2.000.000
Terbayar: Rp500.000
Sisa: Rp1.500.000

Pengguna dapat menentukan tanggal jatuh tempo.

---

# 8. Sistem Repayment

Repayment tidak harus dibayar sekaligus.

Contoh:

Utang kepada Jar:

**Rp2.000.000**

Pembayaran:

| Pembayaran |    Jumlah |
| ---------- | --------: |
| 1          | Rp500.000 |
| 2          | Rp300.000 |
| 3          | Rp700.000 |
| 4          | Rp500.000 |

Total:

**Rp2.000.000**

Status:

**PAID**

JarWis menyimpan seluruh histori pembayaran.

Ini memungkinkan pengguna mengetahui:

* jumlah awal
* total sudah dibayar
* sisa
* histori pembayaran
* tanggal pembayaran
* tanggal jatuh tempo

---

# 9. Due Date dan Reminder

Tanggal pengembalian bersifat **opsional**.

### Tanpa Due Date

Repayment langsung muncul sebagai:

> 🔴 Outstanding Repayment

Sejak transaksi dibuat sampai lunas.

### Dengan Due Date

Misalnya:

**Due Date: 25 September 2026**

Sebelum tanggal tersebut, transaksi tidak dianggap overdue.

Setelah masuk tanggal tersebut:

> ⚠️ Repayment Due

Jika belum dibayar:

> 🔴 Overdue

Dengan demikian JarWis dapat menampilkan informasi penagihan tanpa memaksa setiap transaksi memiliki tanggal jatuh tempo.

---

# 10. Recurring Transaction

Pengguna dapat membuat transaksi berulang.

Misalnya:

**Setoran Dana Darurat**

Rp500.000

Recurring:

`Monthly`

Tanggal:

`5`

Maka JarWis membuat transaksi baru setiap tanggal 5.

Pada tahap pengembangan berikutnya, sistem dapat mendukung:

* Daily
* Weekly
* Monthly
* Yearly
* Custom interval

Untuk transaksi recurring, pengguna juga dapat menentukan tanggal mulai dan tanggal berhenti.

---

# 11. Kategori Transaksi

JarWis memiliki sistem kategori yang dapat dikustomisasi.

Contoh:

**Expense Category**

* Makanan
* Transportasi
* Belanja
* Hiburan
* Kesehatan
* Pendidikan
* Elektronik

Pengguna bebas membuat kategori sendiri.

Misalnya:

> Gaming

atau

> Kebutuhan Anak

Kategori digunakan untuk membantu pengguna melihat pola penggunaan tabungan.

---

# 12. Transfer Antar-Jar

Karena seseorang dapat memiliki banyak Jar, JarWis perlu membedakan antara **pengeluaran** dan **pemindahan uang**.

Contoh:

`Dana Darurat → Liburan`

Rp1.000.000

Ini **bukan expense**.

Sistem harus mencatatnya sebagai:

**Transfer**

Sehingga:

Dana Darurat:

`Rp10.000.000 → Rp9.000.000`

Liburan:

`Rp5.000.000 → Rp6.000.000`

Total kekayaan pengguna tetap:

`Rp15.000.000`

Ini penting supaya laporan total tabungan tidak salah.

---

# 13. Dashboard

Dashboard menjadi pusat informasi pengguna.

Contoh:

## Total Savings

**Rp43.500.000**

Total seluruh saldo Jar.

Kemudian pengguna dapat melihat:

### Active Quests

🟢 Beli PC Baru
`13.5M / 20M`

🟡 Liburan Jepang
`7.5M / 15M`

🟡 Dana Darurat
`18M / 30M`

### Outstanding Repayments

🔴 Rp1.500.000 belum dikembalikan

### Upcoming Recurring

📅 25 September
Setoran Dana Darurat — Rp500.000

### Recent Activity

* Rp1.000.000 — Beli PC Baru
  − Rp500.000 — Dana Darurat
* Rp300.000 — Dana Liburan

---

# 14. Jar Ordering

Pengguna dapat menentukan urutan Jar mereka.

Contohnya:

1. 🎯 Beli PC
2. 🛡 Dana Darurat
3. ✈️ Liburan
4. 🎮 Gaming
5. 🫙 Tabungan Bebas

Urutan dapat diubah dengan drag-and-drop.

Ini penting karena pengguna mungkin ingin menampilkan Jar berdasarkan:

* prioritas
* target
* nominal
* kebutuhan pribadi

---

# 15. Shared Jar

JarWis juga mendukung tabungan bersama.

Contoh:

**Jar: Liburan Jepang**

Owner:

Angga

Members:

* Angga
* Partner
* Saudara

Semua anggota dapat melihat progress Jar tersebut sesuai permission mereka.

Contoh:

**Target: Rp20.000.000**

Kontribusi:

Angga — Rp8.000.000
Partner — Rp5.000.000
Saudara — Rp2.000.000

Total:

**Rp15.000.000**

Progress:

**75%**

---

# 16. Konsep Ownership

Untuk shared Jar, harus ada satu **Owner**.

Owner memiliki kontrol terhadap Jar.

Misalnya:

* mengubah nama Jar
* mengubah target
* mengatur member
* mengubah permission
* menghapus Jar

Member dapat diberikan role seperti:

### Viewer

Hanya melihat.

### Contributor

Dapat melakukan deposit.

### Manager

Dapat melakukan transaksi dan mengelola beberapa aspek Jar.

Model role ini akan membuat fitur kolaborasi lebih aman dan mudah dikembangkan.

---

# 17. Kontribusi Member

Untuk shared Jar, JarWis sebaiknya mencatat siapa yang melakukan transaksi.

Misalnya:

**Liburan Jepang**

Rp1.000.000 — Deposit

By:

**Angga**

Kemudian:

Rp750.000 — Deposit

By:

**Partner**

Sehingga JarWis dapat menampilkan:

### Contribution

Angga
Rp8.000.000 — 53%

Partner
Rp5.000.000 — 33%

Saudara
Rp2.000.000 — 14%

Ini membuat shared savings jauh lebih transparan.

---

# 18. Notification System

JarWis memiliki notification berdasarkan event.

Contoh:

### Quest Completed

> 🎉 Quest “Beli PC Baru” berhasil diselesaikan!

### Repayment Due

> ⚠️ Pembayaran Rp1.500.000 jatuh tempo hari ini.

### Overdue

> 🔴 Repayment Rp500.000 telah melewati tanggal jatuh tempo.

### Recurring Transaction

> 🔄 Transaksi rutin Rp500.000 akan dibuat besok.

### Milestone

> 🚀 Kamu sudah mencapai 50% target Dana Darurat!

---

# 19. Core Gameplay Loop

Ini bagian terpenting dari JarWis.

Alur pengguna idealnya:

**Create Jar**

↓

**Set Goal**

↓

**Deposit Money**

↓

**Watch Progress Grow**

↓

**Reach Milestone**

↓

**Complete Quest**

↓

**Unlock Achievement**

↓

**Create New Quest**

Dengan begitu pengguna memiliki alasan untuk terus kembali ke aplikasi bukan hanya untuk melihat laporan, tetapi untuk melihat **progress**.

---

# 20. Contoh User Journey

Angga membuat:

### 🫙 Beli PC Baru

Target:

**Rp20.000.000**

Saldo awal:

**Rp0**

Kemudian setiap bulan menabung:

Januari +Rp2.000.000
Februari +Rp2.000.000
Maret +Rp3.000.000
April +Rp2.500.000
Mei +Rp4.000.000

Total:

**Rp13.500.000**

JarWis menampilkan:

> 🎯 Beli PC Baru
> Rp13.500.000 / Rp20.000.000
> 67.5%

Kemudian Angga mengambil Rp1.000.000 untuk kebutuhan lain dan memilih:

**“Will return this money”**

Jar menjadi:

**Rp12.500.000**

Outstanding repayment:

**Rp1.000.000**

Angga membayar kembali:

Rp500.000

Outstanding:

**Rp500.000**

Beberapa waktu kemudian:

+Rp500.000

Repayment:

**PAID**

Saldo kembali:

**Rp13.500.000**

Kemudian setelah beberapa deposit berikutnya:

**Rp20.000.000**

JarWis memberikan:

> 🏆 QUEST COMPLETED
> “Beli PC Baru” selesai.

---

# 21. Struktur Fitur

Secara konseptual, JarWis dapat dibagi menjadi beberapa domain:

### Account

Autentikasi dan profil pengguna.

### Jar

Pengelolaan tabungan.

### Goal / Quest

Target dan progress tabungan.

### Transaction

Deposit, withdrawal, transfer.

### Repayment

Dana yang harus dikembalikan dan histori cicilan.

### Category

Kategori transaksi.

### Recurring

Transaksi berulang.

### Collaboration

Shared Jar dan membership.

### Achievement

Quest completion, milestone, badge.

### Notification

Reminder dan event.

---

# 22. Hal yang Perlu Diluruskan dari Konsep Awal

Ada beberapa keputusan desain yang sebaiknya dibuat sejak awal.

### 1. Deposit dan withdrawal jangan disebut debit/credit di UI

Karena istilah accounting tersebut dapat membingungkan pengguna.

Gunakan:

**Deposit → saldo bertambah**

**Withdrawal → saldo berkurang**

**Transfer → pindah antar-Jar**

**Repayment → mengembalikan withdrawal sementara**

Model ini jauh lebih mudah dipahami.

### 2. Transfer jangan dihitung sebagai expense

Kalau uang dipindahkan dari Jar A ke Jar B, total kekayaan tidak berubah.

Kalau sistem menghitungnya sebagai expense, total savings dan analytics akan salah.

### 3. Repayment harus menjadi entity tersendiri

Jangan hanya membuat transaksi “minus Rp2 juta” lalu berharap sistem dapat mengetahui bahwa itu harus dikembalikan.

Withdrawal sementara harus menghasilkan:

**Withdrawal + Repayment Obligation + Repayment Transactions**

### 4. Shared Jar membutuhkan ownership dan permission

Tanpa ini, fitur kolaborasi akan cepat menjadi rumit ketika beberapa user dapat mengubah saldo atau target.

---

# 23. MVP JarWis

Untuk versi pertama, jangan langsung membangun seluruh sistem RPG.

Prioritas MVP:

**1. Authentication**

**2. CRUD Jar**

**3. Deposit / Withdrawal**

**4. Transfer antar-Jar**

**5. Target / Quest**

**6. Dashboard Total Savings**

**7. Repayment + Cicilan**

**8. Custom Category**

**9. Recurring Transaction**

**10. Notification sederhana**

Setelah model keuangan stabil, baru tambahkan:

**11. Achievement**

**12. XP / Level**

**13. Shared Jar**

**14. Contribution Tracking**

**15. Advanced analytics**

Alasannya sederhana: **game layer tidak boleh menutupi financial ledger yang salah**. Saldo dan histori transaksi harus benar terlebih dahulu.

---

# 24. Positioning

JarWis dapat diposisikan sebagai:

> **A gamified savings management platform that turns financial goals into RPG-style quests.**

Atau versi yang lebih sederhana:

> **“Menabung bukan cuma mengumpulkan uang. Selesaikan quest-mu.”**

JarWis bukan sekadar aplikasi budgeting.

Fokus utamanya adalah:

**Goal-based saving + transaction tracking + gamification + collaborative savings.**

---

# 25. Identitas Produk

Secara visual, JarWis dapat menggunakan konsep:

**RPG × Finance × Jar**

Misalnya setiap Jar memiliki tampilan seperti item dalam game:

🫙 **Beli PC Baru**
`Epic Quest`

`13.5M / 20M`

`██████████████░░░░░`

**67.5%**

Target Reward:

💻 New PC

Status:

`IN PROGRESS`

Ketika selesai:

`QUEST COMPLETED ✓`

Dengan pendekatan ini, pengguna merasa bahwa mereka sedang **menyelesaikan tujuan**, bukan sekadar memasukkan angka ke tabel.
