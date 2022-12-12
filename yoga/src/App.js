import './App.css';
import YogaForm from "./mycomponents/YogaForm";
import UserProfile from "./mycomponents/UserProfile"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./mycomponents/login"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<YogaForm/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<UserProfile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
