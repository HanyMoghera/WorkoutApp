import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {useAuthContext} from '../hooks/useAuthcontext'; 
import {Link} from 'react-router-dom';

// date fns 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'; 

const WorkoutDetails = ({workout})=>{

    const {dispatch} = useWorkoutContext();
    const {user} =useAuthContext();

    const handleClickDelete =async()=>{
      if(!user){
         return 
      }
        const response = await fetch('api/workouts/' + workout._id, {
            method: 'DELETE',
           headers:{'Authorization': `Bearer ${user.token}`}

        });

        const json = await response.json();
         if (response.ok){
            dispatch({type: 'DELETE_WORKOUT',payload:json})
         }
    }

   return (
  <div className="workout-details">
    <h4>{workout.title}</h4>
    <p><strong>Load (kg):</strong> {workout.load}</p>
    <p><strong>Reps:</strong> {workout.reps}</p>
        <p>
           {
    new Date(workout.updatedAt) > new Date(workout.createdAt)
      ? formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })
      : formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })
            }
        </p>

    <div className="action-buttons">
      <span
        className="delete"
        onClick={handleClickDelete}
        style={{ color: 'red', marginRight: '10px', cursor: 'pointer' }}
      >
        Delete
      </span>
            <Link
                  to="/UpdateWorkout"
                  state={{ workout }}
                  className="update"
                     >
                     <span style={{ color: 'green', cursor: 'pointer' }}>Update</span>
            </Link>
    </div>
  </div>
);


}

export default WorkoutDetails; 