const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// --- BAGIAN PENTING ---
// Kode ini otomatis mencari file 'index.html' di folder 'public'
// Jadi kamu gak perlu bikin app.get('/') lagi di bawah.
app.use(express.static('public')); 
// ----------------------

// Jalankan Server
app.listen(port, () => {
    console.log(`Server portofolio berjalan di http://localhost:${port}`);
});

// Export buat Vercel
module.exports = app;