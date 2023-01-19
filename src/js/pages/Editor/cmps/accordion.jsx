import React, { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../store/wap/wap.action'
import SelectUnit from './ui-cmps/select'

const AccordionEdit = () => {
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)

    const sizeOptions = [
        { name: 'width', title: 'width', unit: 'px', value: 0 },
        { name: 'height', title: 'height', unit: 'px', value: 0 },
        { name: 'minWidth', title: 'min-W', unit: 'px', value: 0 },
        { name: 'minHeight', title: 'min-h', unit: 'px', value: 0 },
        { name: 'maxWidth', title: 'max-w', unit: 'px', value: 0 },
        { name: 'maxHeight', title: 'max-h', unit: 'px', value: 0 },
    ]
    const [propToEdit, setPropToEdit] = useState(sizeOptions)

    // useEffect(()=>{

    // },[])

    console.log('propToEdit:', propToEdit)
    function handleChange(ev, idx) {
        ev.preventDefault()
        // if (!lastClickedCmp) return
        const { name, value } = ev.target
        const newPropsToEdit = [...propToEdit]
        newPropsToEdit[idx] = { ...newPropsToEdit[idx], value: value }
        setPropToEdit(newPropsToEdit)
        const unit = ev.target.getAttribute('info')
        if (lastClickedCmp.style) {
            lastClickedCmp.style = { ...lastClickedCmp.style, [name]: `${value + unit}` }
        } else {
            lastClickedCmp.style = { [name]: `${value + unit}` }
        }
        saveCmp(lastClickedCmp)
    }

    const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className='AccordionHeader'>
            <Accordion.Trigger className={classNames('AccordionTrigger', className)} {...props} ref={forwardedRef}>
                {children}
                <ChevronDownIcon className='AccordionChevron' aria-hidden />
            </Accordion.Trigger>
        </Accordion.Header>
    ))

    const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content className={classNames('AccordionContent', className)} {...props} ref={forwardedRef}>
            <div className='AccordionContentText'>{children}</div>
        </Accordion.Content>
    ))

    return (
        <Accordion.Root className='AccordionRoot' type='single' defaultValue='item-1' collapsible>
            <Accordion.Item className='AccordionItem' value='item-1'>
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent>
                    <div className='option-body'>
                        {propToEdit.map((option, idx) => (
                            <div key={idx} className='param-box'>
                                <label htmlFor={option.name}>{option.title}</label>
                                <div className='input-wrapper'>
                                    <input
                                        info={option.unit}
                                        type='number'
                                        name={option.name}
                                        id={option.name}
                                        value={option.value}
                                        onChange={ev => handleChange(ev, idx)}
                                    />
                                    <div className='unit'>
                                        <SelectUnit />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className='AccordionItem' value='item-2'>
                <AccordionTrigger>Position</AccordionTrigger>
                <AccordionContent>
                    <SelectUnit />
                </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className='AccordionItem' value='item-3'>
                <AccordionTrigger>Adjust</AccordionTrigger>
                <Accordion.Content className='AccordionContent'>
                    <div className='AccordionContentText'>
                        Yes! You can animate the Accordion with CSS or JavaScript.
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}

export default AccordionEdit