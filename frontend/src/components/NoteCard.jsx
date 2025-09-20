import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios"
import toast from "react-hot-toast";

const NoteCard = ({note, setNotes}) => {
    //const navigate = useNavigate();
    const handleDelete = async(e, id) =>{
        e.preventDefault();
        //console.log(id);
        //const id = note._id;
        //console.log(id);

        if(!window.confirm("Are you sure you want to delete this note")) return; // try to do it with toast

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)) // get rid of the deleted one
            toast.success('Note deleted successfully');
            //navigate("/");
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, try again')
        }
    }
  return <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-secondary">
    <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4"/>

                <button onClick={(e) => handleDelete(e, note._id)} key={note.id} className="btn btn-ghost btn-xs text-error">
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
        </div>
    </div>
  </Link>;
};

export default NoteCard;
