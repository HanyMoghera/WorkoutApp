import { useState} from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {useAuthContext} from '../hooks/useAuthcontext'; 


const UpdateWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {dispatch} = useWorkoutContext();
  const {user} =useAuthContext();

  const { workout } = location.state;
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedWorkout = { title, load, reps };

    if(!user){return}
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`

      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      dispatch({type: 'UPDATE_WORKOUT',payload:json})
      setError(null);
      navigate('/');
    }
  };

  return (
    <div className="update-page">
      <form className="update-form" onSubmit={handleSubmit}>
        <h3>Update Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />

        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />

        <button type="submit">Update Workout</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default UpdateWorkout;
