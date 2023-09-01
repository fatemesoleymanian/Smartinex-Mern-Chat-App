import { useState } from "react"
import '../Styles/users-groups.css'
import Logo from '../Images/live-chat2.png'
import '../Styles/App.css'
import '../Styles/sidebar.css'
import { IconButton } from "@mui/material";
import SerachIcon from '@mui/icons-material/Search'
import { AnimatePresence, motion } from "framer-motion"

export const Groups = () => {

    const [groups, setGroups] = useState([
        {
            name: 'Smartinex Channel',
            _id: Math.random()
        },
        {
            name: 'Friends Group',
            _id: Math.random()
        },
    ])
    return (
        <AnimatePresence>
            <motion.section initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 1, scale: 1 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.5"
                }}
                className="relative max-h-full h-full bg-white rounded-lg w-full flex flex-col dark:bg-stone-950 lg:flex">

                {/* header */}

                <div className="user-groups-header dark:bg-stone-800 dark:text-gray-100">
                    <img src={Logo} alt="logo" style={{ height: "2rem", width: "2rem" }} />
                    <p className="user-groups-title dark:text-gray-100" > Available Groups</p>
                </div>
                {/* header */}
                {/* search */}
                <div className="sb-search dark:bg-stone-800 dark:text-gray-100">

                    <IconButton>
                        <SerachIcon className="dark:text-gray-100" />
                    </IconButton>
                    <input placeholder="Search" className="search-box dark:bg-stone-800 dark:text-gray-100 " />
                </div>

                {/* search */}

                {/* users */}
                <div className="user-group-list">
                    {
                        groups && groups.map((group, index) => {
                            return (
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} className="list-item dark:bg-stone-700 dark:text-gray-100" key={index}>
                                    <p className="flex justify-center items-center bg-[#d9d9d9] text-[2rem] font-[bolder] text-[white] h-8 w-8 justify-self-center self-center p-1 rounded-[50%]">
                                        {group.name.charAt(0)}
                                    </p>
                                    <p className="font-[bold] text-[rgba(0,0,0,0.54)] conv-title dark:text-gray-100">
                                        {group.name}
                                    </p>
                                </motion.div>

                            )
                        })
                    }

                </div>

                {/* users */}
            </motion.section>
        </AnimatePresence>

    )
}

export default Groups;