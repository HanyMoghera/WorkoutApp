import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// build the hook function 
export const useAuthContext = ()=>{
    const context = useContext(AuthContext) // it has the sate and the spatch function 

    if(!context){
        throw Error('useAuthContext must be used inside an useAuthContextprovider');
    }
    return context
}