import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoCallHome = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`room/${value}`);
  }, [value, navigate]);

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="m-10 my-auto px-auto py-auto">
        <h1 className="text-6xl-font-poppins font-bold">
          We recommend to put your patient name as the room name
        </h1>
        <input
          type="text"
          className="border-2 border-bmgreen rounded-md"
          placeholder="Enter Room Code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={handleJoinRoom}
          className="btn bg-bmgreen text-gray-700 border-2 border-bmgreen rounded-md mx-2 px-2"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default VideoCallHome;
