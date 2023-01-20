import { useSelector } from 'react-redux'
import { EditVideo } from './edit-modules/edit-video'
import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { EditTextOpened } from './edit-modules/edit-text-opened'
import { EditAdjustsOpened } from './edit-modules/edit-adjusts-opened'
import { EditColorsOpened } from './edit-modules/edit-colors-opened'
import { EditSizesOpened } from './edit-modules/edit-sizes-opened'
import { EditDivOpened } from './edit-modules/edit-div-opened'
import { EditImgOpened } from './edit-modules/edit-img-opened'
import { EditFormOpened } from './edit-modules/edit-form-opened'
import { EditMapOpened } from './edit-modules/edit-map-opened'
import { AiOutlineLayout } from 'react-icons/ai'
import { IoMdBrush } from 'react-icons/io'
import { BsLightning } from 'react-icons/bs'

export function EditTabs({ context }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    return (
        <Tabs.Root className='TabsRoot' defaultValue='tab1'>
            <Tabs.List className='TabsList' aria-label='Manage your account'>
                <Tabs.Trigger className='TabsTrigger' value='tab1'>
                    <AiOutlineLayout size={'1.4rem'} />
                </Tabs.Trigger>
                <Tabs.Trigger className='TabsTrigger' value='tab2'>
                    <IoMdBrush size={'1.4rem'} />
                </Tabs.Trigger>
                <Tabs.Trigger className='TabsTrigger' value='tab3'>
                    <BsLightning size={'1.4rem'} />
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className='TabsContent tabs-inner-content' value='tab1'>
                <EditSizesOpened />
                <EditAdjustsOpened />
            </Tabs.Content>
            <Tabs.Content className='TabsContent tabs-inner-content' value='tab2'>
                <EditTextOpened />
                <EditColorsOpened />
            </Tabs.Content>
            <Tabs.Content className='TabsContent tabs-inner-content' value='tab3'>
                {context === 'div' && <EditDivOpened clickedCmp={clickedCmp} elClickedNode={elClickedNode} />}
                {context === 'img' && <EditImgOpened clickedCmp={clickedCmp} />}
                {context === 'form' && <EditFormOpened clickedCmp={clickedCmp} />}
                {context === 'map' && <EditMapOpened clickedCmp={clickedCmp} />}
                {context === 'video' && <EditVideo clickedCmp={clickedCmp} />}
            </Tabs.Content>
        </Tabs.Root>
    )
}
