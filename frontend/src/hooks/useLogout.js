import {useAuthContext} from './useAuthcontext';
import {useWorkoutsContext} from './useWorkoutContext';

 export const useLogout = ()=>{

    const {dispatch} = useAuthContext();
    const {dispatch : workoutsDispatch} = useWorkoutsContext();

    const logout =()=>{
                     // Delete the token from the wen 
                    localStorage.removeItem('user')
                    //update the authcontext 
                    dispatch({type:'LOGOUT'})
                     // clean the workout from the fronend 
                     workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    } 
    return {logout}
 } 