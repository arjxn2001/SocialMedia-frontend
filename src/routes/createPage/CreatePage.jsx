import { useNavigate } from "react-router"
import useAuthStore from "../../utils/authStore"
import "./createPage.css"
import { IoMdCloudUpload } from 'react-icons/io'
import { useEffect, useRef } from "react"
import { useState } from "react"
import { Pencil } from "lucide-react"
import Editor from "../../components/editor/Editor"
import useEditorStore from "../../utils/editorStore"
import apiRequest from "../../utils/apiRequest"



const CreatePage = () => {

  const {currentUser} =  useAuthStore()
  const navigate = useNavigate()
  const formRef = useRef()
  const {textOptions, canvasOptions} = useEditorStore()

  const [file, setFile]= useState(null);
  const [previewImg, setPreviewImg]= useState({
    url:"",
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing]= useState(false);

  useEffect(()=> {
    if(!currentUser){
      navigate("/auth")
    }
  }, [navigate, currentUser]);


  useEffect(()=>{
    if(file){
      
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload=()=>{
        setPreviewImg({
          url:URL.createObjectURL(file),
          width:img.width,
          height:img.height,
        })
      }
    }
  },[file])


  const handleSubmit = async () =>{
    if(isEditing){
      setIsEditing(false)
    }else{
      const formData = new FormData(formRef.current)
      formData.append("media", file)
      formData.append("textOptions",JSON.stringify(textOptions) )
      formData.append("canvasOptions",JSON.stringify(canvasOptions) )

      try{
        const res = await apiRequest.post("/pins", formData,{
          headers:{
            "Content-Type": "multipart/form-data",
          }
        } );
        navigate(`/pin/${res.data._id}`)
      }catch(err){
        console.log(err)
      }

    }
  }



  return (
    <div className='createPage'>
      <div className="createTop border-y border-gray-200 py-5 flex items-center justify-between">
        <h1 className='text-2xl font-semibold'>{isEditing?"Edit your Pin" :"Create Pin"}</h1>
        <button onClick={handleSubmit} className='bg-red-600 text-white py-2 px-4 rounded-2xl cursor-pointer font-semibold hover:bg-red-700'>{isEditing ? "Done":"Publish"}</button>
      </div>
      {isEditing ? 
      <Editor previewImg={previewImg} /> 
      :
      (
        <div className="createBottom mt-15 flex justify-center gap-30">
        {previewImg.url ? 
        <div className="preview w-90 relative">
          <img src={previewImg.url} alt="" className="rounded-2xl w-full" />
          <div className="editIcon absolute top-4 right-4 bg-white rounded-full h-10 w-10 flex justify-center items-center p-2 cursor-pointer"  onClick={()=>setIsEditing(true)}>
            <Pencil />
          </div>
        </div> 
        : 
        (<><label htmlFor="file" className="upload bg-gray-100 cursor-pointer text-xl flex items-center justify-center rounded-2xl w-90 h-130 p-8 relative">
          <div className="uploadTitle flex flex-col items-center gap-1 ">
          <IoMdCloudUpload className="text-6xl"/>
          <span className="text-sm font-semibold">Choose a file.</span>
          </div>
          <div className="uploadInfo absolute bottom-8 text-center text-sm text-gray-600 px-10">
            We recommend using high quality .jpg files more than 20mb and less than 200mb.
          </div>
        </label>

        <input
          type="file"
          id="file" 
          hidden 
          onChange={e=>setFile(e.target.files[0])}
          /></>)}

        <form className="createForm flex flex-col gap-4 w-145 " ref={formRef}>

          <div className="createFormItem">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder='Add a title' name='title' id='title' />
          </div>

          <div className="createFormItem">
            <label htmlFor="description">Description</label>
            <textarea 
              rows={6}
              type="text" 
              placeholder='Add a detailed description' name='description' 
              id='description' />
          </div>

          <div className="createFormItem">
            <label htmlFor="link">Link</label>
            <input type="text" placeholder='Add a link' name='link' id='link' />
          </div>

          <div className="createFormItem">
            <label htmlFor="board">Board</label>
            <select name="board" id="board">
              <option value="">Choose a board</option>
              <option value="1">Board 1</option>
              <option value="2">Board 2</option>
              <option value="3">Board 3</option>
            </select>
          </div>

          <div className="createFormItem">
            <label htmlFor="tags">Tagged topics</label>
            <input type="text" placeholder='Add tags' name='tags' id='tags' />
            <small>Don&apos;t worry, people won&apos;t see your tags.</small>
          </div>
        </form>
        </div>
      
      ) }
    </div>
  )
}

export default CreatePage





