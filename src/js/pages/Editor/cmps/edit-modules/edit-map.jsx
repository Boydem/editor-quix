import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditMap({ clickedCmp }) {
    const [latLng, setLatLng] = useState({
        lat: clickedCmp.content.lat,
        lng: clickedCmp.content.lng,
        zoom: clickedCmp.content.zoom,
    })
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    const expandedRef = useRef()

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name

        setLatLng(prev => ({ ...prev, [field]: value }))
        console.log('clickedCmp.content[field]', clickedCmp.content[field])
        clickedCmp.content[field] = parseFloat(value)
        saveCmp(clickedCmp)
    }

    console.log('clickedCmp:', clickedCmp)
    return (
        <div className='inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Map</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>

            <div className='expanded-content hidden' ref={expandedRef}>
                <h6>Map</h6>
                <label htmlFor=''>
                    Lat
                    <input type='text' name='lat' value={latLng.lat} onChange={handleChange} />
                </label>
                <label htmlFor=''>
                    Lng
                    <input type='text' name='lng' value={latLng.lng} onChange={handleChange} />
                </label>
                <label htmlFor=''>
                    Zoom
                    <input type='text' name='zoom' value={latLng.zoom} onChange={handleChange} />
                </label>
            </div>
        </div>
    )
}
