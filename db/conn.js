const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Your are connected to Database..!!!")
}).catch((e)=>{
    console.log("Disconnected",e)
})