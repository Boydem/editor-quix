import { click } from '@testing-library/user-event/dist/click'
import { useSelector } from 'react-redux'
import { EditAdjusts } from './edit-modules/edit-adjusts'
import { EditColors } from './edit-modules/edit-colors'
import { EditForm } from './edit-modules/edit-form'
import { EditImg } from './edit-modules/edit-img'
import { EditMap } from './edit-modules/edit-map'
import { EditSizes } from './edit-modules/edit-sizes'
import { EditText } from './edit-modules/edit-text'
import { EditVideo } from './edit-modules/edit-video'
import { EditFaq } from './faq'

export function Accordion({ context }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    return (
        <div className='our-accordion'>
            <EditText />
            <EditSizes />
            <EditAdjusts />
            <EditColors />

            {context === 'img' && <EditImg clickedCmp={clickedCmp} />}
            {context === 'form' && <EditForm clickedCmp={clickedCmp} />}
            {context === 'map' && <EditMap clickedCmp={clickedCmp} />}
            {context === 'video' && <EditVideo clickedCmp={clickedCmp} />}
        </div>
    )
}
