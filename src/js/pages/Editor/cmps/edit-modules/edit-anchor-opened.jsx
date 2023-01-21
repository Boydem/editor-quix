import { useState } from 'react'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditAnchorOpened({ clickedCmp }) {
    const [hRef, setHRef] = useState(clickedCmp.content?.href)

    function handleChange({ target }) {
        const { value } = target
        setHRef(value)
    }

    function onSubmitHRef() {
        clickedCmp.content.href = hRef
        saveCmp(clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-anchor'>
                <div className='wrapper'>
                    <p className='heading'>Enter link</p>
                    <input placeholder='e.g facebook.com/Webix' onChange={handleChange} value={hRef} />
                    <button className='btn' onClick={onSubmitHRef}>
                        Submit
                    </button>
                    <iframe src='https://www.instagram.com/?embedded=true' width='300px' height='300px'></iframe>
                </div>
            </div>
        </div>
    )
}
