import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';


const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  /*
  const handleSubmit = () => {
    const newNote = async () => {
      try {
        const res = await axios.post('http://localhost:5001/')
        if(res.response.status === 201) {
          console.log(res.response.json)
        }
      } catch (error) {
        console.log(error)
      }
    }
    newNote()
  }*/

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // to evitar the authomtic reloading of the page

    if (!title.trim() || !content.trim()) { // trim() comprube if the  titlr and the contet aren't empty taking off the spaces ata the beguining and ata the final
      toast.error("All fields ar required");
      return;
    }

    setLoading(true);

    try {
      await api.post('/notes', {
        title,
        content
      })
      toast.success('Note created successfully!');
      navigate('/');
    } catch (error) {
      if(error.response.status === 429) {
        toast.error('Slow down! You are creating notes too fast', {
          duration: 4000,
          icon: "💀",
        })
        setIsRateLimited(true)
      } else {
        toast.error('Failed to create note');
      }
      //toast.error('Note created successfully!');
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    
    <div className='min-h-screen bg-base-200'>
      <div className='relative container mx-auto px-4 py-8'>
        {isRateLimited && <RateLimitedUI/>}
        <div className='relative max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>

          <div className='card bg-base-100 mx-auto'>
            <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea 
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default CreatePage