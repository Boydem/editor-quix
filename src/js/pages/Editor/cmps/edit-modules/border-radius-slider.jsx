import * as Slider from '@radix-ui/react-slider'

export function BorderRadiusSlider({ elClickedNode, handleBorderSliderChange, handleBorderSliderCommit }) {
    return (
        <form className='slider-form'>
            <label htmlFor=''>Border Radius</label>
            <Slider.Root
                value={
                    (elClickedNode && [
                        parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('border-radius')),
                    ]) || [0]
                }
                className='SliderRoot'
                max={50}
                step={1}
                aria-label='Volume'
                onValueChange={handleBorderSliderChange}
                onValueCommit={handleBorderSliderCommit}
            >
                <Slider.Track className='SliderTrack'>
                    <Slider.Range className='SliderRange' />
                </Slider.Track>
                <Slider.Thumb className='SliderThumb' />
            </Slider.Root>
        </form>
    )
}
