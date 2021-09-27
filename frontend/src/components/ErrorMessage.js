import React from 'react'
import './Form.css'

const ErrorMessage = ({msg}) =>{
    if(!msg)
        return null
    return (
        <div style={{color:'#2f4f4f'}}>{msg}</div>
    )
    
}

export default ErrorMessage