const fs = require('fs');
let code = fs.readFileSync('backend/controllers/file.controller.js', 'utf8');

const replacement = \exports.getFileById=async(req,res)=>{
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
        }\;

code = code.replace(/exports.getFileById=async\(req,res\)=>\{[\s\S]*?if \(req.user \|\| req.query.userId\) \{[\s\S]*?\}\r?\n        \}/, replacement);
fs.writeFileSync('backend/controllers/file.controller.js', code);
