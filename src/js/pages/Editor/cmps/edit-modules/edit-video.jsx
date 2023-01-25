import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditVideo({ clickedCmp }) {
    const [videoUrl, setVideoUrl] = useState(clickedCmp.content?.url)

    function handleChange({ target }) {
        const { value } = target
        setVideoUrl(value)
    }

    function validateUrl() {
        const regex = new RegExp('^(https?://)?(www.youtube.com|youtu.be)/.+$')
        return regex.test(videoUrl)
    }

    async function onSubmitVideoUrl(ev) {
        ev.preventDefault()
        const embedUrl = videoUrl.replace('watch?v=', 'embed/')
        clickedCmp.content.url = embedUrl
        try {
            await saveCmp(clickedCmp)
            showSuccessMsg('Video uploaded successfully')
        } catch (err) {
            console.log('Failed to upload video', err)
            showErrorMsg('Cannot upload video. Please try again later.')
        }
    }

    return (
        <div className='adjust inside-accordion adjust-inputs expanded-content edit-img full edit-video'>
            <div className='expanded-content edit-form'>
                <div className='wrapper'>
                    <form onSubmit={onSubmitVideoUrl}>
                        <div className='link'>
                            <input
                                type='url'
                                name='video'
                                className='btn-edit input-edit'
                                value={videoUrl}
                                onChange={handleChange}
                            />
                            <button className='btn-edit'>Browse</button>
                        </div>
                    </form>

                    <iframe
                        src={clickedCmp.content?.url}
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        style={{ width: '100%', height: '100%' }}
                        // className='video-disabled'
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
