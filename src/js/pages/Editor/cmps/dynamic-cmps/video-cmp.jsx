import { useSelector } from 'react-redux'
import DynamicCmp from '../dynamic-cmp'

export function VideoCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }

    return (
        <div
            className={`${classes}`}
            style={cmp.style}
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            <iframe
                src={cmp.content.url}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
                className={`${isEditing ? 'video-disabled' : ''}`}
            ></iframe>
        </div>
    )
}
