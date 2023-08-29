import '../Styles/welcome.css'
import Logo from '../Images/live-chat2.png'



export const Welcome = () => {
    return (
        <section className='relative max-h-full h-full bg-white rounded-lg w-full flex flex-col dark:bg-stone-950 lg:flex'>
            <div className='welcome-container max-h-full h-full rounded-lg w-full text-dark dark:text-white'>
                <img alt='welcome' src={Logo} />
                <p>Welcome to smartinex chat application!</p>
                <p>View and text directly to people in chat rooms!</p>
            </div>

        </section>
    )
}


export default Welcome;