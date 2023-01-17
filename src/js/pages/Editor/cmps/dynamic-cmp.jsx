import { ACmp } from './dynamic-cmps/a-cmp'
import { ButtonCmp } from './dynamic-cmps/button-cmp'
import { DivCmp } from './dynamic-cmps/div-cmp'
import { H1Cmp } from './dynamic-cmps/h1.cmp'
import { H2Cmp } from './dynamic-cmps/h2-cmp'
import { H3Cmp } from './dynamic-cmps/h3-cmp'
import { H4Cmp } from './dynamic-cmps/h4-cmp'
import { H5Cmp } from './dynamic-cmps/h5-cmp'
import { H6Cmp } from './dynamic-cmps/h6-cmp'
import { ImgCmp } from './dynamic-cmps/img-cmp'
import { PCmp } from './dynamic-cmps/p-cmp'

import './style.scss'

export default function DynamicCmp({ cmp }) {
    switch (cmp.type) {
        case 'div':
            return <DivCmp cmp={cmp} />
        case 'h1':
            return <H1Cmp cmp={cmp} />
        case 'h2':
            return <H2Cmp cmp={cmp} />
        case 'h3':
            return <H3Cmp cmp={cmp} />
        case 'h4':
            return <H4Cmp cmp={cmp} />
        case 'h5':
            return <H5Cmp cmp={cmp} />
        case 'h6':
            return <H6Cmp cmp={cmp} />
        case 'img':
            return <ImgCmp cmp={cmp} />
        case 'p':
            return <PCmp cmp={cmp} />
        case 'a':
            return <ACmp cmp={cmp} />
        case 'button':
            return <ButtonCmp cmp={cmp} />
        default:
            console.log('Went into default switch case in dynamic cmp with type of', cmp.type)
            break
    }
    return <div>DynamicCmp</div>
}
