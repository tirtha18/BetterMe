import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import httpclient from '../utils/httpclient'


const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image_link, setImageLink] = useState("sample image link")

    const navigate = useNavigate()

    const handlePost = async () => {
        try {
            const response = await httpclient.post("//localhost:5000/create/post", {
                title,
                description,
                image_link
            })
            if(response.status === 200){
                toast.success("Post Created Successfully!")
                navigate("/community")
            }
        } catch (error) {
            if(error.message){
                const {status, data} = error.response
                console.log(error.response)
                toast.error(`Error: ${status}, ${data.message}`)
            } else if (error.request){
                toast.error("No response received from server")
            } else {
                toast.error("Something went wrong, please try again later")
            }
        }
    }

    const handleCancel = () => {
        toast.info("Post has been cancelled")
        navigate("/community")
    }

    return (
        <div>
            <div className='pt-14'>
                <div className="heading text-center font-poppins font-semibold text-2xl m-5 text-lightBlue">Share your insights with the world! Create a post here</div>
                <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl">
                    <input className="title bg-[#ebfbfb] p-2 mb-4 outline-none font-poppins" spellCheck="false" placeholder="Title" type="text" onChange={(e) => setTitle(e.target.value)} />
                    <input className="title bg-[#ebfbfb] p-2 mb-4 outline-none font-poppins" spellCheck="false" placeholder="We recommend posting an image url here" type="text" onChange={(e) => setImageLink(e.target.value)} />
                    <textarea className="description bg-[#e9ffff] sec p-3 h-60 outline-none font-poppins" spellCheck="false" placeholder="Describe everything about your post here" onChange={(e) => setDescription(e.target.value)}></textarea>

                    <div className="buttons flex">
                        <div className="btn border-2 border-lightBlue p-1 mt-2 px-2 font-semibold rounded-md cursor-pointer text-gray-500 ml-auto" onClick={handleCancel}>Cancel</div>
                        <div className="btn border border-lightBlue p-1 mt-2 px-4 rounded-md font-semibold cursor-pointer text-[#f8f8f8] ml-2 bg-lightBlue" onClick={handlePost}>Post</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
