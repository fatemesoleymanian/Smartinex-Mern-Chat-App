

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";
import React, { useState } from "react";
import '../Styles/create-groups.css'
import '../Styles/App.css'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { AnimatePresence, motion } from "framer-motion";

export const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const CreateGroup = () => {
        console.log('group created ' + groupName)
    }

    return (
        <AnimatePresence>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to ccreate group? "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"This will create a group whit the name you picked."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            CreateGroup()
                            handleClose();
                        }}
                        autoFocus
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <motion.section initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 1, scale: 1 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.4"
                }}
                className="relative max-h-full h-full bg-white rounded-lg w-full flex flex-col dark:bg-stone-950 lg:flex">
                <div className="create-group-wrapper w-4/5 dark:bg-stone-800 dark:text-gray-100 shadow-md">
                    <input type="text" placeholder="Enter group name"
                        className={"search-box dark:bg-stone-800 dark:text-gray-100"}
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.code === "Enter") {
                                handleClickOpen();
                            }
                        }} />
                    <IconButton onClick={() => { handleClickOpen(); }}>
                        <DoneOutlineRoundedIcon className="dark:text-gray-100" />
                    </IconButton>

                </div>
            </motion.section>
        </AnimatePresence>

    )
}

export default CreateGroup;