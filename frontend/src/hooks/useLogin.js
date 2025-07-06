import { useState } from "react";
import {useAuthContext} from './useAuthcontext';

 export const useLogin = ()=>{

    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const {dispatch} = useAuthContext();

    const Login = async(email, password)=>{
                setIsloading(true)
                setError(null)

                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})  
                });
                const json = await response.json();

                if(!response.ok){
                    setIsloading(false)
                    setError(json.error)
                }
                if(response.ok){
                    // save the user in the local storage 
                    localStorage.setItem('user', JSON.stringify(json))
                    //update the authcontext 
                    dispatch({type:'LOGIN', payload: json})
                    setIsloading(false)
                }

    }

    return {Login, isLoading, error}
 } 