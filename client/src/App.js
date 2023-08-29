import './Styles/App.css';
import { Routes, Route } from 'react-router-dom';
import LoginAndRegister from './Pages/Auth/LoginAndRegister'
import MainContainer from './Layout/MainContainer'
import Welcome from './Pages/Welcome'
import Chatbar from './Pages/Chatbar';
function App() {
  return (
    <div className='flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto'>
      <Routes>
        <Route path='/' element={<LoginAndRegister />} />
        <Route path='inbox' element={<MainContainer />} >
          <Route path='welcome' element={<Welcome />} />
          <Route path='chatroom' element={<Chatbar />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App;
