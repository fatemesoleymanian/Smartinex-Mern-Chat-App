import '../Styles/chatbar.css'
import '../Styles/sidebar.css'
import '../Styles/App.css'

export const OthersMessages = ({ name, message, timestamp }) => {


    return (
        <div className="flex justify-start">
            <div className="w-14 mr-5">
                <p className="conv-icon rounded-full w-[3em] h-[3em] mr-2 bg-white overflow-hidden">
                    {name[0]}
                </p>
            </div>
            <div className="flex flex-col space-y-3 text-left">
                <div>
                    <span className="bg-gray-100 text-gray-900 p-5 text-base rounded-r-lg rounded-b-lg inline flex max-w-xl dark:text-white dark:bg-stone-800">
                        {message}
                    </span>
                    <p className={"self-timestamp text-stone-800 pt-2 dark:text-white"}>{timestamp}</p>
                </div>

            </div>

        </div>
    )
}

export default OthersMessages;