import { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditDiv({ clickedCmp, elClickedNode }) {
    const [imgUrl, setImgUrl] = useState('')
    const [currImage, setCurrImage] = useState(
        window.getComputedStyle(elClickedNode).getPropertyValue('background').split(`"`)[1]
    )
    useEffect(() => {
        setCurrImage(window.getComputedStyle(elClickedNode).getPropertyValue('background').split(`"`)[1])
    }, [elClickedNode, clickedCmp])

    async function onImgUrlInput() {
        clickedCmp.style = {
            ...clickedCmp.style,
            background: `url(${imgUrl}) no-repeat center center/cover`,
        }
        setCurrImage(imgUrl)
        saveCmp(clickedCmp)
    }

    function handleChange({ target }) {
        const { value } = target
        setImgUrl(value)
    }

    const expandedRef = useRef()

    async function onImgInput(event) {
        try {
            const image = await uploadService.uploadImg(event)
            clickedCmp.style = {
                ...clickedCmp.style,
                background: `url(${image.url}) no-repeat center center/cover`,
            }
            setCurrImage(image.url)
            saveCmp(clickedCmp)
            showSuccessMsg('Image uploaded successfully!')
        } catch (err) {
            showErrorMsg('There was a problem uploading your image. Please try again later.')
            console.log(err)
        }
    }

    return (
        <div className='adjust inside-accordion full adjust-inputs full'>
            <div className='expanded-content edit-div' ref={expandedRef}>
                <div className='wrapper'>
                    <div className='link'>
                        <input
                            type='text'
                            placeholder='Enter image link...'
                            className='input-edit'
                            onChange={handleChange}
                            value={imgUrl}
                        />
                        <button className='btn-edit' onClick={onImgUrlInput}>
                            Add
                        </button>
                    </div>
                    <div className='img-container'>{currImage && <img src={currImage} alt='' />}</div>

                    <label htmlFor='file-input'>Upload background</label>
                    <input type='file' id='file-input' className='file-input btn-edit' hidden onChange={onImgInput} />
                </div>
            </div>
        </div>
    )
}
