import React from 'react'
import default_img from '../Images/default_img.jpg'

const PostCard = (props) => {
    console.log("Received props:", props);

    let { title, description, image } = props

    return (
        <div className="max-w-sm bg-[#f8f8f8] border shadow-lg mx-2">
            <a href="#">
                <img className="" src={!image ? default_img : image} alt="Image" 
                onError={(e)=>{
                    e.target.src = default_img
                }}/>
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold font-poppins tracking-tight text-gray-900">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 ">{description}...</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lightBlue rounded-lg hover:bg-[#0e9090] duration-500">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

    )
}

export default PostCard
