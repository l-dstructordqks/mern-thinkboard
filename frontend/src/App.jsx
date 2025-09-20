import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Toaster } from 'react-hot-toast'
//data-theme="night"
const App = () => {
  return (
    <div data-theme="night" className='h-full w-full'>
      <div className='absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#818cf840_100%)]'></div>
      
      <Toaster position="top-center" reverseOrder={false}  />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}
export default App;