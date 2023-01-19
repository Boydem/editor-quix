import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

export  function Faq() {
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    const expandedRef = useRef()
    return (
        <div className='inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>FAQ</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>

            <div className='expanded-content hidden' ref={expandedRef}>
                <h6>HELLO</h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, consectetur?</p>
            </div>
        </div>
    )
}
