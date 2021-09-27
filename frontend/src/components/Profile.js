import React, { useState } from 'react'
import img from '../images/profile.jpeg'
import './Form.css'
import './Profile.css'
import ErrorMessage from './ErrorMessage'
import { convertToBase64 } from '../utils/base64Convertor'
import { changeUser } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const {user, loading} = useSelector(state => state.userState)
    const [disabled, setDisabled] = useState(true)
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [password, setpassword] = useState(user.password)
    const[confirmPassword, setConfirmPassword] = useState(user.password)
    const[image, setImage] = useState(user.image)
    const [msg, setMsg] = useState(null)
    const dispatch = useDispatch()

    const edit = (event) => {
        event.preventDefault()
        if(disabled){
            setDisabled(false)
        }
        else{
            setDisabled(true)
            setName(user.name)
            setUsername(user.username)
            setpassword(user.password)
            setConfirmPassword(user.password)
        }
    }
    const submit = async (event) => {
        event.preventDefault()
        try{
        if(password === confirmPassword){
           await dispatch(changeUser({
                name, username, password,image
            }))

        }
        }
        catch(e){
            setMsg(e.response.data.error)
        }
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage(base64)
    }
    return (
        <div className="container">
            <img className="img-profile" 
            src={image?image:img}></img>
            {!disabled&&
            <input type="file" label="Image" 
            accept ='.jpeg, .png, .jpg'
            onChange = {handleFileUpload}></input>}
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
                <button type="submit" className="form-submit-button" disabled={disabled}> confirm</button>
                <button type='button' className='form-submit-button' onClick={edit}> {(disabled)?'edit':'cancel'}</button>
                <ErrorMessage msg = {msg}></ErrorMessage>
            </form>
        </div>
            
        </div>
    )
}
export default Profile