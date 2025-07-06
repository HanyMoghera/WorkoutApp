import { createContext, useReducer , useEffect} from "react";


export const AuthContext = createContext()


export const authReducer = (state, action)=>{

    switch(action.type){
        case 'LOGIN':
        return{user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default: return {state}
    }
}

export const AuthContextProvider = ({children})=>{
const [state, dispatch] = useReducer(authReducer, {
    user:null
})

// to solve the problem that when the user login and the token is saved in the local storage 
// and then the user refresh the page the Authcontest will be come null so 
//  we need to use dispatch again to assigne the values to the Authcontext 
useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        dispatch({type: 'LOGIN', payload: user})
    }
}, [])


console.log('AuthContext state', state)

return(
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
)
}