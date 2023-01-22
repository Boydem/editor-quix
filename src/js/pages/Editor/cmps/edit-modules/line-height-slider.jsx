import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

export function LineHeightSlider({ elClickedNode, handleLineHeightSliderChange, handleLineHeightSliderCommit }) {
    const [clickedCmpLineHeight, setClickedCmpLineHeight] = useState([16])

    useEffect(() => {
        setClickedCmpLineHeight(
            elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('line-height'))]
        )
    }, [elClickedNode])

    function handleLineHeightChange(value) {
        setClickedCmpLineHeight(value)
        handleLineHeightSliderChange(value)
    }

    return (
        <form className='slider-form'>
            <div className='wrapper'>
                <label htmlFor=''>Line Height</label>
                <span>{clickedCmpLineHeight}</span>
            </div>
            <Slider.Root
                // value={fontSliderValue}
                value={clickedCmpLineHeight}
                className='SliderRoot slider-input'
                // defaultValue={[16]}
                max={72}
                min={8}
                step={1}
                aria-label='Volume'
                onValueChange={handleLineHeightChange}
                onValueCommit={handleLineHeightSliderCommit}
            >
                <Slider.Track className='SliderTrack' value={50}>
                    <Slider.Range className='SliderRange' />
                </Slider.Track>
                <Slider.Thumb className='SliderThumb' />
            </Slider.Root>
        </form>
    )
}
