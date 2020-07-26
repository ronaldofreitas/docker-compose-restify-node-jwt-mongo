import mongoose from 'mongoose'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env
let M_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
//let M_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(M_URI,
{
    useNewUrlParser: true,
    useCreateIndex: true,
})
mongoose.connection.on('error', () => console.error('connection error:'))
mongoose.connection.once('open', () => console.log('database connected'))