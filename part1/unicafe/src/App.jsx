import { useState } from 'react'


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )

}


const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (<p>No feedback given</p>)
  } else {
    const avg = (good - bad) / total
    const positive = (good / total) * 100
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={avg} />
          <StatisticLine text='positive' value={positive + ' %'} />
        </tbody>
      </table>
    )
  }

}


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />

      <h1>statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App