import { useSelector } from 'react-redux'
import { setClickedCmp, setElClickedNode } from '../../../store/wap/wap.action'
import { ChatCmp } from './dynamic-cmps/chat-cmp'
import { DivCmp } from './dynamic-cmps/div-cmp'
import DynamicElement from './dynamic-cmps/dynamic-element'
import { FormCmp } from './dynamic-cmps/form-cmp'
import { ImgCmp } from './dynamic-cmps/img-cmp'
import MapCmp from './dynamic-cmps/map-cmp'
import { VideoCmp } from './dynamic-cmps/video-cmp'

export default function DynamicCmp(props) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    // const selectedActionsRef = props.selectedActionsRef

    function handleClick(ev, cmp) {
        ev.stopPropagation()
        if (!ev.target.type) ev.preventDefault()

        if (!isEditing) return
        if (elClickedNode === ev.target) return

        if (elClickedNode) {
            elClickedNode.classList.remove('clicked')
        }
        ev.target.classList.add('clicked')

        setElClickedNode(ev.target)
        setClickedCmp(cmp)
    }

    function onHover(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!isEditing) return

        props.selectedActionsRef.current.style.top = `${ev.target.offsetTop - 45}px`
        props.selectedActionsRef.current.style.left = `${ev.target.offsetLeft - 16}px`
        props.selectedActionsRef.current.style.display = 'flex'

        ev.currentTarget.classList.add('hover')
        props.setElHoveredNode(ev.currentTarget)
    }
    const basicProps = {
        cmp: props.cmp,
        handleClick,
        onHover,
        selectedActionsRef: props.selectedActionsRef,
        setElHoveredNode: props.setElHoveredNode,
    }
    switch (props.cmp.type) {
        case 'form':
            return <FormCmp {...basicProps} />
        case 'chat':
            return <ChatCmp {...basicProps} />
        case 'div':
            return <DivCmp {...basicProps} />
        case 'map':
            return <MapCmp {...basicProps} />
        case 'video':
            return <VideoCmp {...basicProps} />
        case 'img':
            return <ImgCmp {...basicProps} />
        default:
            return <DynamicElement {...basicProps} />
    }
}
