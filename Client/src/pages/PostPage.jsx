import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPostApiBySlug, getPostsApi, getRecentPostsApi } from '~/apis'
import CommentSection from '~/components/CommentSection';
import PostCard from '~/components/PostCard';

function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        fetchPost()
    }, [postSlug])


    const fetchPost = async () => {
        const res = await getPostApiBySlug(postSlug)
        if (res.error) {
            setError(res.error)
            setLoading(false)
        } else {
            setPost(res.posts[0])
            console.log('post', res.posts[0])
            setLoading(false)
            setError(null)
        }
    }

    useEffect(() => {
        fetchRecentPosts()
    }, [])

    const fetchRecentPosts = async () => {
        const res = await getRecentPostsApi(3)
        if (res.error) {
            console.log(res.error)
        } else {
            setRecentPosts(res.posts)
            console.log('recentPosts', res.posts)
        }
    }

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    )
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post.title}</h1>
            <Link to={`/search?category=${post?.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{post?.category}</Button>
            </Link>
            <img src={post?.image} alt={post?.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            >
            </div>
            <CommentSection postId={post?._id} />
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
        </main>
    )
}

export default PostPage