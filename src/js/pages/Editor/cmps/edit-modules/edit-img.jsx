import { useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditImg({ clickedCmp }) {
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    async function onImgInput(event) {
        const image = await uploadService.uploadImg(event)
        clickedCmp.content.imgUrl = image.url
        saveCmp(clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Image</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
            <div className='expanded-content hidden edit-img' ref={expandedRef}>
                <div className='wrapper'>
                    <label>
                        Upload
                        <input type='file' hidden onChange={onImgInput} />
                    </label>
                    <img src={clickedCmp.content?.imgUrl} alt='' />
                </div>
            </div>
        </div>
    )
}
