import './Chat.css';
import LogoSearch from '../../components/logoSearch/LogoSearch';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { userChats } from '../../api/chatRequest';
import Conversation from '../../components/conversation/Conversation';
import ChatBox from '../../components/chatBox/ChatBox';
import {io} from 'socket.io-client';
import {logout} from '../../actions/authAction';

const Chat = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit("add-new-user", user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    }, [user])

    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setReceiveMessage(data)
        })
    }, [])

    useEffect(() => {
        const getChats = async () => {
            try {
                const {data} = await userChats(user._id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats()
    }, [user])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online? true : false
    }

    const handleLogOut = ()=> {
        dispatch(logout())
    }
    
    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch/>
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => {
                            return (
                                <div onClick={()=>setCurrentChat(chat)}>
                                    <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="Right-side-chat">
                <div>
                    <div className="navButton">
                        <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
                    </div>
                    <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Chat;