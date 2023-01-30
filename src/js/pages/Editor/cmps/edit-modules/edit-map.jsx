import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { locationService } from '../../../../services/location.service'
import { makeId } from '../../../../services/util.service'
import { saveCmp } from '../../../../store/wap/wap.action'
import { FiTrash } from 'react-icons/fi'
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
        <div className='inside-accordion adjust-inputs expanded-content edit-map full'>
            <label htmlFor=''>
                Search your desired location
                <input
                    type='text'
                    value={geoLocationValue}
                    onChange={handleChange}
                    className='input-edit'
                    placeholder='Tel Aviv'
                />
            </label>
            <div className='btns'>
                <button onClick={onPanTo} className='btn-edit'>
                    Pan To
                </button>
                <button onClick={onAddMarker} className='btn-edit'>
                    Add Marker
                </button>
            </div>
            <label htmlFor=''>
                Zoom
                <input
                    type='text'
                    name='zoom'
                    value={zoom}
                    className='btn-edit input-edit'
                    onChange={handleMapChange}
                    placeholder='10'
                />
            </label>

            <div className='markers'>
                <h6>Markers</h6>
                {clickedCmp.content.markers.map(marker => {
                    return (
                        <div className='marker' key={marker.id}>
                            <button className='btn btn-edit' onClick={() => onDeleteMarker(marker)}>
                                <FiTrash />
                            </button>
                            <p>{marker.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
