import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import "./App.css";
import AddEntry from "./pages/AddEntry";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header /> {/* Always display the header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/addentry" element={<AddEntry />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
