import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);


   
  const nextAnecdote = (selected) => {
    let newSelected = selected;

    while(newSelected === selected){
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }

    setSelected(newSelected);
  }

  const vote = () => {
    let votesCopy = [...votes];
    votesCopy[selected] += 1;

    if(votesCopy[selected] > votesCopy[mostVotes]){
      setMostVotes(selected);
    }

    setVotes(votesCopy);
  }

  return (
    <div>
      <b>Anecdote Of the Day</b><br />
      {anecdotes[selected]}<br />
      has {votes[selected]} votes.<br />
      <Button handleClick={nextAnecdote} text={"Next Anecdote"}/>
      <Button handleClick={vote} text={"Vote"}/>
      <br /><br />
      <b>Anecdote with Most Votes</b><br />
      {anecdotes[mostVotes]}<br />
      has {votes[mostVotes]} votes.<br />
    </div>
  )
}

export default App