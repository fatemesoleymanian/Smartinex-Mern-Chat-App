import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'
import '../Styles/chatbar.css'
import '../Styles/App.css'
import { useContext, useEffect, useState } from "react";
import MyMessages from "../Components/MyMessages";
import { OthersMessages } from "../Components/OthersMessages";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Skeleton
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { myContext } from '../Layout/MainContainer';
import axios from 'axios';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:4000/"
let socket, chat;

export const Chatbar = () => {

    const params = useParams();
    const [chatId, setChatId] = params._id.split("&");
    const [newMessage, setNewMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [messagesCopy, setMessagesCopy] = useState([]);
    const userData = JSON.parse(localStorage.getItem("user"));
    const { refresh, setRefresh } = useContext(myContext)
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    //connect to socket
    useEffect(() => {

        socket = io(ENDPOINT)
        socket.emit("setup", userData.user);
        socket.on("connection", () => {
            setSocketConnectionStatus(!socketConnectionStatus)
            console.log("connection compeleted")
        });
    }, []);

    //fetch chat
    useEffect(() => {
        const confing = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        };
        axios.get(`${ENDPOINT}api/message/${chatId}`, confing)
            .then(({ data }) => {
                setMessages(data)
                setLoaded(true);
                socket.emit("join chat", chatId)
            });
        setMessagesCopy(messages)
    }, [refresh, chatId, userData.token, messages])

    //new message recievded
    useEffect(() => {

        socket.on("message received", (newMessage) => {
            setMessages([...messages], newMessage)
        })
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
            setNewMessage("");
            setRefresh(!refresh)
            console.log('message sent!')
        }
    }

    const sendMessage = () => {
        var data = null;
        const confing = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        };

        axios.post(`${ENDPOINT}api/message/`, {
            chatId: chatId,
            content: newMessage
        }, confing)
            .then((response) => {
                console.log(response);
                data = response;
                socket.emit("new message", data)

            });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const leaveGroupOclearHistory = () => {
        const confing = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        };
        axios.put(`${ENDPOINT}api/chat/leave-group`, {
            chatId: chatId,
            userId: userData.user._id
        }, confing)
            .then((response) => {
                navigate('/inbox/welcome')
            });
    }

    if (!loaded) {
        return (
            <div style={{
                border: "20px",
                padding: "10px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60} />

                <Skeleton variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px", flexGrow: "1" }}
                    height={60} />

                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60} />
            </div >
        );
    }
    else {
        return (
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to clear history/leave group? "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"This will clear history of a private chat or if it's a Group Chat This causes you leave the group."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                            onClick={() => {
                                leaveGroupOclearHistory();
                                handleClose();
                            }}
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <section className="relative max-h-full h-full bg-white rounded-lg w-full flex flex-col
             dark:bg-black lg:flex">
                    {/* header */}
                    <div className="chatarea-header dark:bg-stone-800 dark:text-gray-100" >
                        <p className="flex justify-center items-center bg-[#d9d9d9] text-[2rem] font-[bolder]
                     text-[white] h-8 w-8 justify-self-center self-center p-1 rounded-[50%]" >{setChatId[0]}</p>
                        <div className={"header-text dark:text-gray-100"}>
                            <p className={" conv-title dark:text-gray-100"}>{setChatId}</p>

                        </div>
                        <IconButton onClick={() => { handleClickOpen() }}>
                            <DeleteIcon className="dark:text-gray-100" />
                        </IconButton>
                    </div>
                    {/* header */}
                    {/* messages */}
                    <div id="allmessages" className="flex-1 overflow-y-scroll p-5 scrollbar-thumb-color
                 dark:scrollbar-thumb-color-dark scrollbar-width space-y-5">

                        {messages && (
                            messages.map((message, index) => {
                                if (message.sender._id === userData.user._id)

                                    return (
                                        <MyMessages
                                            key={index}
                                            name={message.username}
                                            message={message.content}
                                            timestamp={message.createdAt.split('T').pop()}
                                        />)
                                else return (
                                    <OthersMessages key={index}
                                        name={message.sender.name}
                                        message={message.content}
                                        timestamp={message.createdAt.split('T').pop()} />

                                )

                            })
                        )}
                        {
                            messages.length === 0 && <div class='center-div'>
                                start chat with {setChatId}!
                            </div>
                        }

                    </div>
                    {/* messages */}
                    {/* input */}
                    <div className="text-input-area dark:bg-stone-800 dark:text-gray-100">
                        <input type="text" placeholder="Type a message"
                            className="search-box dark:bg-stone-800 dark:text-gray-100"
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={newMessage}
                        />
                        <IconButton onClick={() => {
                            sendMessage()
                            setRefresh(!refresh)
                        }} >
                            <SendIcon className="dark:text-gray-100" />
                        </IconButton>

                    </div>
                    {/* input */}


                </section>
            </>
        )

    }

}


export default Chatbar;