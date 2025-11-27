const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); // Panggil Tukang Pos
const app = express();
const port = process.env.PORT || 3000;

// Middleware (Biar server bisa baca data dari Form HTML)
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTE HALAMAN UTAMA ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- RUTE KHUSUS BUAT KIRIM EMAIL ---
app.post('/kirim-pesan', async (req, res) => {
    const { nama, email, pesan } = req.body;

    // 1. Setting Tukang Pos (Transporter)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Nanti kita setting di Vercel
            pass: process.env.EMAIL_PASS  // Password sakti tadi
        }
    });

    // 2. Setting Isi Surat
    const mailOptions = {
        from: email, // Dari email pengisi form
        to: process.env.EMAIL_USER, // Kirim ke email kamu sendiri
        subject: `Pesan Baru Portofolio dari: ${nama}`,
        text: `Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`
    };

    // 3. Kirim!
    try {
        await transporter.sendMail(mailOptions);
        // Kalau sukses, balik lagi ke halaman kontak tapi kasih alert (sederhana)
        res.send(`
            <script>
                alert('Terima kasih! Pesan berhasil terkirim.');
                window.location.href = '/kontak.html';
            </script>
        `);
    } catch (error) {
        console.log(error);
        res.send('Gagal mengirim pesan. Coba lagi nanti.');
    }
});

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});

module.exports = app;