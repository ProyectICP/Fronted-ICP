import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({children}){
  //const local = localStorage.getItem('login') || {}
  const [user,setUser] = useState({});

  return <AuthContext.Provider value={{user,setUser}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContext