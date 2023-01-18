import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { ChevronDownIcon } from '@radix-ui/react-icons'

const AccordionDemo = () => (
    <Accordion.Root className='AccordionRoot' type='single' defaultValue='item-1' collapsible>
        <Accordion.Item className='AccordionItem' value='item-1'>
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent></AccordionContent>
        </Accordion.Item>

        <Accordion.Item className='AccordionItem' value='item-2'>
            <AccordionTrigger>Position</AccordionTrigger>
            <AccordionContent>
                Yes. It's unstyled by default, giving you freedom over the look and feel.
            </AccordionContent>
        </Accordion.Item>

        <Accordion.Item className='AccordionItem' value='item-3'>
            <AccordionTrigger>Adjust</AccordionTrigger>
            <Accordion.Content className='AccordionContent'>
                <div className='AccordionContentText'>Yes! You can animate the Accordion with CSS or JavaScript.</div>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
)

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

export default AccordionDemo
