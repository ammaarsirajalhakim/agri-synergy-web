const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agrisynergy'
});


async function connection() {
    try {
        await db.promise().getConnection();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        throw error;
    }
}

module.exports = { db, connection };
