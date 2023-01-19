import { HCmp } from './h-cmp'
import { PCmp } from './p-cmp'
import { SpanCmp } from './span-cmp'

export default function TextCmp({ cmp, handleClick, onHover }) {
    const basicProps = { cmp: cmp, handleClick, onHover }
    switch (cmp.type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
        case 'txt':
        case 'span':
            return <HCmp {...basicProps} />
            return <PCmp {...basicProps} />
            return <SpanCmp {...basicProps} />
        default:
            console.log('PROBLEM WITH TXT-CMP')
    }
    return <div>TextCmp</div>
}
