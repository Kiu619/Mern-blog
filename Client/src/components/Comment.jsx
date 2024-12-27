import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import { editCommentApi, getUserApiById } from '~/apis';

function Comment(props) {
    const { comment, onLike, onEdit, onDelete } = props;
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        fetchUser(comment.userId);
    }, []);

    const fetchUser = async (id) => {
        const res = await getUserApiById(id);
        if (res.error) {
            console.log(res.error);
        }
        setUser(res);
    }

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        const res = await editCommentApi(comment._id, {
            content: editedContent,
        });
        if (res.error) {
            console.log(res.error);
        } else {
            onEdit(comment, editedContent);
            console.log('comment', comment);
            console.log('editedContent', editedContent);
            setIsEditing(false);
        }
    };
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm max-w-2xl '>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200'
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className='flex-1 '>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className='text-gray-500 text-xs'>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                outline
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='text-gray-500 pb-2 break-all'>{comment.content}</div>

                        {/* <p className='text-gray-500 pb-2 '>{comment.content}</p> */}
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${currentUser &&
                                    comment.likes.includes(currentUser._id) &&
                                    '!text-blue-500'
                                    }`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes +
                                    ' ' +
                                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                            {currentUser &&
                                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={handleEdit}
                                            className='text-gray-400 hover:text-blue-500'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => onDelete(comment._id)}
                                            className='text-gray-400 hover:text-red-500'
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment