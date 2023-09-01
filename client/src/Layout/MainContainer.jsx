
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux';
export const MainContainer = () => {


    const lightTheme = useSelector((state) => state.themeKey);
    return (
        <div className={"p-12 xsm:p-2 lg:p-20 w-full" + (lightTheme ? "" : " dark")}>
            <div className="max-h-full h-full flex flex-row">
                <Sidebar />
                <Outlet />
            </div>

        </div>
    )
}
export default MainContainer;