import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveWap } from '../../../../store/wap/wap.action'

export function EditChat({ clickedCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [txt, setTxt] = useState(wap.chatStartingMsg)

    function handleChange({ target }) {
        const { value } = target
        setTxt(value)
    }

    function onSetStartingMsg() {
        wap.chatStartingMsg = txt
        saveWap(wap)
    }

    return (
        <div className='adjust inside-accordion adjust-inputs expanded-content edit-chat full'>
            <div className='wrapper'>
                <div className='link'>
                    <p>Set chat starting message</p>
                    <textarea
                        type='text'
                        placeholder='Enter your first message'
                        value={txt}
                        onChange={handleChange}
                        className='input-edit'
                        rows={4}
                    />
                    <button className='btn-edit' onClick={onSetStartingMsg}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
