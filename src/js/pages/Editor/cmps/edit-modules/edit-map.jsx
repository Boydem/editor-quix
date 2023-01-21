import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { locationService } from '../../../../services/location.service'
import { makeId } from '../../../../services/util.service'
import { saveCmp } from '../../../../store/wap/wap.action'
import { FaTrash } from 'react-icons/fa'
import { showErrorMsg } from '../../../../services/event-bus.service'

export function EditMap({ clickedCmp }) {
    const [geoLocationValue, setGeoLocationValue] = useState('')

    function handleChange({ target }) {
        setGeoLocationValue(target.value)
    }
    const [zoom, setZoom] = useState(clickedCmp.content?.zoom)

    function handleMapChange(ev) {
        const value = ev.target.value
        const field = ev.target.name

        setZoom(+value)
        clickedCmp.content[field] = parseFloat(value)
        saveCmp(clickedCmp)
    }
    async function onPanTo() {
        try {
            const location = await locationService.getLatLng(geoLocationValue)
            clickedCmp.content.lat = location.lat
            clickedCmp.content.lng = location.lng
            saveCmp(clickedCmp)
        } catch (err) {
            console.log(err)
            showErrorMsg('Please try again later.')
        }
    }
    async function onAddMarker() {
        try {
            const location = await locationService.getLatLng(geoLocationValue)
            clickedCmp.content.markers.push({
                id: makeId(),
                lat: location.lat,
                lng: location.lng,
                name: geoLocationValue,
            })

            saveCmp(clickedCmp)
        } catch (err) {
            showErrorMsg('Please try again later.')
        }
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
            <div className='expanded-content edit-map'>
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
                </label> */}
                <label htmlFor=''>
                    Zoom
                    <input type='text' name='zoom' value={zoom} onChange={handleMapChange} />
                </label>

                <h6>Markers</h6>
                <div className='markers'>
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
                                <button className='btn' onClick={() => onDeleteMarker(marker)}>
                                    <FaTrash />
                                </button>
                                <p>{marker.name}</p>
                            </div>
                        )
                    })}
                </div>
                {/* <button className='btn'>Add Marker</button> */}
            </div>
        </div>
    )
}
