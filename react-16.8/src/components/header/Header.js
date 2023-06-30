import React from 'react'
import './../../styles/header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className='logo'>
                <div className='abc'>
                    <img className='abc-logo' src='/abclogo.svg' alt='abclogo' />
                </div>
                <div className='hrc'>
                    <img className='hrc-logo' src='/hrclogo.svg' alt='abclogo' />
                </div>
            </div>
            
            <div className='text-content'>
                Invoice List
            </div>
        </div>
    )
}
