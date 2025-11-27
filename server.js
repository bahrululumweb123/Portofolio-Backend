const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/kirim-pesan', async (req, res) => {
    const { nama, email, pesan } = req.body;

    // --- SETTINGAN BARU (PORT 587 - TLS) ---
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portofolio: Pesan dari ${nama}`,
        text: `Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`
            <script>
                alert('ALHAMDULILLAH! Pesan Terkirim! ✅');
                window.location.href = '/kontak.html';
            </script>
        `);
    } catch (error) {
        // --- INI BAGIAN PENTING: TAMPILKAN ERROR ASLI ---
        console.error("Error Detail:", error);
        res.status(500).send(`
            <h1>Gagal Mengirim Email ❌</h1>
            <p><strong>Penyebab Error:</strong> ${error.message}</p>
            <br>
            <p>Screenshot error ini dan kirim ke saya (AI) biar diperbaiki.</p>
            <a href="/kontak.html">Kembali</a>
        `);
    }
});

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});

module.exports = app;