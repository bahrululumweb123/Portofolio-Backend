const express = require('express');
const path = require('path'); // Panggil library Path (GPS-nya folder)
const app = express();
const port = process.env.PORT || 3000;

// --- BAGIAN PENTING ---
// Kita kasih tau server: "Eh, folder 'public' itu ada di sebelahmu persis!"
app.use(express.static(path.join(__dirname, 'public')));

// Kita paksa: Kalau buka link utama, kasih file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});

module.exports = app;