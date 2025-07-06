import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {useAuthContext} from '../hooks/useAuthcontext'; 

//components  IT should start with Uppercase 
import WorkoutDetails from '../components/workoutDetails';
import WorkoutForm from "../components/workoutForm";

const Home = ()=>{
    const {workouts, dispatch} = useWorkoutContext();
    const [loading, setLoading]= useState(true); 
    const[error, SetError]=useState('');
    const {user} =useAuthContext();

// we will use it to fesh the data from the db to show it in the UI
useEffect(()=>{
    const fetchWorkout = async()=>{
        const response =  await fetch('/api/workouts', {
            headers: {
                'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();
        if(response.ok){
            setLoading(false)
            SetError('')
            dispatch({type: 'SET_WORKOUT', payload: json})
        }
        else{
            SetError(response.error);
        }

    }
    if(user){
      fetchWorkout()
    }
},[dispatch, user])


return (
    <div className="home">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="workouts">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
          ) : (
            <p>No workouts yet, please add a new workout.</p>
          )}
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <WorkoutForm />
    </div>
  );
};

export default Home
