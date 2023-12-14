import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import todoImg from "../images/todoimage2.svg"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div style={{ display: 'flex', }}>
      <img src={todoImg} alt="" style={{ width: '50%' }} />
      <form className="signup" onSubmit={handleSubmit} style={{width:'100%'}}>
        <h3>Sign Up</h3>

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} onClick={handleSubmit}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup