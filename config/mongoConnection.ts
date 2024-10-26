import mongoose from 'mongoose'

import Env from './env.config';

const {
    DBURI
} = Env;

const connectDB  = async ()=>{
    return await mongoose.connect(DBURI as string)
    .then(res=>console.log(`DB Connected successfully`))
    .catch(err=> {
        console.log(`Fail to connect  DB with error: ${err} `)
        process.exit(1)
        })
}

export default connectDB;
