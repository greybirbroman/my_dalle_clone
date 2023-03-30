import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url)
    .then(() => console.log('Successfull connection to MongoDB'))
    .catch(err => console.log(`Error connection to MongoDB ${err}`))
}

export default connectDB