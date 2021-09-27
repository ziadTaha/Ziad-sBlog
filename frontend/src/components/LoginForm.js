import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../actions/userAction'
import ErrorMessage from './ErrorMessage'
import './Form.css'

const LoginForm = ({handleSubmit}) => {
    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const [msg, setMsg] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    const submit = async (event) => {
        event.preventDefault()
        try{
            await dispatch(loginUser({username, password}))
            history.push('/problems')
            setUsername('')
            setpassword('')
        }
        catch(err){ 
            console.log(err)
            setMsg(err.response.data.error)
            setTimeout(() => {
                setMsg(null)
            },5000)
        }
        
        
       
    }
    return (
        <div className="form-container">
            <form onSubmit= {submit} className="form-class">
                <div>
                <label className="form-label">user name </label>
                <br></br>
                <input id='usernameLogin'type="text"
                 value={username} onChange={({target}) => setUsername(target.value)}
                 className="form-input"></input>
                </div>
                <div>
                <label className="form-label">password </label>
                <br></br>
                <input id='passwordLogin'type="password"
                 value={password} onChange ={({target}) => setpassword(target.value)}
                 className="form-input"></input>
                </div>
                <button type="submit" className="form-submit-button"> login</button>
                <ErrorMessage msg ={msg}></ErrorMessage>
            </form>
        </div>
    )
}
export default LoginForm