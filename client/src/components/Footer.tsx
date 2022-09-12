import React from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi'

import { FOOTER_LINKS } from '../assets'

const Footer = () => {
  return (
    <footer className='w-full flex flex-col items-center px-12 py-4'>
        <div className='w-full flex flex-wrap'>
            {FOOTER_LINKS.map((item, index) => (
                <div key={index} className='w-200 mb-6'>
                    <p className='font-medium text-xl text-slate-600 mb-8'>{item.title}</p>
                    {item.links.map((link, index) => (
                        <Link key={index} to={`/${link.link}`}>
                            <p className='text-sm my-2 text-primary hover:text-slate-600 ease-in-out duration-500'>
                                {link.title}
                            </p>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
        <div className='w-full h-[1px] my-8 bg-slate-600' />
        <div className='w-full flex flex-col md:flex-row items-center justify-between text-slate-600 text-sm'>
            <p className=''>
                All Rights Reserved. &copy; {new Date().getFullYear()}
            </p>

            <div className='flex items-center gap-4'>
                <a href='https://twitter.com/pablo_clueless' target='_blank' rel='noreferrer'>
                    <FiTwitter />
                </a>
                <a href='https://github.com/pablo-clueless' target='_blank' rel='noreferrer'>
                    <FiGithub />
                </a>
                <a href='https://instagram.com/pablo_clueless' target='_blank' rel='noreferrer'>
                    <FiInstagram />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer