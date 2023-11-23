import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import NightLightIcon from '@mui/icons-material/Nightlight'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import '../Styles/sidebar.css';
import '../Styles/App.css'
import ConversationItem from '../Components/ConversationItem'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../Store/themeSlice';
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'



const Sidebar = () => {

    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lightTheme = useSelector((state) => state.themeKey)
    const [conversations, setConversations] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        };
        axios.get('http://localhost:4000/api/chat/', config).then((response) => {
            setConversations(response.data)
        })
    }, [refresh]);
    const userData = JSON.parse(localStorage.getItem('user'))

    const logoutHandler = () => {
        localStorage.removeItem('user')
        navigate("/")
    }

    return (

        <AnimatePresence>
            <motion.aside className="w-1/8 lg:w-2/6 bg-white dark:bg-stone-950 rounded-lg mr-5 xsm:mr-0 overflow-y-scroll
        scrollbar-width scrollbar-thumb-color dark:scrollbar-thumb-color-dark">

                {/* HEADER START */}
                <motion.div initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }} exit={{ scaleY: 1 }}
                    transition={{
                        ease: "anticipate",
                        duration: "0.4"
                    }} className="sb-header sticky top-0 lg:z-10 md:h-full sm:h-full xsm:w-full dark:bg-stone-800
            dark:text-gray-100">
                    <div>
                        <IconButton onClick={() => { navigate('/inbox/welcome') }}>
                            <AccountCircleIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton onClick={() => { navigate('/inbox/users') }}>
                            <PersonAddIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                        </IconButton>
                        <IconButton onClick={() => { navigate('/inbox/groups') }}>
                            <GroupAddIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                        </IconButton>
                        <IconButton onClick={() => { navigate('/inbox/create-group') }}>
                            <AddCircleIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                        </IconButton>
                        <IconButton onClick={() => {
                            dispatch(toggleTheme());
                        }}>
                            {lightTheme && <NightLightIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />}
                            {!lightTheme && <LightModeIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />}
                        </IconButton>

                        <IconButton onClick={logoutHandler}>

                            <LogoutIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />

                        </IconButton>
                    </div>

                </motion.div>
                {/* HEADER END */}
                {/* SEARCH START */}
                <motion.div initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }} exit={{ scaleY: 1 }}
                    transition={{
                        ease: "anticipate",
                        duration: "0.4"
                    }} className='sb-search sticky top-20 lg:z-10 dark:bg-stone-800 dark:text-gray-100'>
                    <IconButton >
                        <SearchIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                    </IconButton>
                    <input type="text" placeholder='Search...'
                        className='search-box dark:bg-stone-800 dark:text-gray-100'
                        onClick={() => {
                            setRefresh(true)
                        }} />
                </motion.div>

                {/* SERACH END */}
                {/* CONVERSATIONS START */}
                <motion.div initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }} exit={{ scaleY: 1 }}
                    transition={{
                        ease: "anticipate",
                        duration: "0.4"
                    }} className='flex-1 overflow-y-scroll scrollbar-width scrollbar-thumb-color
            dark:scrollbar-thumb-color-dark md:hidden'>
                    <div className='w-full space-y-10'>
                        {conversations &&
                            conversations.map((conv, index) => {
                                if (conv.isGroupChat) return (
                                    <ConversationItem _id={conv._id} name={conv.name} lastMessage={conv?.lastMessage?.content}
                                        timestamp={conv.updatedAt.split('T').pop()}
                                        groupTypeFlag={true} key={index} />

                                )
                                else return (
                                    <ConversationItem _id={conv._id}
                                        name={conv?.users[1]?._id === userData?.user?._id ? conv?.users[0]?.name : conv?.users[1]?.name}
                                        lastMessage={conv?.lastMessage?.content}
                                        timestamp={conv.updatedAt.split('T').pop()}
                                        groupTypeFlag={false} key={index} />

                                )
                            })
                        }

                    </div>

                </motion.div>

                {/* CONVERSATIONS END */}




            </motion.aside>
        </AnimatePresence>
    )
}

export default Sidebar;