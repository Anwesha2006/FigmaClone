const Project = require('../models/project.model');
const User = require('../models/user.model');

exports.createProject=async(req,res)=>{
    try{
        const{name}=req.body;
        if(!name){
            return res.status(400).json({error:"Project name is required"});
        }
        const project=await Project.create({name,owner:req.user.id,members:[]});
        return res.status(201).json(project);
    }
    catch(err){
        console.error("createProject error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
exports.getMyProjects=async(req,res)=>{
    try{
        const projects=await Project.find({
            $or: [{ owner: req.user.id }, { 'members.user': req.user.id }]
        }).populate('members.user', 'name email');
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
exports.inviteUser=async(req,res)=>{
    try{
        const { email, role } = req.body;
        const project = await Project.findById(req.params.id);
        if(!project) return res.status(404).json({error:"Project not found"});
        if(project.owner.toString() !== req.user.id) {
            return res.status(403).json({error:"Only project owner can invite users"});
        }
        const userToInvite = await User.findOne({email});
        if(!userToInvite) {
            return res.status(404).json({error:"User not found. They must sign up first."});
        }
        const existingMember = project.members.find(m => m.user.toString() === userToInvite._id.toString());
        if(existingMember) {
            existingMember.role = role || "viewer";
        } else {
            project.members.push({ user: userToInvite._id, role: role || "viewer" });
        }
        await project.save();
        return res.json(project);
    } catch(err) {
        console.error("inviteUser error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}

exports.saveProject=async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({error:"Project not found"});
        }
        if(project.owner.toString() !== req.user.id) {
            return res.status(403).json({error:"Only project owner can save the project"});
        }
        project.lastModified = new Date();
        if(req.body.name) project.name = req.body.name;
        await project.save();
        return res.json(project);
    } catch(err) {
        console.error("saveProject error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}

exports.updateProjectStatus=async(req,res)=>{
    try{
        const { status } = req.body;
        if(!["draft", "published"].includes(status)) {
            return res.status(400).json({error:"Invalid status. Must be 'draft' or 'published'"});
        }
        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({error:"Project not found"});
        }
        if(project.owner.toString() !== req.user.id) {
            return res.status(403).json({error:"Only project owner can update project status"});
        }
        project.status = status;
        await project.save();
        return res.json(project);
    } catch(err) {
        console.error("updateProjectStatus error", err);
        return res.status(500).json({error:"Something went wrong"});
    }
}
