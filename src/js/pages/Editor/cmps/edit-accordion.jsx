import { EditAdjusts } from './edit-modules/edit-adjusts'
import { EditColors } from './edit-modules/edit-colors'
import { EditForm } from './edit-modules/edit-form'
import { EditImg } from './edit-modules/edit-img'
import { EditSizes } from './edit-modules/edit-sizes'
import { EditText } from './edit-modules/edit-text'
import { EditFaq } from './faq'

export function Accordion({ context }) {
    return (
        <div className='our-accordion'>
            <EditText />
            <EditSizes />
            <EditAdjusts />
            <EditColors />

            {context === 'img' && <EditImg />}
            {context === 'form' && <EditForm />}
        </div>
    )
}
