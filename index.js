
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json())

// Connect Mongoose

const connectdb = () =>
{
    
    return mongoose.connect("mongodb+srv://rahulr41180:Rahul12345@cluster0.jjbeq.mongodb.net/C2U4Evaluation?retryWrites=true&w=majority")
}


// -------------------------------------------------------------------------

// User Schema -->

const UserSchema = mongoose.Schema({

    firstName : {type : String, required : true},
    middleName  : {type : String, required : false},
    lastName : {type : String, required : true},
    age : {type : Number, required : true},
    email :{type : String, required : true, unique : true},
    address : {type : String, required : true},
},
{
    timestamps : true,
})

// User Model -->

const User1 = mongoose.model("user",UserSchema)

// -----------------------------------------------------------------------------------

// BranchDetail Schema -->



const BranchSchema = mongoose.Schema({
    name : {type : String, required : true},
    address : {type : String, required : true},
    IFSC : {type : String, required : true, unique : true},
    MICR : {type : Number, required : true, unique : true},
},
{
    timestamps : true,
})

const Branch1 = mongoose.model("branch",BranchSchema);

// ------------------------------------------------------------------------------------

// MasterAccount Schema -->

const MasterAccountSchema = mongoose.Schema({
    balance : {type : Number, required : true},

    UserId :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    BranchId : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "branch",
        required : true,
    }
},
{
    timestamps : true,
})

const Master1 = mongoose.model("master", MasterAccountSchema);

// -------------------------------------------------------------------------------

// SavingsAccount Schema -->

const SavingsAccountSchema = mongoose.Schema({
    account_number : {type : Number, required : true, unique : true},
    balance : {type : Number, required : true},
    interestRate : {type : Number, required : true},
    UserId :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    BranchId : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "branch",
        required : true,
    }
},
{
    timestamps : true,
})


const Saving1 = mongoose.model("saving",SavingsAccountSchema)

// ------------------------------------------------------------------------------------------

// FixedAccount Schema -->

const FixedAccountSchema = mongoose.Schema({
    account_number : {type : Number, required : true},
    balance : {type : Number, required : true},
    interestRate : {type : String, required : true},
    startDate : {type : String, required : true},
    maturityDate : {type : String, required : true},
    UserId :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
},
{
    timestamps : true,
})

const Fixed1 = mongoose.model("fixed",FixedAccountSchema);

// ----------------------------------------------------------------

// CRUD Operations -->

// User Getting

app.get("/users", async(req,res) =>
{
    try
    {
        const UserData = User1.find({}).lean().exec();

        return res.status(200).send({UserData : UserData});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

// User adding

app.post("/users", async(req,res) =>
{
    try
    {
        const UserPost = User1.create(req.body);

        return res.status(201).send({UserPost : UserPost});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})


app.listen(6200, async() =>
{
    try
    {
        await connectdb();

        console.log("listening on port 6500");
    }
    catch(error)
    {
        console.log("error : ",error);
    }
})