import GoogleMapReact from 'google-map-react'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'

const AnyReactComponent = ({ text }) => <div className='map-marker'>📍</div>

export default function MapCmp({ cmp, handleClick, onHover }) {
    const defaultProps = {
        center: {
            lat: cmp.content.lat,
            lng: cmp.content.lng,
        },
        zoom: cmp.content.zoom,
    }

    return (
        <div
            style={{ height: '100%', width: '100%', ...cmp.style }}
            className={cmp.name}
            // style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB5mXoA76shI6CK3DmGjZi3M4PMn7YX4WA' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {cmp.content.markers.map(marker => {
                    return <AnyReactComponent lat={marker.lat} lng={marker.lng} key={marker.id}/>
                })}
            </GoogleMapReact>
        </div>
    )
}
