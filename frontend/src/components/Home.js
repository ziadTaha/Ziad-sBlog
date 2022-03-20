import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, listBlog } from '../actions/blogsAction'
import './Home.css'
import defaultImg from '../images/profile.jpeg'

const Home = () => {
    const blogList = useSelector(state => state.blogsList)
    const {blogs, page, pages, loading, error} = blogList
    const newBlog = useSelector(state => state.postBlog)
    const {
        blog
        , loading : blogLoading
        , error : blogError
    } = newBlog
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    const observer = useRef()
    const lastBlogElementRef = useCallback(
        (node) => {
            if(loading) return
            if(observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(async(entries) => {
                if(entries[0].isIntersecting &&page < pages) {
                    await dispatch(listBlog('', page+1))
                }
            })
            if(node) observer.current.observe(node)
        }
        , [loading])
    useEffect(async () => {
        await dispatch(listBlog())
    }, [dispatch, blog])
    const postNewBlog = async (event) =>{
        event.preventDefault()
        await dispatch(createBlog({
            content
        }))
        setContent('')
    }
    return (
        <div className='blogs-container' >
            <form className='blog-form' onSubmit = {postNewBlog}>
                <textarea className='blog-txt-area' value = {content}
                onChange={({target}) => setContent(target.value)}></textarea>
                <button className='post-button' type='submit'> post</button>
            </form>
            {blogLoading&&<div className='lds-ring'><div></div><div></div><div></div><div></div></div>}
            {blogError?<div>{blogError}</div>:<div>blogs</div>}
            <div  className="container">
                {blogs?
               <ul className='blogs-list'>
                    {
                        blogs.map( (blog, i) => {
                            const isLastElement = blogs.length === i+1
                            return(
                                <li key={blog.id} className='blog-item'
                                ref={isLastElement? lastBlogElementRef
                                :null}>
                                    <div className='user-info'>
                                        <img  className='blog-user-img' src={blog.user.image?blog.user.image:defaultImg}></img>
                                        <div >
                                        <div className='blog-user-name'>{blog.user.name}</div>
                                        <div className='blog-user-username'>{blog.user.username}</div>
                                        </div>
                                    </div>
                                    <div className='blog-content'>
                                        {
                                            blog.content
                                        }
                                    </div>
                                    <div className='blog-time'>{new Date(blog.createdAt).toLocaleString()}</div>
                                </li>
                            )   
                        })
                    }
                </ul>
                : <div>no blogs</div>}
                {loading&&<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
            </div>
        </div>
    )
}

export default Home