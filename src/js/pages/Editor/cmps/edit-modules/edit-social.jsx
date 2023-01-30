import { useState } from 'react'
import { removeCmp, saveCmp } from '../../../../store/wap/wap.action'
import { FiTrash } from 'react-icons/fi'
import { BsLink45Deg } from 'react-icons/bs'
import { makeId } from '../../../../services/util.service'
import React from 'react'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

export function EditSocial({ clickedCmp }) {
    const linksArr = clickedCmp.cmps
    const [linksValues, setLinksValues] = useState(Array.from(new Array(linksArr?.length), (val, index) => ''))
    const [selected, setSelected] = useState('')

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
    }

    function addLink() {
        clickedCmp.cmps.push({
            id: makeId(),
            type: 'a',
            name: '',
            content: {
                href: '',
                iconImg: selected,
            },
            cmps: [],
        })
        saveCmp(clickedCmp)
    }

    function onSelectSection(selected) {
        setSelected(selected)
    }

    const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item className={classNames('SelectItem', className)} {...props} ref={forwardedRef}>
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        )
    })

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
                    <div className='selection-row'>
                        <Select.Root onValueChange={onSelectSection}>
                            <Select.Trigger className='SelectTrigger' aria-label='href'>
                                <Select.Value placeholder={'Select Social Link'} />
                                <Select.Icon className='SelectIcon'>
                                    <ChevronDownIcon />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content position='popper' className='SelectContent'>
                                    <Select.ScrollUpButton className='SelectScrollButton'>
                                        <ChevronUpIcon />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport className='SelectViewport'>
                                        <Select.Group>
                                            <SelectItem value={'fa-brands fa-facebook'}>Facebook</SelectItem>
                                            <SelectItem value={'fa-brands fa-square-github'}>Github</SelectItem>
                                            <SelectItem value={'fa-brands fa-linkedin'}>Linkedin</SelectItem>
                                            <SelectItem value={'fa-brands fa-square-instagram'}>Instagram</SelectItem>
                                            <SelectItem value={'fa-brands fa-square-twitter'}>Twitter</SelectItem>
                                            <SelectItem value={'fa-brands fa-square-pinterest'}>Pinterest</SelectItem>
                                            <SelectItem value={'fa-brands fa-square-reddit'}>Reddit</SelectItem>
                                        </Select.Group>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className='SelectScrollButton'>
                                        <ChevronDownIcon />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        <button onClick={addLink}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
