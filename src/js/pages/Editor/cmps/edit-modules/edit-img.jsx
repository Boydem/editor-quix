import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditImg({ clickedCmp }) {
    const [imgUrl, setImgUrl] = useState()

    async function onImgInput(event) {
        try {
            const image = await uploadService.uploadImg(event)
            clickedCmp.content.imgUrl = image.url
            saveCmp(clickedCmp)
            showSuccessMsg('Image uploaded successfully')
        } catch (err) {
            console.log(err)
            showErrorMsg('There was a problem uploading your image. Please try again later.')
        }
    }

    function handleChange({ target }) {
        const { value } = target
        setImgUrl(value)
    }

    async function onImgUrlInput() {
        clickedCmp.content.imgUrl = imgUrl
        saveCmp(clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-img'>
                <div className='wrapper'>
                    <input type='url' placeholder='Enter image link..' value={imgUrl} onChange={handleChange} />

                    <label>
                        Browse
                        <input type='file' hidden onChange={onImgInput} />
                    </label>
                </div>
                <img src={clickedCmp.content?.imgUrl} alt='' />
                <button onClick={onImgUrlInput}>Upload</button>
            </div>
        </div>
    )
}
