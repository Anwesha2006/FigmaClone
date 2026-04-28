const File = require("../models/file.model");
const Project = require("../models/project.model");

const generateLayout = (prompt) => {
    const p = prompt.toLowerCase();
    const shapes = [];
    
    if (p.includes("landing") || p.includes("home")) {
        // Navbar
        shapes.push({ id: "nav", type: "rectangle", x: 0, y: 0, width: 1200, height: 60, fill: "#1e1e1e", stroke: "#333", strokeWidth: 1 });
        // Hero Section
        shapes.push({ id: "hero", type: "rectangle", x: 100, y: 120, width: 1000, height: 400, fill: "#2c2c2c", stroke: "#444", strokeWidth: 1 });
        shapes.push({ id: "hero-text", type: "text", x: 200, y: 220, width: 600, height: 100, fill: "#ffffff", text: "Welcome to Our Platform", fontSize: 48 });
        // CTA Button
        shapes.push({ id: "cta", type: "rectangle", x: 200, y: 350, width: 180, height: 50, fill: "#007bff", stroke: "transparent", strokeWidth: 0 });
    } else if (p.includes("dashboard") || p.includes("admin")) {
        // Sidebar
        shapes.push({ id: "side", type: "rectangle", x: 0, y: 0, width: 240, height: 800, fill: "#1a1a1a", stroke: "#333", strokeWidth: 1 });
        // Main Content
        shapes.push({ id: "main", type: "rectangle", x: 260, y: 20, width: 900, height: 760, fill: "#222", stroke: "#333", strokeWidth: 1 });
        // Cards
        shapes.push({ id: "card1", type: "rectangle", x: 280, y: 40, width: 200, height: 120, fill: "#333", stroke: "#444", strokeWidth: 1 });
        shapes.push({ id: "card2", type: "rectangle", x: 500, y: 40, width: 200, height: 120, fill: "#333", stroke: "#444", strokeWidth: 1 });
    } else {
        // Default Generic Shape
        shapes.push({ id: "box1", type: "rectangle", x: 100, y: 100, width: 300, height: 200, fill: "#5B8DEF", stroke: "#3B6FCF", strokeWidth: 2 });
        shapes.push({ id: "text1", type: "text", x: 110, y: 110, width: 280, height: 40, fill: "#fff", text: "New Idea: " + prompt, fontSize: 20 });
    }
    
    return shapes;
};

exports.generateFromPrompt = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        // 1. Find or create a default project for AI drafts
        let project = await Project.findOne({ owner: req.user.id, name: "AI Drafts" });
        if (!project) {
            project = await Project.create({ name: "AI Drafts", owner: req.user.id });
        }

        // 2. Generate shapes based on prompt
        const shapes = generateLayout(prompt);

        // 3. Create the file
        const file = await File.create({
            name: prompt.substring(0, 20) + (prompt.length > 20 ? "..." : ""),
            project: project._id,
            owner: req.user.id,
            canvasData: shapes
        });

        return res.status(201).json(file);
    } catch (error) {
        console.error("AI Generation error details:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
