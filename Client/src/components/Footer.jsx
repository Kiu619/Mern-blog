import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs'

function FooterComponent() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md: grid-cols-1'>
                    <div className=''>
                        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1'>Kiu's</span>
                            Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Trello Clone
                                </Footer.Link>
                                <Footer.Link href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Trello Clone
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/Kiu619'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link href='https://www.facebook.com/kingkiu1304/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider className='my-4' />
                <div className='w-full sm:flex sm: items-center sm:justify-between'>
                    <Footer.Copyright 
                        href='#'
                        by="Kiu's Blog. All rights reserved."
                        year={new Date().getFullYear()}
                    />
                    <div className='flex gap-6 mt-4'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsGithub}/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent