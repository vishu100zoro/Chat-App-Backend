const mongoose= require('mongoose');

  const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to data base");
    } catch (error) {
        console.log(error);
    }  
}

module.exports = {
    connectDB,
  };
