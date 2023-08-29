
import '../Styles/chatbar.css'
import '../Styles/sidebar.css'
import '../Styles/App.css'

export const MyMessages = ({ name, message, timestamp }) => {


    return (
        <div className="flex justify-end">
            <div className="space-y-5 text-right">
                <div>
                    <span className="bg-teal-600 text-white p-5 text-base rounded-l-lg rounded-b-lg inline-block max-w-xl">
                        {message}
                    </span>
                    <p className="self-timestamp text-dark dark:text-white pt-2">{timestamp}</p>
                </div>

            </div>
        </div>
    )
}

export default MyMessages;