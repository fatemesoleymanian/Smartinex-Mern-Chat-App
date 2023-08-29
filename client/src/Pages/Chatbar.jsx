import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'
import '../Styles/chatbar.css'
import '../Styles/App.css'
import { useState } from "react";
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
} from "@mui/material";

export const Chatbar = () => {
    const [newMessage, setNewMessage] = useState('');
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            _id: Math.random(),
            username: 'hanie',
            message: 'i am hanie',
            createdAt: 'today'
        },
        // {
        //     _id: Math.random(),
        //     username: 'hossein',
        //     message: 'i am hossein',
        //     createdAt: 'today'
        // },
    ])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // sendMessage()
            // setNewMessage("");
            // setRefresh(!refresh)
            console.log('message sent!')
        }
    }

    const sendMessage = () => {
        console.log('message sent' + newMessage)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const leaveGroupOclearHistory = () => {
        console.log('message will be deleted!')
    }

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
                 text-[white] h-8 w-8 justify-self-center self-center p-1 rounded-[50%]" >H</p>
                    <div className={"header-text dark:text-gray-100"}>
                        <p className={" conv-title dark:text-gray-100"}>Hanie</p>

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

                            return (<>
                                <MyMessages
                                    key={index}
                                    name={message.username}
                                    message={message.message}
                                    timestamp={message.createdAt.split('T').pop()}
                                />
                                <OthersMessages key={index}
                                    name={message.username}
                                    message={message.message}
                                    timestamp={message.createdAt.split('T').pop()} />
                            </>
                            )

                        })
                    )}
                    {
                        messages.length === 0 && <div class='center-div'>
                            start chat with this user!
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
                    }} >
                        <SendIcon className="dark:text-gray-100" />
                    </IconButton>

                </div>
                {/* input */}


            </section>
        </>
    )
}

export default Chatbar;