import mongoose from "mongoose";


export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('mongodb connected successfully')
        })

        connection.on('error', (e) => {
            console.log('mongodb connection error: ' + e)
            process.exit()
        })

    } catch (e) {
        console.log(e)
    }
}