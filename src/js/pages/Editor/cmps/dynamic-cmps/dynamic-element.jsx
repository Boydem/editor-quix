import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'

export function DynamicElement({ cmp, onSelectCmp, onHoverCmp }) {
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    const CustomTag = `${cmp.type}`

    let eventClick
    const cmpCopy = structuredClone(cmp)

    function onSelectCmpMiddleware(ev, cmp) {
        eventClick = ev
        if (cmp.type !== 'input') {
            document.addEventListener('mousedown', saveText)
        }
        onSelectCmp(ev, cmp)
    }

    async function saveText() {
        document.removeEventListener('mousedown', saveText)
        if (cmp.content.txt === eventClick.target.innerText) return
        cmpCopy.content.txt = eventClick.target.innerText
        await saveCmp(cmpCopy)
        cmp.content.txt = eventClick.target.innerText
    }

    if (cmp.type === 'input' && !cmp.htmlId) return
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
            href={CustomTag === 'a' ? cmp?.content?.href : null}
            htmlFor={CustomTag === 'label' ? cmp.htmlFor : null}
            id={CustomTag === 'input' ? cmp.htmlId : null}
            type={CustomTag === 'input' ? cmp.inputType : null}
        >
            {cmpCopy.content?.txt}
        </CustomTag>
    )
}
