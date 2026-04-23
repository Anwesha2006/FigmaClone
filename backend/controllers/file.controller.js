const File=require("../models/file.model");
exports.createFile=async(req,res)=>{
    try{
        const project=await Project.findById(req.body.projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        const file=await File.create({name:req.body.name,project:req.body.projectId,owner:req.user.id,canvasData:{}});
        return res.status(201).json(file);
    }

catch(err){
    console.error(err);
    return res.status(500).json({message:"Server error"});
}
}
exports.getAllFiles=async(req,res)=>{
    try{
        const files=await File.find({project:req.params.projectId});
        return res.status(200).json(files);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}
exports.getFileById=async(req,res)=>{
    try{
        const file=await File.findById(req.params.id);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }
        return res.status(200).json(file);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}

exports.saveCanvasData=async(req,res)=>{
    try{
        const file=await File.findById(req.params.id);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }
        file.canvasData=req.body.canvasData;
        await file.save();
        return res.status(200).json({message:"Canvas data saved successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }}
exports.deleteFile=async(req,res)=>{
    try{
        const file=await File.findByIdAndDelete(req.params.id);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }
        return res.status(200).json({message:"File deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}   
