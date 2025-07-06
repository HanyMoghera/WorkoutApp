import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

// build the hook function 

export const useWorkoutContext = ()=>{
    const context = useContext(WorkoutContext) // it has the sate and the spatch function 

    if(!context){
        throw Error('useWorkoutContext must be used inside an useWorkoutContextprovider');
    }
    return context
}
