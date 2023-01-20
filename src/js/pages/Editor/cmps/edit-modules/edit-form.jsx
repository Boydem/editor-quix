import { useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditForm() {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    async function onImgInput(event) {
        const image = await uploadService.uploadImg(event)
        console.log('image', image)
        clickedCmp.content.imgUrl = image.url
        saveCmp(clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Form</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
            <div className='expanded-content hidden edit-form' ref={expandedRef}>
                <div className='wrapper'>
                    <p>HEYYYY</p>
                </div>
            </div>
        </div>
    )
}
