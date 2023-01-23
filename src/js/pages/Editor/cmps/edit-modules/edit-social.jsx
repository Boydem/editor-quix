import { useState } from 'react'
import { removeCmp, saveCmp, setClickedCmp } from '../../../../store/wap/wap.action'
import { FiTrash } from 'react-icons/fi'
import { BsLink45Deg } from 'react-icons/bs'
import { makeId } from '../../../../services/util.service'

export function EditSocial({ clickedCmp }) {
    const linksArr = clickedCmp.cmps
    const [linksValues, setLinksValues] = useState(Array.from(new Array(linksArr?.length), (val, index) => ''))

    function handleChange(ev, idx) {
        const value = ev.target.value
        linksValues[idx] = value
        setLinksValues([...linksValues])
    }

    function onSaveLink(idx) {
        clickedCmp.cmps[idx].content.href = linksValues[idx]
        saveCmp(clickedCmp)
    }

    function onDeleteLink(idx) {
        // const tempClickedCmp = clickedCmp
        removeCmp(clickedCmp.cmps[idx])
        // console.log(clickedCmp)
    }

    function addLink() {
        clickedCmp.cmps.push({
            id: makeId(),
            type: 'a',
            name: '',
            content: {
                href: '',
                iconImg: 'fa-brands fa-square-whatsapp',
            },
            cmps: [],
        })
        saveCmp(clickedCmp)
    }

    if (clickedCmp.type !== 'social') return

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content adjust inside-accordion full adjust-inputs full edit-social'>
                <div className='wrapper'>
                    {linksArr.map((link, idx) => {
                        return (
                            <div key={idx} className='input-option'>
                                <div className='first-line'>
                                    <i className={`${link?.content?.iconImg} fa-2x`}></i>
                                    <button className='delete' onClick={() => onDeleteLink(idx)}>
                                        <FiTrash />
                                    </button>
                                </div>
                                <div className='second-line'>
                                    <input
                                        onChange={ev => handleChange(ev, idx)}
                                        className='btn-edit input-edit'
                                        name={link.id}
                                        placeholder='Enter your link...'
                                        value={linksValues[idx]}
                                    />
                                    <button className='add' onClick={() => onSaveLink(idx)}>
                                        <BsLink45Deg />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={addLink}>Add</button>
                </div>
            </div>
        </div>
    )
}
