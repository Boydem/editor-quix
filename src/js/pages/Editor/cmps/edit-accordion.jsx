import { EditAdjusts } from './edit-modules/edit-adjusts'
import { EditColors } from './edit-modules/edit-colors'
import { EditImg } from './edit-modules/edit-img'
import { EditSizes } from './edit-modules/edit-sizes'
import { EditText } from './edit-modules/edit-text'
import { EditFaq } from './faq'

export function Accordion({ context }) {
    return (
        <div className='our-accordion'>
            <EditSizes />
            <EditAdjusts />
            <EditColors />
            <EditText />
            {context === 'img' && <EditImg />}
        </div>
    )
}
