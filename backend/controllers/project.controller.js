const Project = require('../models/project.model');
exports.createProject=async(req,res)=>{
    try{
        const{name}=req.body;
        if(!name){
            return res.status(400).json({error:"Project name is required"});
        }
        const project=await Project.create({name,owner:req.user.id,members:[req.user.id]});
        return res.status(201).json(project);
    }
    catch(err){
        console.error("createProject error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
exports.getMyProjects=async(req,res)=>{
    try{
        const projects=await Project.find({members:req.user.id});
        return res.json(projects);
    }
    catch(err){
        console.error("getMyProjects error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
exports.renameProject=async(req,res)=>{
    try{
        const project=await Project.findById(req.params.id);
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }
        if(project.owner.toString()!==req.user.id){
            return res.status(403).json({error:"Only project owner can rename the project"});
        }
        project.name=req.body.name;
        await project.save();
        return res.json(project);
    }
    catch(err){
        console.error("renameProject error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
exports.deleteProject=async(req,res)=>{
    try{
        const project=await Project.findByIdAndDelete(req.params.id);    
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }   
        return res.json({message:"Project deleted successfully"});
    }   
    catch(err){
        console.error("deleteProject error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
