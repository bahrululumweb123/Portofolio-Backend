const express = require('express');
const app = express();
const port = 3000;

// 1. Agar Backend bisa membaca data dari Formulir HTML
app.use(express.urlencoded({ extended: true }));

// 2. Agar Backend bisa menampilkan file HTML/CSS/Gambar di folder 'public'
app.use(express.static('public'));

// 3. RUTE: Menangani pengiriman pesan (POST)
app.post('/kirim', (req, res) => {
    // Tangkap data dari name="..." di HTML
    const { nama, email, pesan } = req.body;

    // Tampilkan di Terminal (Console) sebagai bukti Backend bekerja
    console.log("--- PESAN BARU MASUK (Node.js) ---");
    console.log("Nama  :", nama);
    console.log("Email :", email);
    console.log("Pesan :", pesan);
    console.log("----------------------------------");

    // Kirim balasan ke Browser (Tampilan Sukses)
    res.send(`
        <body style="background-color:#0b1120; color:white; font-family:sans-serif; text-align:center; padding-top:100px;">
            <h1 style="color:#38bdf8;">Pesan Diterima oleh Node.js! 🚀</h1>
            <p>Halo <strong>${nama}</strong>, terima kasih sudah menghubungi saya.</p>
            <p>Pesanmu: "<em>${pesan}</em>"</p>
            <br>
            <a href="/kontak.html" style="color:#38bdf8; text-decoration:none; border:1px solid #38bdf8; padding:10px 20px; border-radius:5px;">Kembali ke Website</a>
        </body>
    `);
});

// 4. Jalankan Server
app.listen(port, () => {
    console.log(`Server portofolio berjalan di http://localhost:${port}`);
});