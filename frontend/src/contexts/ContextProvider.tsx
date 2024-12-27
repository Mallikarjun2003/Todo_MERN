import React, { createContext, useContext, useState } from "react";

const Context = createContext({
  user: {
    _id: "",
    username: "",
  },
  setUser: (user: { _id: string; username: string }) => {},
});

export const useGlobalContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    username: "",
    _id: "",
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
