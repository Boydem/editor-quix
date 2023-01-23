import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

export function BorderRadiusSlider({ elClickedNode, handleBorderSliderChange, handleBorderSliderCommit }) {
    const [clickedCmpBorderRadius, setClickedCmpBorderRadius] = useState([0])

    useEffect(() => {
        setClickedCmpBorderRadius(
            (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('border-radius'))]) || [
                16,
            ]
        )
    }, [elClickedNode])

    function handleBorderRadiusChange(value) {
        setClickedCmpBorderRadius(value)
        handleBorderSliderChange(value)
    }

    return (
        <form className='slider-form adjust-inputs'>
            <label htmlFor=''>Border Radius</label>
            <div className='wrapper '>
                <Slider.Root
                    value={clickedCmpBorderRadius}
                    className='SliderRoot slider-input'
                    max={50}
                    step={1}
                    aria-label='Volume'
                    onValueChange={handleBorderRadiusChange}
                    onValueCommit={handleBorderSliderCommit}
                >
                    <Slider.Track className='SliderTrack'>
                        <Slider.Range className='SliderRange' />
                    </Slider.Track>
                    <Slider.Thumb className='SliderThumb' />
                </Slider.Root>
                <span>{clickedCmpBorderRadius}px</span>
            </div>
        </form>
    )
}
