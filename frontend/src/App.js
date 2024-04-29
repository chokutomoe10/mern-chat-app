import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  
  return (
    <div className="App">
        <div className="blur" style={{ top: '-18%', right: '0'}}></div>
        <div className="blur" style={{ top: '36%', left: '-8rem'}}></div>
        <Routes>
          <Route path="/" element={user?<Navigate to = "../chat"/> : <Auth/>}/>
          <Route path="/chat" element={user?<Chat/> : <Navigate to = "../"/>}/>
        </Routes>
    </div>
  );
}

export default App;
