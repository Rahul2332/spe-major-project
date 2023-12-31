import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  // return (
  //   <div className="workout-details">
  //     <h4>{workout.title}</h4>
  //     <p><strong>Completed: </strong>{workout.load}</p>
  //     <p><strong>Blog Description: </strong>{workout.reps}</p>
  //     <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
  //     <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
  //   </div>
  // )
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      {/* <p><strong>Completed: </strong>{workout.status ? 'Yes' : 'No'}{' '}
      <button onClick={handleClick} disabled={loading}>
        Toggle
      </button></p> */}

      <p><strong>Task Description: </strong>{workout.description}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
  
}

export default WorkoutDetails