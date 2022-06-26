## WDT Blog API

Aplikasi ini dibuat untuk mengelola konten blog. Tiap pengguna dapat mendaftar secara gratis dan langsung membuat konten apa saja yang ingin mereka buat. Konten yang telah dibuat juga dapat diubah dan dihapus.

Framework : Express Node JS<br>
DB : PostgreSQL<br>

Enkripsi Password menggunakan Bcrypt <br/>
Deklarasi variable environment disimpan di file .env <br/>
Autentikasi menggunakan JSON Web Token <br/>
Logger menggunakan Morgan <br/>

#### Installation

`Import wdt_blog.sql ke Database`

`$ npm install`

`Setup konfigurasi enviornment di file .env`

`$ npm start`
