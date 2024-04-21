const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  
  }
  
  
  
  const Header = ({name}) => {
    return (
    <div>
      <h3>{name}</h3>
    </div>)
    
    
  }
  
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  
  const Total = ({course}) => {
    return (
      <p>
        <strong>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
      </p>
    
    )
  }
  
  
  const Content = ({course}) => {
    const parts = course.parts.map(element => { return <Part key={element.id} part={element} /> } )
    return (
      <div>
        {parts}
      </div>
    )
  
  }
  
export default Course;
  