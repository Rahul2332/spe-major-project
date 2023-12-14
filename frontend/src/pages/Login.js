import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import todoImg from "../images/todoimage2.svg"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div style={{display:'flex',}}>
      <img src={todoImg} alt="" style={{width:'50%'}}/>
      <form className="login" onSubmit={handleSubmit} style={{width:'100%'}}>
        <h3>Log In</h3>

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

        <button disabled={isLoading} onClick={handleSubmit}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login