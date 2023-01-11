const Course = ({id, name, parts}) => {
    let total = parts.reduce( (sum, part) => sum + part.exercises, 0);
    
    return (
    <li key={id}>
      <h1>{name}</h1>
      <ul>
        {parts.map(part =>  
            <li key={part.id}>{part.name} {part.exercises}</li>
        )}
      </ul>
      <b>Total of {total} exercises</b>
    </li>
    )
  }

export default Course;