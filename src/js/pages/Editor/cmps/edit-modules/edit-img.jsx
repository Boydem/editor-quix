import { useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'

export function EditImg() {
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Image</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
        </div>
    )
}
