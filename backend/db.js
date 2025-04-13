import  mongoose from "mongoose"
const URI = "mongodb+srv://03rivetmoseys:LevYTIf6dTuWDUGC@dummycluster.namox.mongodb.net/dummy"

async function  connect(){

    try{
        await mongoose.connect(URI)
        console.log("Connected Successfully to MongoDb server");
    }catch(error){
        console.log(`Error encountered - ${error}`);
        
    }
}
connect()


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 12
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    balance: {
        type: Number,
        required: true
    }
})
const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account", accountSchema)

export {User, Account}

