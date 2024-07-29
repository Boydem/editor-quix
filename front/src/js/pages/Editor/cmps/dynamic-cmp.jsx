import { useSelector } from 'react-redux'
import { ChatCmp } from './dynamic-cmps/chat-cmp'
import { DivCmp } from './dynamic-cmps/div-cmp'
import { DynamicElement } from './dynamic-cmps/dynamic-element'
import { FormCmp } from './dynamic-cmps/form-cmp'
import { ImgCmp } from './dynamic-cmps/img-cmp'
import { MapCmp } from './dynamic-cmps/map-cmp'
import { ScheduleCmp } from './dynamic-cmps/schedule-cmp'
import { SocialCmp } from './dynamic-cmps/social-cmp'
import { SubscribeCmp } from './dynamic-cmps/subscribe-cmp'
import { VideoCmp } from './dynamic-cmps/video-cmp'

export default function DynamicCmp(props) {
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)

    function onSelectCmpMiddleware(e, cmp) {
        if (!isEditing) return

        props.onSelectCmp(e, cmp)
    }
    const basicProps = {
        cmp: props.cmp,
        onSelectCmp: onSelectCmpMiddleware,
        onHoverCmp: props.onHoverCmp,
    }
    switch (props.cmp.type) {
        case 'form':
            return <FormCmp {...basicProps} />
        case 'subscribe':
            return <SubscribeCmp {...basicProps} />
        case 'chat':
            return <ChatCmp {...basicProps} />
        case 'schedule':
            return <ScheduleCmp {...basicProps} />
        case 'social':
            return <SocialCmp {...basicProps} />
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
