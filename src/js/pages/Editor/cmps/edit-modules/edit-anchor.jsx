import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import SelectSectionRef from '../ui-cmps/select-section-ref'

export function EditAnchor({ clickedCmp }) {
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
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-anchor expanded-content adjust inside-accordion full adjust-inputs full'>
                <div className='wrapper'>
                    <div className='mini-wrapper'>
                        <input
                            placeholder='e.g facebook.com/Webix'
                            className='input-edit'
                            onChange={handleChange}
                            value={hRef}
                        />
                        <button onClick={onSubmitHRef} className='btn-edit'>
                            Link
                        </button>
                    </div>
                </div>
                <p className='or'>or</p>
                <div className='select-wrapper mini-wrapper'>
                    <p>Navigate to</p>
                    <SelectSectionRef onSelectSection={onSelectSection} wap={wap} clickedCmp={clickedCmp} />
                </div>
            </div>
        </div>
    )
}
