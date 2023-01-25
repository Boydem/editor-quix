import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCmp, saveWap } from '../../../../store/wap/wap.action'
import SelectSectionRef from '../ui-cmps/select-section-ref'
import * as Slider from '@radix-ui/react-slider'
import { MultiSelect } from 'react-multi-select-component'
import { utilService } from '../../../../services/util.service'

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
            console.log('acc:', acc)
            acc.push(day.value)
            return acc
        }, [])
        console.log('newScheduleDays:', newScheduleDays)
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

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-schedule expanded-content adjust inside-accordion full adjust-inputs full'>
                <div className='big-wrapper'>
                    <form className='slider-form adjust-inputs'>
                        <label htmlFor=''>Event Duration</label>
                        <div className='wrapper'>
                            <Slider.Root
                                value={[eventDuration]}
                                className='SliderRoot slider-input'
                                defaultValue={[30]}
                                max={60}
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
                    <form className='slider-form adjust-inputs'>
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
    )
}
