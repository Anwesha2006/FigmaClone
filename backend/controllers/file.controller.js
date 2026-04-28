const File=require("../models/file.model");
const Project=require("../models/project.model");
const { generateSVG } = require('../utils/svgGenerator');
const sharp = require('sharp');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

exports.createFile=async(req,res)=>{
    try{
        const project=await Project.findById(req.body.projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        const file=await File.create({name:req.body.name,project:req.body.projectId,owner:req.user?.id || req.body.ownerId,canvasData:{}});
        return res.status(201).json(file);
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
}
exports.getMyFiles=async(req,res)=>{
    try {
        const userId = req.user?.id;
        if (!userId) {
             return res.status(401).json({message: "Unauthorized"});
        }
        const projects = await Project.find({
            $or: [{ owner: userId }, { 'members.user': userId }]
        });
        const projectIds = projects.map(p => p._id);
        const files = await File.find({ project: { $in: projectIds } }).populate('project').sort({ updatedAt: -1 });
        return res.status(200).json(files);
    } catch (error) {
        console.error("getMyFiles error", error);
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
        
        let role = null;
        let userId = req.query.userId;
        
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                const token = authHeader.split(" ")[1];
                const jwt = require("jsonwebtoken");
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded) userId = decoded.id;
            } catch(e) {
                console.log("Optional auth failed", e.message);
            }
        }
        
        if (req.user || userId) {
            userId = userId || req.user?.id;
            const project = await Project.findById(file.project);
            if (project) {
                if (project.owner.toString() === userId) {
                    role = "editor";
                } else {
                    const member = project.members.find(m => m.user.toString() === userId);
                    if (member) role = member.role;
                }
            }
        }
        
        if (!role && file.linkSharing && file.linkSharing.enabled) {
            role = file.linkSharing.role;
        }
        
        if (!role) {
            return res.status(403).json({message:"Access denied. You don't have permission to view this file."});
        }
        
        return res.status(200).json({ ...file.toObject(), userRole: role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}

exports.saveCanvasData=async(req,res)=>{
    try{
        const { id } = req.params;
        const mongoose = require('mongoose');
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid file ID provided:", id);
            return res.status(400).json({message:"Invalid file ID"});
        }

        console.log("Saving canvas data for file:", id);
        const file=await File.findById(id);
        if(!file){
            console.error("File not found for saving:", id);
            return res.status(404).json({message:"File not found"});
        }
        
        file.canvasData=req.body.canvasData;
        await file.save();
        console.log("Canvas data saved successfully for file:", id);
        return res.status(200).json({message:"Canvas data saved successfully"});
    } catch (error) {
        console.error("Save error details:", error);
        return res.status(500).json({message:"Server error", error: error.message});
    }
}

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

exports.updateLinkSharing=async(req,res)=>{
    try {
        const { enabled, role } = req.body;
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({message:"File not found"});
        
        const project = await Project.findById(file.project);
        let hasPermission = false;
        const userId = req.user ? req.user.id : req.body.userId;
        
        if (project && userId) {
            if (project.owner.toString() === userId) hasPermission = true;
            else {
                const member = project.members.find(m => m.user.toString() === userId);
                if (member && member.role === 'editor') hasPermission = true;
            }
        }
        
        if (!hasPermission) return res.status(403).json({message:"Permission denied"});
        
        file.linkSharing = { enabled, role };
        await file.save();
        return res.status(200).json(file);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
}

exports.exportFile = async (req, res) => {
    try {
        const shapes = Array.isArray(req.body.canvasData) ? req.body.canvasData : [];
        const svgString = generateSVG(shapes);
        const format = req.query.format || req.body.format || 'svg';
        const fileName = req.body.name || "export";

        if (format === 'svg') {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}.svg"`);
            return res.send(svgString);
        } else if (format === 'png') {
            const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer();
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}.png"`);
            return res.send(pngBuffer);
        } else if (format === 'pdf') {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}.pdf"`);
            
            const doc = new PDFDocument();
            doc.pipe(res);
            SVGtoPDF(doc, svgString, 0, 0);
            doc.end();
            return;
        } else {
            return res.status(400).json({ message: "Invalid format requested" });
        }
    } catch (err) {
        console.error("Export error:", err);
        return res.status(500).json({ message: "Server error during export" });
    }
}
