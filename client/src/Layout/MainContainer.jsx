import '../Styles/App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux';
import { createContext, useState } from 'react';

export const myContext = createContext();
const MainContainer = () => {


    const lightTheme = useSelector((state) => state.themeKey);
    const [refresh, setRefresh] = useState(true);
    return (
        <div className={"p-12 xsm:p-2 lg:p-20 w-full wrapper" + (lightTheme ? "" : " dark")}>
            <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }} >
                <Sidebar />
                <Outlet />
            </myContext.Provider>

        </div>
    )
}
export default MainContainer;