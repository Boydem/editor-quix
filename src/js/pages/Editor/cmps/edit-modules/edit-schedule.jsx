import { useState } from 'react'
import { useSelector } from 'react-redux'
import { saveCmp, saveWap } from '../../../../store/wap/wap.action'
import SelectSectionRef from '../ui-cmps/select-section-ref'
import * as Slider from '@radix-ui/react-slider'

export function EditSchedule({ clickedCmp }) {
    const [hRef, setHRef] = useState(clickedCmp.content?.href)
    const wap = useSelector(storeState => storeState.wapModule.wap)
    // const eventDuration =
    const [eventDuration, setEventDuration] = useState(wap.schedule?.eventDuration || 30)

    function handleEventDurationCommit(ev) {
        console.log(ev)
        setEventDuration(ev[0])
        wap.schedule.eventDuration = ev[0]
        saveWap(wap)
    }

    function handleEventDurationChange(ev) {
        setEventDuration(ev[0])
    }
    console.log('eventDuration:', eventDuration)

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content edit-schedule expanded-content adjust inside-accordion full adjust-inputs full'>
                <div className='wrapper'>
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
                </div>
            </div>
        </div>
    )
}
