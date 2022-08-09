import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useGlobalUser(){
  const { user,setUser } = useContext(AuthContext);
  
  return {user,setUser};
}