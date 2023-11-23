import '../Styles/sidebar.css';
import '../Styles/App.css'
import { motion } from 'framer-motion'
import Group from '@mui/icons-material/Group'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const ConversationItem = ({ name, lastMessage, timestamp, _id, groupTypeFlag }) => {

    const navigate = useNavigate()
    const lightTheme = useSelector((state) => state.themeKey);
    return (

        <motion.div title={groupTypeFlag === true ? "group chat" : "private chat"}
            onClick={() => {
                navigate(`chatroom/${_id}&${name}`)
            }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.98 }}
            className="cursor-pointer flex - px-8">
            {/* icon */}

            <div className="mr-4 relative w-12 text-center">
                <div className="conv-icon rounded-full w-[3em] h-[3em] mr-2 bg-white">
                    {groupTypeFlag === true ? <Group className="group-icon" /> : name[0]}
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                    {/* name */}

                    <div className="text-gray-800 text-lg font-semibold dark:text-gray-300">
                        {name}
                    </div>
                    {/* timestamp */}
                    <div className="text-gray-700 dark:text-gray-600 text-xs">
                        {timestamp}
                    </div>
                </div>

                {/* last message */}
                <div className="text-gray-300 text-md dark:text-gray-600">
                    {lastMessage && lastMessage.length > 16 ? `${lastMessage.substring(0, 16)}...` : lastMessage}
                </div>
            </div>


        </motion.div>
    )

}

export default ConversationItem;