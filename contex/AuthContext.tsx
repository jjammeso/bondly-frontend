'use client'
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type AuthContextType = {
    authorized: boolean;
    setAuthorized: Dispatch<SetStateAction<boolean>>;
  };

  const Authcontext = createContext<AuthContextType | null>(null);

  export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [authorized, setAuthorized] = useState(false);

    return (
        <Authcontext.Provider value={{authorized, setAuthorized}}>
            {children}
        </Authcontext.Provider>
    )
  }

  export const useAuth= () =>{
    const context = useContext(Authcontext);
    if (!context) throw new Error("useAuthorized must be used within a ProtectedRoute");
    return context;
  }