import './Styles/App.css';
import { Routes, Route } from 'react-router-dom';
import LoginAndRegister from './Pages/Auth/LoginAndRegister'
import MainContainer from './Layout/MainContainer'
import Welcome from './Pages/Welcome'
import Chatbar from './Pages/Chatbar';
import Users from './Pages/Users';
import Groups from './Pages/Groups';
import CreateGroup from './Pages/CreateGroup';
import { useSelector } from 'react-redux';
function App() {

  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={'flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto' + (lightTheme ? "" : " dark")}>
      <Routes>
        <Route path='/' element={<LoginAndRegister />} />
        <Route path='inbox' element={<MainContainer />} >
          <Route path='welcome' element={<Welcome />} />
          <Route path='chatroom/:_id' element={<Chatbar />} />
          <Route path="users" element={<Users />} />
          <Route path='groups' element={<Groups />} />
          <Route path='create-group' element={<CreateGroup />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App;
