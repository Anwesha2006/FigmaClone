const mongoose=require("mongoose");
const ProjectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
members:[{
    user: { type:mongoose.Schema.Types.ObjectId, ref:"User" },
    role: { type: String, enum: ["viewer", "editor"], default: "viewer" }
}],
}
,{timestamps:true}
);
module.exports=mongoose.model( "Project",ProjectSchema);