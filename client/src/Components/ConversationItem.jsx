import '../Styles/sidebar.css';
import '../Styles/App.css'

export const ConversationItem = ({ name, lastMessage, timestamp, _id }) => {


    return (
        <div className="cursor-pointer flex - px-8">
            {/* icon */}

            <div className="mr-4 relative w-12 text-center">
                <div className="conv-icon rounded-full w-[3em] h-[3em] mr-2 bg-white">
                    {name[0]}
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
                    {lastMessage}
                </div>
            </div>


        </div>
    )

}

export default ConversationItem;