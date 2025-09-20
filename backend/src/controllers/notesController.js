import Note from "../models/Note.js";

export async function getAllNotes(_,res) { // we replace the req with an _ is a convencion when we dont use the req element
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // sort({ createdAt: -1 }) newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Tnternal server error" });
    }
}

export async function getNoteById(req,res) {
    try {
        const id= req.params.id;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Tnternal server error" });
    }
}

export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({title, content}) // new Note({title: title, content: content})
        await newNote.save();
        res.status(201).json({message: "note created successfully"});
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({ message: "Tnternal server error" });
    }
    //res.status(201).json({message: "note created successfully"});
}

export async function updateNotes(req, res) {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id, 
            {title, content},
            { new: true, } // to access or assign the already updated value to the updatedNote
        );

        if(!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(201).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({ message: "Tnternal server error" });
    }

}

export async function deleteNotes(req, res) {
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(201).json({ message: "note deleted successfully" });
    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({ message: "Tnternal server error" });
    }
}
