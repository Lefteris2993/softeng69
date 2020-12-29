const { Client } = require('pg')
const connectionString = 'postgresql://team69_admin:team69@83.212.79.152:5432/softeng'

const client = new Client({ connectionString: connectionString });

client.connect().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log(error);
});

module.exports = { client };