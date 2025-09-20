import React, {useState} from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
//import NoteContent from '../components/NoteContent';
import { Link } from 'react-router';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  let params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchNote = async() => {
      try {
        //console.log(id);
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        console.log(res.data);
      } catch (error) {
        console.log('Error in fetchNote', error);
        toast.error('Failed to fetch the note');
      }finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);


  const handleSave = async () => {

    if (!note.title.trim() || !note.content.trim()) { // trim() comprube if the  titlr and the contet aren't empty taking off the spaces ata the beguining and ata the final
      toast.error("All fields ar required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${params.id}`, note)
      toast.success('Note updated successfully!');
      navigate('/');
    } catch (error) {
      if(error.response.status === 429) {
        toast.error('Slow down! You are updating notes too fast', {
          duration: 4000,
          icon: "💀",
        })
        //setIsRateLimited(true)
      } else {
        toast.error('Failed to update note');
      }
      //toast.error('Note created successfully!');
      //console.log(error)
    } finally {
      setSaving(false);
    }
  }

  const handleDelete = async() =>{

    if(!window.confirm("Are you sure you want to delete this note")) return; // try to do it with toast
    try {
        await api.delete(`/notes/${id}`);
        toast.success('Note deleted successfully');
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error('Failed to delete note');
    }
  };

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>

        <div className='max-w-2xl mx-auto'>

          <div className='relative flex items-center justify-between mb-6'>
            <Link to={'/'} className='btn btn-ghost'>
              <ArrowLeftIcon className='size-5'/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className='h-5 w-5'/>
                  Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input 
                  type="text"
                  placeholder='Note title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title:e.target.value})}
                   />
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <textarea 
                  placeholder='Write your note here'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content:e.target.value})}
                   />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
          
        </div> 
      </div>
    </div>
  )
}


export default NoteDetailPage