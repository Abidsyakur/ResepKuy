const mysql = require('mysql');

// Buat koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appresep'
});

// Lakukan koneksi ke database
connection.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal: ' + err.stack);
        return;
    }
    console.log('Koneksi database berhasil dengan ID ' + connection.threadId);
});

// Export koneksi agar dapat digunakan di file lain
module.exports = connection;
