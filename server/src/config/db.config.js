import mongoose from "mongoose";



const DbConnected = async() => {
    
    try {

        if(!process.env.MONGO_URI){
            throw new Error("MONGO_URI , envirorment vairble not a set");
        }

      const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected !");       
    } catch (error) {
        console.log("Error " , error.message); 
        console.log("error");   
         process.exit(1);
    }
            mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
  });
}

export default DbConnected;