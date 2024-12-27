import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '~/firebase/firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateFailure, updateStart, updateSuccess } from '~/redux/user/userSlice'
import { deleteUserApi, signOutApi, updateUserApi } from '~/apis'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

function DashProfile() {
    const { currentUser, error, loading } = useSelector(state => state.user)
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState(null)
    const [profilePictureProgress, setProfilePictureProgress] = useState(0)
    const [profilePictureError, setProfilePictureError] = useState(null)
    const [updatePasswordError, setUpdatePasswordError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [currentFileName, setCurrentFileName] = useState(null);
    const [formData, setFormData] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const filePickerRef = useRef()
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                setProfilePictureError('Only image files are allowed.')
                return
            }
            // Check if the selected file is the same as the current file
            if (file.name === currentFileName) {
                return
            }
            setProfilePicture(file)
            setProfilePictureUrl(URL.createObjectURL(file))
            setCurrentFileName(file.name)
        }
    }

    useEffect(() => {
        if (profilePicture) {
            uploadProfilePicture()
        }
    }, [profilePicture])

    const uploadProfilePicture = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + '-' + profilePicture.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, profilePicture)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProfilePictureProgress(progress.toFixed(0))
                setProfilePictureError(null)
            },
            (error) => {
                setProfilePictureError('Could not upload the image (File must be less than 2MB)')
                setProfilePictureProgress(0)
                setProfilePicture(null)
                setProfilePictureUrl(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('ádf')
                    setProfilePictureUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL })
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Checking form data is not empty
        if (Object.keys(formData).length === 0) {
            return
        }
        // Checking if profile picture is uploaded
        try {
            dispatch(updateStart())
            const res = await updateUserApi(currentUser._id, formData)
            if (res) {
                dispatch(updateSuccess(res))
                setUpdatePasswordError(null)
            }
        } catch (error) {
            dispatch(updateFailure(error.response.data.message))
            setUpdatePasswordError(error.response.data.message)
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false)
        try {
            dispatch(deleteUserStart())
            const res = await deleteUserApi(currentUser._id)
            console.log('res', res)
            if (res) {
                dispatch(deleteUserSuccess())
                navigate('/signin')
            }
            else {
                dispatch(deleteUserFailure('Could not delete the account'))
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.response.data.message))
        }
    }

    const handleSignOut = async () => {
        console.log('asdasdas')
        try {
            const res = await signOutApi()
            if (res) {
                dispatch(signOut())
                navigate('/signin')
            }

        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>
                Profile
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type='file' accept='image/*' id='profilePicture' className='hidden' onChange={handleImageChange} ref={filePickerRef} />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                    {profilePictureProgress > 0 && profilePictureProgress < 100 && (
                        <CircularProgressbar value={profilePictureProgress} text={`${profilePictureProgress}%`} strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${profilePictureProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img src={profilePictureUrl || currentUser.profilePicture} alt=''
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
                        ${profilePictureProgress && profilePictureProgress < 100 && 'opacity-65'} `}
                    />
                </div>
                {profilePictureError && <Alert color='red' className='text-center'>{profilePictureError}</Alert>}
                <TextInput type='email' id='email' placeholder='Email' value={currentUser.email} disabled onChange={handleChange} />
                <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
                {updatePasswordError && <Alert color='red' className='text-center'>{updatePasswordError}</Alert>}
                <Button gradientDuoTone='purpleToPink' className='w-full' type='submit' disabled={loading || profilePictureProgress}>
                    {loading ? 'Loading...' : 'Update'}
                </Button>
                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button type='button' gradientDuoTone='purpleToBlue' className='w-full'>
                            Create a posts
                        </Button>
                    </Link>
                )}
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'> Delete Account </span>
                <span onClick={handleSignOut} className='cursor-pointer'> Sign Out </span>
            </div>
            {error && <Alert color='red' className='mt-5'>{error}</Alert>}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account? There are no undo.
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser} >
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashProfile