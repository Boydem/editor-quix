import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCmp, saveWap } from '../../../../store/wap/wap.action'
import * as Slider from '@radix-ui/react-slider'
import { MultiSelect } from 'react-multi-select-component'
import { utilService } from '../../../../services/util.service'
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

export function EditSchedule({ clickedCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [selected, setSelected] = useState(() => {
        return wap.schedule.days.reduce((acc, day) => {
            acc.push({ label: utilService.capitalize(day), value: day })
            return acc
        }, [])
    })

    function handleMultiSelectChange(newSelected) {
        // newSelected.forEach(day => {
        //     if (!wap.schedule.days.includes(day.value)) {
        //         wap.schedule.days.push(day.value)
        //     }
        // })
        const newScheduleDays = newSelected.reduce((acc, day) => {
            acc.push(day.value)
            return acc
        }, [])
        wap.schedule.days = newScheduleDays
        setSelected(newSelected)
        saveWap(wap)
    }

    // const eventDuration =
    const [eventDuration, setEventDuration] = useState(wap.schedule?.eventDuration || 30)
    const [daysForward, setDaysForward] = useState(wap.schedule?.daysForward || 6)

    const options = [
        { label: 'Sunday', value: 'sunday' },
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
    ]

    function handleEventDurationCommit(ev) {
        setEventDuration(ev[0])
        wap.schedule.eventDuration = ev[0]
        saveWap(wap)
    }

    function handleEventDurationChange(ev) {
        setEventDuration(ev[0])
    }

    function handleDaysForwardChange(ev) {
        setDaysForward(ev[0])
    }
    function handleDaysForwardCommit(ev) {
        setDaysForward(ev[0])
        wap.schedule.daysForward = ev[0]
        saveWap(wap)
    }

    function onSelectHour(hour, num) {
        if (num === 0) {
            wap.schedule.startHour = hour
        } else {
            wap.schedule.endHour = hour
        }
        saveWap(wap)
    }

    const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item className={classNames('SelectItem', className)} {...props} ref={forwardedRef}>
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className='SelectItemIndicator'>{/* <CheckIcon /> */}</Select.ItemIndicator>
            </Select.Item>
        )
    })

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-schedule expanded-content adjust inside-accordion full adjust-inputs full'>
                <div className='big-wrapper'>
                    <form className='slider-form'>
                        <label htmlFor=''>Event Duration</label>
                        <div className='wrapper'>
                            <Slider.Root
                                value={[eventDuration]}
                                className='SliderRoot slider-input'
                                defaultValue={[30]}
                                max={180}
                                min={10}
                                step={5}
                                aria-label='Volume'
                                onValueChange={handleEventDurationChange}
                                onValueCommit={handleEventDurationCommit}
                            >
                                <Slider.Track className='SliderTrack' value={50}>
                                    <Slider.Range className='SliderRange' />
                                </Slider.Track>
                                <Slider.Thumb className='SliderThumb' />
                            </Slider.Root>
                            <span>{eventDuration || '30'}Min</span>
                        </div>
                    </form>
                    <form className='slider-form'>
                        <label htmlFor=''>Days Forward</label>
                        <div className='wrapper'>
                            <Slider.Root
                                value={[daysForward]}
                                className='SliderRoot slider-input'
                                defaultValue={[6]}
                                max={28}
                                min={1}
                                step={1}
                                aria-label='Volume'
                                onValueChange={handleDaysForwardChange}
                                onValueCommit={handleDaysForwardCommit}
                            >
                                <Slider.Track className='SliderTrack' value={50}>
                                    <Slider.Range className='SliderRange' />
                                </Slider.Track>
                                <Slider.Thumb className='SliderThumb' />
                            </Slider.Root>
                            <span>{daysForward || '6'}Days</span>
                        </div>
                    </form>

                    <div className='selection'>
                        <div className='mini-wrapper'>
                            <p>Starting Hours:</p>
                            <Select.Root onValueChange={ev => onSelectHour(ev, 0)}>
                                <Select.Trigger className='SelectTrigger' aria-label='href'>
                                    <Select.Value placeholder={'Starting Hours'} />
                                    {/* <Select.Icon className='SelectIcon'> */}
                                    {/* <ChevronDownIcon /> */}
                                    {/* </Select.Icon> */}
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content position='popper' className='SelectContent'>
                                        <Select.ScrollUpButton className='SelectScrollButton'>
                                            <ChevronUpIcon />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className='SelectViewport'>
                                            <Select.Group>
                                                <SelectItem value={0}>00:00</SelectItem>
                                                <SelectItem value={1}>01:00</SelectItem>
                                                <SelectItem value={2}>02:00</SelectItem>
                                                <SelectItem value={3}>03:00</SelectItem>
                                                <SelectItem value={4}>04:00</SelectItem>
                                                <SelectItem value={5}>05:00</SelectItem>
                                                <SelectItem value={6}>06:00</SelectItem>
                                                <SelectItem value={7}>07:00</SelectItem>
                                                <SelectItem value={8}>08:00</SelectItem>
                                                <SelectItem value={9}>09:00</SelectItem>
                                                <SelectItem value={10}>10:00</SelectItem>
                                                <SelectItem value={11}>11:00</SelectItem>
                                                <SelectItem value={12}>12:00</SelectItem>
                                                <SelectItem value={13}>13:00</SelectItem>
                                                <SelectItem value={14}>14:00</SelectItem>
                                                <SelectItem value={15}>15:00</SelectItem>
                                                <SelectItem value={16}>16:00</SelectItem>
                                                <SelectItem value={17}>17:00</SelectItem>
                                                <SelectItem value={18}>18:00</SelectItem>
                                                <SelectItem value={19}>19:00</SelectItem>
                                                <SelectItem value={20}>20:00</SelectItem>
                                                <SelectItem value={21}>21:00</SelectItem>
                                                <SelectItem value={22}>22:00</SelectItem>
                                                <SelectItem value={23}>23:00</SelectItem>
                                            </Select.Group>
                                        </Select.Viewport>
                                        <Select.ScrollDownButton className='SelectScrollButton'>
                                            <ChevronDownIcon />
                                        </Select.ScrollDownButton>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>
                        <div className='mini-wrapper'>
                            <p>Ending Hours:</p>
                            <Select.Root onValueChange={ev => onSelectHour(ev, 1)}>
                                <Select.Trigger className='SelectTrigger' aria-label='href'>
                                    <Select.Value placeholder={'Ending Hours'} />
                                    {/* <Select.Icon className='SelectIcon'>
                                    <ChevronDownIcon />
                                </Select.Icon> */}
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content position='popper' className='SelectContent'>
                                        <Select.ScrollUpButton className='SelectScrollButton'>
                                            <ChevronUpIcon />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className='SelectViewport'>
                                            <Select.Group>
                                                <SelectItem value={0}>00:00</SelectItem>
                                                <SelectItem value={1}>01:00</SelectItem>
                                                <SelectItem value={2}>02:00</SelectItem>
                                                <SelectItem value={3}>03:00</SelectItem>
                                                <SelectItem value={4}>04:00</SelectItem>
                                                <SelectItem value={5}>05:00</SelectItem>
                                                <SelectItem value={6}>06:00</SelectItem>
                                                <SelectItem value={7}>07:00</SelectItem>
                                                <SelectItem value={8}>08:00</SelectItem>
                                                <SelectItem value={9}>09:00</SelectItem>
                                                <SelectItem value={10}>10:00</SelectItem>
                                                <SelectItem value={11}>11:00</SelectItem>
                                                <SelectItem value={12}>12:00</SelectItem>
                                                <SelectItem value={13}>13:00</SelectItem>
                                                <SelectItem value={14}>14:00</SelectItem>
                                                <SelectItem value={15}>15:00</SelectItem>
                                                <SelectItem value={16}>16:00</SelectItem>
                                                <SelectItem value={17}>17:00</SelectItem>
                                                <SelectItem value={18}>18:00</SelectItem>
                                                <SelectItem value={19}>19:00</SelectItem>
                                                <SelectItem value={20}>20:00</SelectItem>
                                                <SelectItem value={21}>21:00</SelectItem>
                                                <SelectItem value={22}>22:00</SelectItem>
                                                <SelectItem value={23}>23:00</SelectItem>
                                            </Select.Group>
                                        </Select.Viewport>
                                        <Select.ScrollDownButton className='SelectScrollButton'>
                                            <ChevronDownIcon />
                                        </Select.ScrollDownButton>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>
                        <div className='multi-select-wrapper'>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={handleMultiSelectChange}
                                labelledBy='Select'
                                hasSelectAll={false}
                                disableSearch={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
