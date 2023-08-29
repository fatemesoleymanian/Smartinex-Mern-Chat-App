
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export const MainContainer = () => {


    return (
        <div className="p-12 xsm:p-2 lg:p-20 w-full">
            <div className="max-h-full h-full flex flex-row">
                <Sidebar />
                <Outlet />
            </div>

        </div>
    )
}
export default MainContainer;