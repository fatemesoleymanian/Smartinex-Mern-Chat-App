import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import NightLightIcon from '@mui/icons-material/Nightlight'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import '../Styles/sidebar.css';
import '../Styles/App.css'
import ConversationItem from '../Components/ConversationItem'
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {

    const navigate = useNavigate()
    const [conversations, setConversations] = useState([
        {
            _id: Math.random(),
            name: 'chat 1',
            lastMessage: 'hey guyss',
            createdAt: 'today'
        },
        {
            _id: Math.random(),
            name: 'chat 2',
            lastMessage: 'i am hanie',
            createdAt: 'today'
        },
        {
            _id: Math.random(),
            name: 'chat 3',
            lastMessage: 'hey friends',
            createdAt: 'today'
        },
        {
            _id: Math.random(),
            name: 'chat 4',
            lastMessage: 'bye guyss',
            createdAt: 'today'
        },
    ]);
    return (
        <aside className="w-1/8 lg:w-2/6 bg-white dark:bg-stone-950 rounded-lg mr-5 xsm:mr-0 overflow-y-scroll
        scrollbar-width scrollbar-thumb-color dark:scrollbar-thumb-color-dark">

            {/* HEADER START */}
            <div className="sb-header sticky top-0 lg:z-10 md:h-full sm:h-full xsm:w-full dark:bg-stone-800
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
                    <IconButton >
                        <NightLightIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                    </IconButton>

                    <IconButton >
                        <LogoutIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                    </IconButton>
                </div>

            </div>
            {/* HEADER END */}
            {/* SEARCH START */}
            <div className='sb-search sticky top-20 lg:z-10 dark:bg-stone-800 dark:text-gray-100'>
                <IconButton >
                    <SearchIcon className='w-[1.25em] h-[1.25em] dark:text-gray-100' />
                </IconButton>
                <input type="text" placeholder='Search...' className='search-box dark:bg-stone-800 dark:text-gray-100' />
            </div>

            {/* SERACH END */}
            {/* CONVERSATIONS START */}
            <div className='flex-1 overflow-y-scroll scrollbar-width scrollbar-thumb-color
            dark:scrollbar-thumb-color-dark md:hidden'>
                <div className='w-full space-y-10'>
                    {conversations &&
                        conversations.map((conv, index) => {
                            return (
                                <ConversationItem _id={conv._id} name={conv.name} lastMessage={conv.lastMessage}
                                    timestamp={conv.createdAt} key={index} />

                            )
                        })
                    }

                </div>

            </div>

            {/* CONVERSATIONS END */}




        </aside>
    )
}

export default Sidebar;