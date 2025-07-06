import {createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const  WorkoutContextProvider = ({children})=>{  // app is the children   
// for real time updates 
    const WorkoutReducer = (state, action)=>{
        switch(action.type){
             case 'SET_WORKOUT':
                return {
                    workouts: action.payload
                }
             case 'CREATE_WORKOUT':
                return {
                    workouts: [action.payload, ...state.workouts]
                }
             case 'DELETE_WORKOUT':
                return{
                    workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
                }
                case 'UPDATE_WORKOUT':
                return{
                    workouts: [action.payload, ...state.workouts]
                }
            default: 
                    return state
        }

    }
  // this is like dynamic state to get and upadte the values through different component 
     const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts:null
     });


    return(
        // value will be the values we need to share in the global context 
        <WorkoutContext.Provider value={{...state, dispatch}}> 
            {children}
        </WorkoutContext.Provider>
    )
}