import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1> 

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Votes = ({votes}) => <p>has {votes} votes</p>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
  const maxVoted = Math.max(...voted)
  const mostVoted = voted.indexOf(maxVoted)

  const nextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteClick = () => {
    const copy = [...voted]
    copy[selected] += 1
    setVoted(copy)
  }


  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <Votes votes={voted[selected]} />
      <Button text="vote" onClick={voteClick} />
      <Button text="next anecdote" onClick={nextClick} />
      <br />
      <br />
      <Header text="Anecdote with most votes" />
      {anecdotes[mostVoted]}
      <Votes votes={maxVoted} />
    </div>
  )
}


export default App