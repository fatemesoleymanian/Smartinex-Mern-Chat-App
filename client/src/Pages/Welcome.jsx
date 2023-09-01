import '../Styles/welcome.css'
import Logo from '../Images/live-chat2.png'
import { AnimatePresence, motion } from 'framer-motion';



export const Welcome = () => {
    return (
        <AnimatePresence>
            <motion.section initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 1, scale: 1 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.4"
                }} className='relative max-h-full h-full bg-white rounded-lg w-full flex flex-col dark:bg-stone-950 lg:flex'>
                <div className='welcome-container max-h-full h-full rounded-lg w-full text-dark dark:text-white'>
                    <img alt='welcome' src={Logo} className="welcome-logo" />
                    <p>Welcome to smartinex chat application!</p>
                    <p>View and text directly to people in chat rooms!</p>
                </div>

            </motion.section>
        </AnimatePresence>
    )
}


export default Welcome;