import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpClient from '../utils/httpclient';

const MessageCard = ({ message , onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg min-h-64 min-w-96 flex flex-col relative">
                {message.map((msg, index) => (
                    <p key={index} className="text-lg font-semibold">{msg}</p>
                ))}
                <button onClick={onClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-lightBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

const Posture = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState([]);
    const [card, setCard] = useState(false);
    const navigate = useNavigate();

    const handlePost = async () => {
        try {
            if (!title || !image) {
                toast.error('Title and image are required');
                return;
            }
            const formData = new FormData();
            formData.append('input', title);
            formData.append('file', image);
            const response = await httpClient.post('http://127.0.0.1:5000/posture', formData);
            console.log('Response:fwew ', response);
            setTitle('');
            setImage(null);
            setMessage(response.data.response); // Set the message received from the server
            setCard(true); // Open the MessageCard
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while uploading the image');
        }
    };

    const handleCloseMessage = () => {
        setCard(false); // Close the MessageCard
        setMessage(''); // Reset message state
    };

    const handleCancel = () => {
        toast.info('Post has been cancelled');
        navigate('/community');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="pt-20 h-full flex items-center justify-center">
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 p-4 shadow-xl max-w-2xl">
                <div className="heading text-center font-poppins font-semibold text-2xl m-5 text-lightBlue">Posture Correction</div>

                <div className="my-3">
                    <p className="text-gray-500 text-l font-poppins mb-4 font-semibold">Input Prompt:</p>
                    <input className="title bg-[#ebfbfb] p-2 mb-4 outline-none font-poppins w-full" spellCheck="false" placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="my-3">
                    <p className="text-gray-500 text-l font-poppins mb-4 font-semibold">Choose an image:</p>
                    <input className="title bg-[#ebfbfb] p-2 mb-4 outline-none font-poppins w-full" spellCheck="false" type="file" onChange={handleFileChange} />
                </div>

                <div className="buttons flex">
                    <div className="btn border-2 border-lightBlue rounded-md p-1 mt-2 px-2 font-semibold cursor-pointer text-gray-500 ml-0" onClick={handleCancel}>Cancel</div>
                    <div className="btn border border-lightBlue rounded-md p-1 mt-2 px-4 font-semibold cursor-pointer text-[#f8f8f8] ml-2 bg-lightBlue" onClick={handlePost}>Submit</div>
                </div>
            </div>
            {card && (<MessageCard message={message} onClose={handleCloseMessage} />)}
        </div>
    );
};

export default Posture;
