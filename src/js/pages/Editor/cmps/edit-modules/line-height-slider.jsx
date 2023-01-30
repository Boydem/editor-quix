import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

export function LineHeightSlider({ elClickedNode, handleLineHeightSliderChange, handleLineHeightSliderCommit }) {
    const [clickedCmpLineHeight, setClickedCmpLineHeight] = useState([16])

    useEffect(() => {
        setClickedCmpLineHeight(
            elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('line-height')) || [16]]
        )
    }, [elClickedNode])

    function handleLineHeightChange(value) {
        setClickedCmpLineHeight(value)
        handleLineHeightSliderChange(value)
    }

    return (
        <form className='slider-form adjust-inputs'>
            <label htmlFor=''>Line Height</label>
            <div className='wrapper'>
                <Slider.Root
                    // value={fontSliderValue}
                    value={clickedCmpLineHeight}
                    className='SliderRoot slider-input'
                    defaultValue={[16]}
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
                <span>{clickedCmpLineHeight[0] || '0'}px</span>
            </div>
        </form>
    )
}
