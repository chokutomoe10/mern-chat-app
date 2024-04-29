import { useEffect, useRef, useState } from "react";
import './ChatBox.css';
import { getUser } from "../../api/chatRequest";
import profilePicture from "../../img/defaultProfile.png";
import { addMessage, getMessages } from "../../api/messageRequest";
import {format} from "timeago.js";
import InputEmoji from 'react-input-emoji';

const ChatBox = ({chat, currentUser, setSendMessage, receiveMessage}) => {
    const [userData, setUserData] = useState(null);
    const userId = chat?.members?.find((id)=>id!==currentUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();

    useEffect(() => {
        if (receiveMessage && receiveMessage?.chatId === chat?._id) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage])

    useEffect(() => {
        const getUserData = async () => {
            try {
                const {data} = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat!==null) getUserData();
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat!==null) fetchMessages();
    })

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        };

        try {
            const {data} = await addMessage(message);
            console.log("Ini message", message);
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }

        setSendMessage({...message, userId})
    }

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    
    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img src={userData?.profilePicture ? userData.profilePicture : profilePicture} alt="" className="followerImage" style={{width:"50px", height:"50px"}}/>
                                <div className="name" style={{fontSize:"0.8rem"}}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                </div>
                            </div>
                        </div>
                        <hr style={{width: '85%', border: '0.1px solid whitesmoke'}}/>
                    </div>

                    <div className="chat-body">
                        { messages.map((message) => (
                                <>
                                    <div className= {message.senderId === currentUser ? "message own" : "message"} ref={scroll}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            )
                        )}
                    </div>

                    <div className="chat-sender">
                        <div>+</div>
                        <InputEmoji value={newMessage} onChange={handleChange}/>
                        <div className="send-button button" onClick={handleSend}>Send</div>
                    </div>
                </>
                ) : (
                    <span className="chatbox-empty-message">Tap on a Chat to start Conversation...</span>
                )}
            </div>
        </>
    );
};

export default ChatBox;