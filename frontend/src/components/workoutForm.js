import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {useAuthContext} from '../hooks/useAuthcontext'; 

const  WorkoutForm = ()=>{
    const {dispatch} = useWorkoutContext()
    const {user} =useAuthContext();


    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyField]= useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!user){
            return setError('You must be logged in')
        }
        const workout = {title, load, reps};

        const response = await fetch('/api/workouts', {
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
            setEmptyField(json.emptyFields)
        }else{
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyField([])
            console.log('New workout has been added', json);
            dispatch({type:'CREATE_WORKOUT', payload: json});
        }

    }


    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excersize Title</label>
            <input 
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title} 
            className={emptyFields.includes('title') ? 'error': ' '}
            >
            </input>

         <label>Load (in kg):</label>
            <input 
            type="number"
            onChange={(e)=>setLoad(e.target.value)}
            value={load} 
             className={emptyFields.includes('load') ? 'error': ' '}

            >
            </input>

             <label>Reps:</label>
            <input 
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps} 
            className={emptyFields.includes('reps') ? 'error': ' '}

            >
            </input>

            <button> Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default WorkoutForm; 