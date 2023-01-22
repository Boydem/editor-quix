import * as Slider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

export function FontSizeSlider({ elClickedNode, handleFontSliderChange, handleFontSliderCommit }) {
    const [clickedCmpFontSize, setClickedCmpFontSize] = useState([16])

    useEffect(() => {
        setClickedCmpFontSize(
            (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('font-size'))]) || [16]
        )
    }, [elClickedNode])

    function handleFontSizeChange(value) {
        setClickedCmpFontSize(value)
        handleFontSliderChange(value)
    }

    return (
        <form className='slider-form adjust-inputs'>
            <label htmlFor=''>Font Size</label>
            <div className='wrapper'>
                <Slider.Root
                    // value={fontSliderValue}
                    value={clickedCmpFontSize}
                    className='SliderRoot slider-input'
                    defaultValue={[16]}
                    max={72}
                    min={8}
                    step={1}
                    aria-label='Volume'
                    onValueChange={handleFontSizeChange}
                    onValueCommit={handleFontSliderCommit}
                >
                    <Slider.Track className='SliderTrack' value={50}>
                        <Slider.Range className='SliderRange' />
                    </Slider.Track>
                    <Slider.Thumb className='SliderThumb' />
                </Slider.Root>
                <span>{clickedCmpFontSize}px</span>
            </div>
        </form>
    )
}
