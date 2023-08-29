import './Styles/App.css';
import { Routes, Route } from 'react-router-dom';
import LoginAndRegister from './Pages/Auth/LoginAndRegister'
function App() {
  return (
    <div className='flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto'>
      {/* <Routes> */}
      {/* <Route path='/' element={<LoginAndRegister />} /> */}

      {/* </Routes> */}
      <LoginAndRegister />

    </div>
  );
}

export default App;
