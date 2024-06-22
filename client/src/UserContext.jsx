import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (err) {
        console.log(err, "An error occurred");
      }
    };

    fetchUserProfile();
  }, []);
  // useEffect should not directly return a promise or be marked as async.
  // Instead, create an async function inside useEffect for async operations.
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
