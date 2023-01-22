import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'

export default function DynamicElement({ cmp, onSelectCmp, onHoverCmp }) {
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    const CustomTag = `${cmp.type}`

    let eventClick

    function onSelectCmpMiddleware(ev, cmp) {
        eventClick = ev
        if (cmp.type !== 'input') {
            document.addEventListener('mousedown', saveText)
        }
        onSelectCmp(ev, cmp)
    }

    function saveText() {
        document.removeEventListener('mousedown', saveText)
        cmp.content.txt = eventClick.target.innerText
        saveCmp(cmp)
    }
    if (cmp.type === 'input') return
    return (
        <CustomTag
            className={classes}
            style={cmp.style}
            onClick={e => onSelectCmpMiddleware(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.target.classList.remove('hover')}
            contentEditable={isEditing}
            spellCheck='false'
            suppressContentEditableWarning={true}
            href={CustomTag === 'a' ? cmp.content.href : null}
        >
            {cmp.content?.txt}
        </CustomTag>
    )
}
