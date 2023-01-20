import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditImgOpened({ clickedCmp }) {
    async function onImgInput(event) {
        const image = await uploadService.uploadImg(event)
        console.log('image', image)
        clickedCmp.content.imgUrl = image.url
        saveCmp(clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-img'>
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
