import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { locationService } from '../../../../services/location.service'
import { makeId } from '../../../../services/util.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditMap({ clickedCmp }) {
    const [geoLocationValue, setGeoLocationValue] = useState('')

    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    const expandedRef = useRef()

    function handleChange({ target }) {
        setGeoLocationValue(target.value)
    }
    // const [latLng, setLatLng] = useState({
    //     lat: clickedCmp.content?.lat,
    //     lng: clickedCmp.content?.lng,
    //     zoom: clickedCmp.content?.zoom,
    // })
    // const markers = clickedCmp.content?.markers?.reduce((acc, marker) => {
    //     acc.push({ lat: marker.lat, lng: marker.lng, id: +marker.id })
    //     return acc
    // }, [])
    // console.log(markers)

    // function handleMapChange(ev) {
    //     const value = ev.target.value
    //     const field = ev.target.name

    //     setLatLng(prev => ({ ...prev, [field]: value }))
    //     console.log('clickedCmp.content[field]', clickedCmp.content[field])
    //     clickedCmp.content[field] = parseFloat(value)
    //     saveCmp(clickedCmp)
    // }
    // function handleMarkerChange(ev) {
    //     const value = ev.target.value
    //     const field = ev.target.name

    //     setLatLng(prev => ({ ...prev, [field]: value }))
    //     console.log('clickedCmp.content[field]', clickedCmp.content[field])
    //     clickedCmp.content[field] = parseFloat(value)
    //     saveCmp(clickedCmp)
    // }

    async function onPanTo() {
        const location = await locationService.getLatLng(geoLocationValue)
        clickedCmp.content.lat = location.lat
        clickedCmp.content.lng = location.lng
        saveCmp(clickedCmp)
    }
    async function onAddMarker() {
        const location = await locationService.getLatLng(geoLocationValue)
        clickedCmp.content.markers.push({ id: makeId(), lat: location.lat, lng: location.lng, name: geoLocationValue })
        console.log(clickedCmp.content.markers)
        saveCmp(clickedCmp)
    }

    function onDeleteMarker(marker) {
        clickedCmp.content.markers.splice(
            clickedCmp.content.markers.findIndex(m => m.id === marker.id),
            1
        )
        saveCmp(clickedCmp)
    }

    if (clickedCmp.type !== 'map') return
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
                    Search your desired location
                    <input type='text' value={geoLocationValue} onChange={handleChange} />
                </label>
                <div className='btns'>
                    <button onClick={onPanTo}>Pan To</button>
                    <button onClick={onAddMarker}>Add Marker</button>
                </div>
                {/* <label htmlFor=''>
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
 */}
                <h6>Markers</h6>
                {clickedCmp.content.markers.map(marker => {
                    return (
                        <div className='marker' key={marker.id}>
                            {/* <label htmlFor=''>
                                Lat
                                <input type='text' name='zoom' value={marker.lat} onChange={handleMarkerChange} />
                            </label>
                            <label htmlFor=''>
                                Lng
                                <input type='text' name='zoom' value={marker.lng} onChange={handleMarkerChange} />
                            </label> */}
                            <p>{marker.name}</p>
                            <button onClick={() => onDeleteMarker(marker)}>X</button>
                        </div>
                    )
                })}
                <button className='btn'>Add Marker</button>
            </div>
        </div>
    )
}
