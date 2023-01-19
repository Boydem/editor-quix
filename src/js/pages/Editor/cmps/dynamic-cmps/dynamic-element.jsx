import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'

export default function DynamicElement({ cmp, handleClick, onHover }) {
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    const CustomTag = `${cmp.type}`

    function handleClickMiddleware(ev, cmp) {
        document.addEventListener('mousedown', () => saveText(ev))
        handleClick(ev, cmp)
    }

    function saveText(ev) {
        document.removeEventListener('mousedown', saveText)
        cmp.content.txt = ev.target.innerText
        saveCmp(cmp)
    }

    return (
        <CustomTag
            className={classes}
            style={cmp.style}
            onClick={e => handleClickMiddleware(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            contentEditable={isEditing}
            spellCheck='false'
            suppressContentEditableWarning={true}
        >
            {cmp.content?.txt}
        </CustomTag>
    )
}
