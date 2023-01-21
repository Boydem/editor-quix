import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import SelectSectionRef from '../ui-cmps/select-section-ref'

export function EditAnchorOpened({ clickedCmp }) {
    const [hRef, setHRef] = useState(clickedCmp.content?.href)
    const wap = useSelector(storeState => storeState.wapModule.wap)

    function handleChange({ target }) {
        const { value } = target
        setHRef(value)
    }

    function onSubmitHRef() {
        clickedCmp.content.href = hRef
        saveCmp(clickedCmp)
    }

    function onSelectSection(sectionId) {
        clickedCmp.content.href = sectionId
        saveCmp(clickedCmp)
        console.log('clickedCmp:', clickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-anchor'>
                <div className='wrapper'>
                    <p className='heading'>Enter link</p>
                    <input placeholder='e.g facebook.com/Webix' onChange={handleChange} value={hRef} />
                    <button className='btn' onClick={onSubmitHRef}>
                        Submit
                    </button>
                    {/* <iframe src={`${clickedCmp.content?.href}?embedded=true`} width='237px' height='300px'></iframe> */}
                </div>
                <div className='select-wrapper'>
                    <p>Pick section you would like this link to navigate to</p>
                    <SelectSectionRef onSelectSection={onSelectSection} wap={wap} clickedCmp={clickedCmp} />
                </div>
            </div>
        </div>
    )
}
