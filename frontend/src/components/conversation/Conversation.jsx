import { useEffect, useState } from "react";
import { getUser } from "../../api/chatRequest";
import profilePicture from "../../img/defaultProfile.png";

const Conversation = ({data, currentUserId, online}) => {
    const [userData, setUserData] = useState(null);
    const userId = data.members.find((id)=>id!==currentUserId);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const {data} = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, [])

    return (
        <>
            <div className="follower conversation">
                <div>
                    { online && <div className="online-dot"></div>}
                    <img src={userData?.profilePicture ? userData.profilePicture : profilePicture} alt="" className="followerImage" style={{width:"50px", height:"50px"}}/>
                    <div className="name" style={{fontSize:"0.8rem"}}>
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{width: '85%', border: '0.1px solid whitesmoke'}}/>
        </>
    );
};

export default Conversation;