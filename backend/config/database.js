import mongoose from "mongoose";
//This code defines an asynchronous function connectDB to establish a connection to a MongoDB database using the Mongoose library

const connectDB= async()=>{
await mongoose.connect(process.env.MONGO_URI).then(()=>{
console.log('Database Connected');
}).catch((error)=>{
    console.log(error);
})
};

export default connectDB;