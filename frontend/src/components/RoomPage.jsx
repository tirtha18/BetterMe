import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {

    const { roomId } = useParams()

    const myMeeting = async (element) => {
        const appID = 188525620;
        const serverSecret = "603585ae2ba2392d52d4cc5786857446";
        const roomID = roomId
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "Patient1")

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks:[
                {
                    name:'Copy Link',
                    url: `http://localhost:3000/room/${roomId}`
                }
            ],
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true
        })
    }


    return (
        <div>
            <div ref={myMeeting}/>
        </div>
    )
}

export default RoomPage