import { useSelector } from 'react-redux'
import { setClickedCmp, setElClickedNode } from '../../../store/wap/wap.action'
import { ACmp } from './dynamic-cmps/a-cmp'
import { ButtonCmp } from './dynamic-cmps/button-cmp'
import { DivCmp } from './dynamic-cmps/div-cmp'
import { HCmp } from './dynamic-cmps/h-cmp'
import { ImgCmp } from './dynamic-cmps/img-cmp'
import { InputCmp } from './dynamic-cmps/input-cmp'
import { PCmp } from './dynamic-cmps/p-cmp'
import { SpanCmp } from './dynamic-cmps/span-cmp'

export default function DynamicCmp(props) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)

    function handleClick(ev, cmp) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!isEditing) return

        if (elClickedNode) {
            elClickedNode.classList.remove('clicked')
        }
        ev.target.classList.add('clicked')

        setElClickedNode(ev.target)
        setClickedCmp(cmp)
        // saveCmp(cmp)
    }

    function onHover(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!isEditing) return

        ev.currentTarget.classList.add('hover')
    }
    const basicProps = { cmp: props.cmp, handleClick, onHover }
    switch (props.cmp.type) {
        case 'div':
            return <DivCmp {...basicProps} />
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return <HCmp {...basicProps} hType={props.cmp.type} />
        case 'img':
            return <ImgCmp {...basicProps} />
        case 'p':
            return <PCmp {...basicProps} />
        case 'span':
            return <SpanCmp {...basicProps} />
        case 'a':
            return <ACmp {...basicProps} />
        case 'button':
            return <ButtonCmp {...basicProps} />
        case 'input':
            return <InputCmp {...basicProps} />
        default:
            console.log('Went into default switch case in dynamic cmp with type of', props.cmp.type)
            break
    }
    return <div>{props.cmp.type}</div>
}
