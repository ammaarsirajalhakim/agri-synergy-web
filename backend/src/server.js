const dotenv = require('dotenv');
const app = require('./app'); 
const { connection } = require('./database/db'); 
dotenv.config();

app.listen(process.env.PORT, async () => {
    await connection();
    console.log(`Server is running on port ${process.env.PORT}`);
});
