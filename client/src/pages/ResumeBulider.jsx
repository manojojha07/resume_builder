import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Icon, LogIn, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelctor from '../components/TemplateSelctor'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryFrom from '../components/ProfessionalSummaryFrom'
import ExpirenceFrom from '../components/ExpirenceFrom'
import EducationForm from '../components/Educationform'
import ProjectsForm from '../components/ProjectsForm'
import SkillForm from '../components/SkillForm'
import { useSelector } from 'react-redux'
import api from '../config/api'
import { toast } from 'react-hot-toast'

const ResumeBulider = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  console.log(resumeId ," come from resmebulider 36 line");
  const loadExistingResume = async () => {
    console.log(resumeId ," come from resmebulider 39 line");

    try {
      const {data} = await api.get(`/api/resumes/get/${resumeId} `, {headers:{
        Authorization: token
      }})
      if(data.resume){
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.messge);
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const section = [
    { id: "personal", name: "Personal Info", Icon: User },
    { id: "summary", name: "Summary", Icon: FileText },
    { id: "experience", name: "Experience", Icon: Briefcase },
    { id: "education", name: "Education", Icon: GraduationCap },
    { id: "projects", name: "Projects", Icon: FolderIcon },
    { id: "skills", name: "Skills", Icon: Sparkles },
  ]
  const activeSection = section[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  const saveResume = async() => {
    try {
      let updateResumeData = structuredClone(resumeData);

    if(typeof resumeData.personal_info.image === 'object'){
      delete updateResumeData.personal_info.image
    }
    const formData = new FormData()
    formData.append("resumeId" , resumeId)
    formData.append('resumeData', JSON.stringify(updateResumeData))
    removeBackground && formData.append("removeBackground" , "yes")
    typeof resumeData.personal_info.image === 'object' && formData.append
    ("image", resumeData.personal_info.image)

    const {data} = await api.put('/api/resumes/update', formData, {headers:{
      Authorization : token
    }})
    setResumeData(data.resume)
    toast.success(data.message)
    } catch (error) {
      console.log("error saving resume: " , error);  
    }
  }

const changeResumeVisibiltiy = async() => {
  try {
    const formData = new FormData()
    formData.append("resumeId" , resumeId)
    formData.append("resumeData" , JSON.stringify({public: !resumeData.public}));
    const {data} = await api.put('/api/resumes/update',formData , {headers:{
      Authorization: token
    }})
    setResumeData({...resumeData, public:!resumeData.public})
    toast.success(data.message)
  } catch (error) {
    
  }
}

const handleShare = () => {
  const frontendUrl = window.location.href.split('/app/')[0];
  const resumeUrl = `${frontendUrl}/view/${resumeId}`;

  if (navigator.share) {
    navigator.share({
      title: "My Resume",
      text: "Check out my resume!",
      url: resumeUrl,
    })
    .then(() => console.log("Shared successfully"))
    .catch((error) => console.error("Error sharing:", error));
  } else {
    navigator.clipboard.writeText(resumeUrl)
      .then(() => alert("Share not supported. Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  }
};


 
const downloadResume = () => {
  window.print();
}

  return (

    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link className='inline-flex gap-2 items-center text-slate-500 
  hover:text-slate-700 transition-all' to='/app'>
          <ArrowLeftIcon className='size-4' />
          Back to Dashboard
        </Link>
      </div>


      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* ----left panle - from  */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progresss bar using activesectionindex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0  h-1 bg-gradient-to-r
  from-green-500  to-green-600 border-none duration-700 transition-all'
                style={{ width: `${activeSectionIndex * 100 / (section.length - 1)}%` }} />
              {/* section navigation and create div */}
              <div className="flex justify-between items-center
               mb-6 border-b border-gray-300 py-1">


                <div className="flex items-center gap-2">
                  <TemplateSelctor selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selctedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>


                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) =>
                      Math.max(prevIndex - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                       text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4' />  Previous</button>
                  )}
                  <button
                    onClick={() => setActiveSectionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, section.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm 
                      font-medium text-gray-600 hover:bg-gray-50 transition-all 
                      ${activeSectionIndex === section.length - 1 &&
                      'opacity-50'}`} disabled={activeSectionIndex === section.length - 1}>
                    Next   <ChevronRight className='size-4' /> </button>
                </div>
              </div>

              {/*  -------------- fForm contant */}

              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}

                <div>
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryFrom
                      data={resumeData.professional_summary}
                      onChange={(summary) =>
                        setResumeData((prev) => ({...prev, professional_summary: summary }))}
                      setResumeData={setResumeData}
                    />
                  )}
                </div>
                {
                  activeSection.id === 'experience' &&(
                    <ExpirenceFrom  data={resumeData.experience} 
                    onChange={(data) =>setResumeData(prev => ({...prev , experience: data}))}
                     />
                  )
                }
                {
                  activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} 
                    onChange={(data)=> setResumeData(prev => ({...prev, education:data }))}
                    // setResumeData={setResumeData}
            />
                  )
                }

                {
                  activeSection.id === 'projects' && (
                    <ProjectsForm  data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({...prev, project:data}))} 
                  //  setResumeData={setResumeData}
                    />
                  )
                }

                {
                  activeSection.id === 'skills' && (
                    <SkillForm  data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({...prev, skills:data}))} 
                   setResumeData={setResumeData}
                    />
                  )
                }
                
              </div>
              <button  onClick={()=>{toast.promise(saveResume, {loading: 'Saving...'})}}
              className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* ----right panle - preview  */}
          <div className="lg:col-span-7 max:lg:mt-6">

            <div className="relative w-full">
              {/* ------------buttons -------- */}
              <div className="absolute bottom-3 left-0 right-0 flex 
              items-center justify-end gap-2">
                {resumeData.public && ( 
                  <button onClick={handleShare}  className='flex items-center 
                  p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-all'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibiltiy} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-blue-300 hover:ring transition-all'>
                  {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4 ' /> }
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button onClick={downloadResume} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-blue-300 hover:ring transition-all'>
                <DownloadIcon className='size-4' /> Download
                </button>
              </div>

            </div>
            {/* -------resume preview --- */}
            <ResumePreview data={resumeData} template={resumeData.template}
             accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ResumeBulider
