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

    const basicProps = {
        cmp: props.cmp,
        onSelectCmp: props.onSelectCmp,
        onHoverCmp: props.onHoverCmp,
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
