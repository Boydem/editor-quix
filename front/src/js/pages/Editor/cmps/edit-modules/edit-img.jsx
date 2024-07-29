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
        <div className='adjust inside-accordion adjust-inputs expanded-content edit-img full'>
            <div className='wrapper'>
                <div className='link'>
                    <input
                        type='url'
                        placeholder='Enter image link..'
                        value={imgUrl}
                        onChange={handleChange}
                        className='input-edit'
                    />
                    <button className='btn-edit' onClick={onImgUrlInput}>
                        Add
                    </button>
                </div>

                <img src={clickedCmp.content?.imgUrl} alt='' />
                <label htmlFor='file-input2'>Upload image</label>
                <input type='file' className='file-input btn-edit' id='file-input2' hidden onChange={onImgInput} />
            </div>
        </div>
    )
}
