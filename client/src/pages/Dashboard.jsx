import React, { useEffect, useState } from 'react'
import { FilePenLineIcon, Loader2Icon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast }from 'react-hot-toast'
import api from '../config/api'
import pdfToText from 'react-pdftotext'
import Loader from '../components/Loader'

const Dashboard = () => {
  const navigate = useNavigate()

  const  { user , token }= useSelector(state => state.auth);


  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a "]

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');

  const [isLoading, setIsLoading] = useState(false)


  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/auth/resume', {headers:{
        Authorization:token }})
        setAllResumes(data.resumes)
        
    } catch (error) {
      toast.error(error?.response?.data?.message | error.message)
    }
  }
  useEffect(() => {
    loadAllResumes()
  }, [])

  const cteateResume = async (event) => {
   try {
        event.preventDefault()
        const {data} = await api.post('/api/resumes/create', {title} , {headers: {
          Authorization: token}})
          setAllResumes([...allResumes, data.resume])
          setTitle('')
          setShowCreateResume(false)
          navigate(`/app/builder/${data.resume._id}`)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
    console.log(error);
   }
  }

const uploadResume = async (event) => {
  event.preventDefault();
  setIsLoading(true);

  try {
    // 1. Convert PDF to text
    const resumeText = await pdfToText(resume);
    console.log("Extracted resume text:", resumeText);

    if (!resumeText) {
      toast.error("Unable to read resume text!");
      setIsLoading(false);
      return;
    }

    // 2. Send to backend
    const { data } = await api.post(
      "/api/ai/upload-resume",
      { title, resumeText },
      { headers: { Authorization: token } }
    );

    // 3. Reset states
    setTitle("");
    setResume(null);
    setShowUploadResume(false);
    navigate(`/app/builder/${data.resumeId}`);
  } catch (error) {
    console.error(error.response?.data || error.message);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};


  const editTitle = async (event) => {
    try {
  event.preventDefault()
  const {data} = await api.put(`/api/resumes/update`, {resumeId:  editResumeId,  resumeData: {title}} , {headers:{Authorization: token}})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume,title}: resume))
      setTitle('')
       setEditResumeId('')
       toast.success(data.message)
    } catch (error) {
           toast.error(error?.response?.data?.message || error.message);     
    }
  }

  const deleteResume = async (resumeId) => {
    try {
       const confirm = window.confirm("are you sure you want delte this resume ? ")
      if (confirm) {
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers:{Authorization: token}})
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      toast.success(data.message)
    }
    } catch (error) {
     toast.error(error?.response?.data?.message || error.message);     
    }
   
    
  }


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className='text-2xl font-medium bg-gradient-to-r from-slate-600 to-slate-700
        bg-clip-text text-transparent sm:hidden'>Welcome,  joe doe</p>

        <div className='flex gap-4'>
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
        rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group
        hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-200 p-2.5 bg-gradient-to-br
          from-indigo-300 to-indigo-500 text-white roundend-full' />
            <p className='text-sm
           group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center
             rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group
             hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-200 p-2.5 bg-gradient-to-br
          from-purple-300 to-purple-500 text-white roundend-full' />
            <p className='text-sm
           group-hover:text-indigo-600 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-slate-300 border-2 my-6 sm:w-[305px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 text-center ">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className='relative text-center
                    w-full sm:max-w-36 h-48 flex flex-col items-center
                    justify-center  rounded-lg gap-2 border group 
                    hover:shadow-lg transition-all duration-300 
                    cursor-pointer' style={{
                  background: `linear-gradient(135deg , ${baseColor} 
                    10, ${baseColor}40 )`, borderColor: baseColor + "40"
                }}>

                <FilePenLineIcon className='size-7  group-hover:scale-105 transition-all'
                  style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center'
                  style={{ color: baseColor }}>{resume.title}</p>

                <p className='absolute bottom-1  text-[11px] text-slate-400
                   transition-all px-2 duration-300 group-hover:text-slate-500 '
                  style={{ color: baseColor + '90' }}
                >Updated on {new Date(resume.updatedAt).toLocaleDateString()} </p>
                <div onClick={e => e.stopPropagation()}
                  className='absolute top-1 items-center right-1 hidden group-hover:flex'>

                  <TrashIcon onClick={() => deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-600 transition-colors' />
                  <PencilIcon
                    onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                    className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-600 
                    transition-colors'/>
                </div>
              </button>
            )
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={cteateResume} onClick={() => setShowCreateResume(false)}
            className='fixed inset-0 bg-black/70 backdrop-blur 
          bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()}
              className="relative  bg-slate-50 border
             shadow-md rounded-lg w-full justify-center items-center max-w-lg p-6">
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume titile' required className='
              w-full px-4 py-2 mb-4 outline-none border rounded-md focus:border-green-600 ring-green-600 ' />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700
              transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-salte-600
              cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )}
        {/* ---------show uplaoded poup----------- */}

        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)}
              className='fixed inset-0 bg-black/70 backdrop-blur 
          bg-opacity-50 z-10 flex items-center justify-center'>

              <div onClick={e => e.stopPropagation()}
                className="relative  bg-slate-50 border
             shadow-md rounded-lg w-full  max-w-lg p-6">
                <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume titile' required className='
              w-full px-4 py-2 mb-4 outline-none border rounded-md focus:border-green-600 ring-green-600 ' />

                <div>
                  <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                    select resume file
                    <div className="flex flex-col items-center justify-center gap-2 border group
               text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500
               hover:text-green-700 cursor-pointer transition-colors">
                      {resume ? (
                        <p className='text-green-700'>{resume.name}</p>
                      ) : (
                        <> 
                        <UploadCloud className='size-14 stroke-1' />
                        <p >Upload resume</p>
                      </> 
                      ) }
                    </div>
                  </label>
                  <input type='file' id='resume-input' accept='.pdf' hidden onChange={(e) =>setResume(e.target.files[0])}/>
                </div>
                <button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 flex justify-center items-center gap-3
              transition-colors'> 
              {isLoading && <Loader2Icon className='size-5 animate-spin' />} 
              {isLoading ? "Uploading..." : " Upload Resume"}
             </button>
                <XIcon className='absolute top-4 right-4
                 text-slate-400 hover:text-salte-600
              cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />
              </div>
            </form>
          )
        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')}
            className='fixed inset-0 bg-black/70 backdrop-blur 
          bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()}
              className="relative  bg-slate-50 border
             shadow-md rounded-lg w-full justify-center items-center max-w-lg p-6">
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume titile' required className='
              w-full px-4 py-2 mb-4 outline-none border rounded-md focus:border-green-600 ring-green-600 ' />

              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700
              transition-colors'>Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-salte-600
              cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
