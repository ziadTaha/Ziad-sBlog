import React, { useState } from 'react'
import { loginUser } from '../actions/userAction'
import ErrorMessage from './ErrorMessage'
import UsersService from '../services/users'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SignUpForm = ({disabled=false, history}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const dispatch = useDispatch()
    
    const submit = async(event) => {
        event.preventDefault()
        if(password === confirmPassword){
            try{
                await UsersService.signUp({name,username,password})
                await dispatch(loginUser({username,password}))
                history.push('/problems')

            }
            catch(err){
                setMsg(err.response.data.error)
                setTimeout(() => {
                    setMsg(null)
                },5000)
            }
            
        }
        else {
            setMsg('passwords doesn\'t match')
            setTimeout(() => {
                setMsg(null)
            },5000)
        }
    }

    return (
        <div className="form-container">
            <form className="form-class" onSubmit={submit}>

                <div>
                    <label className="form-label">name </label>
                    <br></br>
                    <input id='nameSign'type="text"
                     value={name} onChange={({target}) => setName(target.value)}
                    className="form-input" disabled={disabled}></input>
                </div>
                <div>
                    <label className="form-label">user name </label>
                    <br></br>
                    <input id='usernameSign'type="text"
                     value={username} onChange={({target}) => setUsername(target.value)}
                    className="form-input" disabled={disabled}></input>
                </div>
                <div>
                    <label className="form-label">password </label>
                    <br></br>
                    <input id='passwordSign'type="password"
                     value={password} onChange={({target}) => setpassword(target.value)}
                    className="form-input" disabled={disabled}></input>
                </div>
                <div>
                    <label className="form-label">confirm password </label>
                    <br></br>
                    <input id='confirmPasswordSign'type="password"
                     value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value)}
                    className="form-input" disabled={disabled}></input>
                </div>
                <button type="submit" className="form-submit-button" disabled={disabled}> sign up</button>
                <ErrorMessage msg = {msg}></ErrorMessage>
            </form>
        </div>
    )
}

export default SignUpForm