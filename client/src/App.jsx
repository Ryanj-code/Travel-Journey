import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import AddEntryForm from "./pages/AddEntryForm";
import EditEntryForm from "./pages/EditEntryForm";
import EntryDetail from "./pages/EntryDetail";
import "./App.css";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
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
          <Route path="/entry/:entryId" element={<EntryDetail />} />
          <Route path="/addentry" element={<AddEntryForm />} />
          <Route path="/editentry/:entryId" element={<EditEntryForm />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
