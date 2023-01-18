import { useSelector } from 'react-redux'
import { saveCmp, setClickedElem } from '../../../store/wap/wap.action'
import { ACmp } from './dynamic-cmps/a-cmp'
import { ButtonCmp } from './dynamic-cmps/button-cmp'
import { DivCmp } from './dynamic-cmps/div-cmp'
import { HCmp } from './dynamic-cmps/h-cmp'
import { ImgCmp } from './dynamic-cmps/img-cmp'
import { InputCmp } from './dynamic-cmps/input-cmp'
import { PCmp } from './dynamic-cmps/p-cmp'
import { SpanCmp } from './dynamic-cmps/span-cmp'

export default function DynamicCmp(props) {
    const lastClickedElem = useSelector(storeState => storeState.wapModule.clickedElem)
    function handleClick(e, cmp) {
        e.stopPropagation()
        e.preventDefault()
        if (!props.isEditing) return
        console.log('cmp', cmp)

        if (!cmp.class) {
            cmp.class = []
        }

        if (lastClickedElem) {
            lastClickedElem.class = lastClickedElem?.class.filter(c => c !== 'clicked')
        }

        setClickedElem(cmp)
        if (!cmp.class) {
            cmp.class = [cmp.name]
        }
        cmp.class.push('clicked')

        saveCmp(cmp)
    }
    const basicProps = { cmp: props.cmp, handleClick }
    switch (props.cmp.type) {
        // add input
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
