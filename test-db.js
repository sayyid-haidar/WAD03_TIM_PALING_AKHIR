require('dotenv').config();
const db = require('./database');

async function testConnection() {
    try {
        // Test koneksi database
        await db.sequelize.authenticate();
        console.log('✅ Koneksi database berhasil!');

        // Sinkronisasi model dengan database (buat tabel jika belum ada)
        await db.sequelize.sync({ alter: true });
        console.log('✅ Semua model berhasil disinkronisasi!');

        // Tampilkan info model yang tersedia
        console.log('\n📦 Models yang tersedia:');
        console.log('- Users:', db.users ? '✅' : '❌');
        console.log('- Products:', db.products ? '✅' : '❌');
        console.log('- Carts:', db.carts ? '✅' : '❌');

        console.log('\n🎉 Setup database selesai!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testConnection();
