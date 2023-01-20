import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditMap({ clickedCmp }) {
    const [latLng, setLatLng] = useState({
        lat: clickedCmp.content.lat,
        lng: clickedCmp.content.lng,
        zoom: clickedCmp.content.zoom,
    })
    const markers = clickedCmp.content?.markers.reduce((acc, marker) => {
        acc.push({ lat: marker.lat, lng: marker.lng, id: +marker.id })
        return acc
    }, [])
    console.log(markers)
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    const expandedRef = useRef()

    function handleMapChange(ev) {
        const value = ev.target.value
        const field = ev.target.name

        setLatLng(prev => ({ ...prev, [field]: value }))
        console.log('clickedCmp.content[field]', clickedCmp.content[field])
        clickedCmp.content[field] = parseFloat(value)
        saveCmp(clickedCmp)
    }
    function handleMarkerChange(ev) {
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

            <div className='expanded-content hidden edit-map' ref={expandedRef}>
                <h6>Map</h6>
                <label htmlFor=''>
                    Lat
                    <input type='text' name='lat' value={latLng.lat} onChange={handleMapChange} />
                </label>
                <label htmlFor=''>
                    Lng
                    <input type='text' name='lng' value={latLng.lng} onChange={handleMapChange} />
                </label>
                <label htmlFor=''>
                    Zoom
                    <input type='text' name='zoom' value={latLng.zoom} onChange={handleMapChange} />
                </label>

                <h6>Markers</h6>
                {markers.map(marker => {
                    return (
                        <div className='marker' key={marker.id}>
                            <label htmlFor=''>
                                Lat
                                <input type='text' name='zoom' value={marker.lat} onChange={handleMarkerChange} />
                            </label>
                            <label htmlFor=''>
                                Lng
                                <input type='text' name='zoom' value={marker.lng} onChange={handleMarkerChange} />
                            </label>
                            <button>X</button>
                        </div>
                    )
                })}
                <button className='btn'>Add Marker</button>
            </div>
        </div>
    )
}
