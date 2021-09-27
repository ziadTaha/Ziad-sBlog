import React, { useEffect, useState } from'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, listFollowing, listUsers } from '../actions/userAction'
import './UsersList.css'
import defaultImg from '../images/profile.jpeg'

const UsersList = ({history}) => {
    const [keyWord, setKeyWord] = useState('')
    const {user : curUser} = useSelector(state => state.userState)
    const followingList = useSelector(state => state.followingList)
    const {
        loading : followingLoading,
        error: followingError,
        following
    } = followingList
    const usersList = useSelector(state => state.usersList)
    const {loading, users, page, pages, error} = usersList
    const dispatch = useDispatch()
    useEffect(async () => {
        await dispatch(listFollowing(curUser.id))
    }, [dispatch])
    useEffect(async() => {
        await dispatch(listUsers(keyWord))
    }, [dispatch, keyWord])

    const searchTrigger = async(event) => {
        setKeyWord(event.target.value)
    }
    const followHandle = async id => {
        await dispatch(followUser(id))
    }
    return (
        <div className='container-search'>
            <div className='search-bar-div'>
                <form className='users-search-form'>
                    <input className='search-bar' 
                    type='text'
                    placeholder='...Search'
                    value={keyWord}
                    onChange={searchTrigger}></input>
                </form>
            </div>
            {
                loading?<div className='lds-ring'><div></div><div></div><div></div><div></div></div>
                :<ul className='users-list'>
                {
                    users.map( user => <li className='grid-item' key={user.id}>
                        <img className="user-img" src={user.image?user.image:defaultImg}></img>
                        <div className='names'>
                        <div className='name'>{user.name}</div>
                        <div className='username'>{user.username}</div>
                        </div>
                        <button disabled={curUser.id === user.id} className='follow-button' onClick= {() => followHandle(user.id)}>{curUser.id === user.id?'me':following&&following.includes(user.id)?'unfollow': 'follow'}</button>
                    </li>)
                }
            </ul>
            }
            

        </div>
    )
}

export default UsersList