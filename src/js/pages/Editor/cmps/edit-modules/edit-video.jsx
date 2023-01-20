import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditVideo({ clickedCmp }) {
    const expandedRef = useRef()
    const [videoUrl, setVideoUrl] = useState(clickedCmp.content?.url)

    function handleChange({ target }) {
        const { value } = target
        setVideoUrl(value)
    }

    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    function validateUrl() {
        // ^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$
        const regex = new RegExp('^(https?://)?(www.youtube.com|youtu.be)/.+$')
        return regex.test(videoUrl)
    }

    async function onSubmitVideoUrl(ev) {
        ev.preventDefault()
        // const isUrlValid = validateUrl()
        // console.log(isUrlValid)
        const embedUrl = videoUrl.replace('watch?v=', 'embed/')
        clickedCmp.content.url = embedUrl
        try {
            await saveCmp(clickedCmp)
            showSuccessMsg('Video uploaded successfully')
        } catch (err) {
            console.log('Failed to upload video', err)
            showErrorMsg('Cannot upload video, try again later')
        }
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Video</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
            <div className='expanded-content hidden edit-form' ref={expandedRef}>
                <div className='wrapper'>
                    <form onSubmit={onSubmitVideoUrl}>
                        <label>
                            Upload your youtube video
                            <input type='url' name='video' value={videoUrl} onChange={handleChange} />
                        </label>
                        <button>Upload</button>
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
