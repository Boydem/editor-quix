import * as Slider from '@radix-ui/react-slider'

export function FontSizeSlider({ elClickedNode, handleFontSliderChange, handleFontSliderCommit }) {
    return (
        <form className='slider-form'>
            <label htmlFor=''>Font Size</label>
            <Slider.Root
                // value={fontSliderValue}
                value={
                    (elClickedNode && [
                        parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('font-size')),
                    ]) || [16]
                }
                className='SliderRoot'
                defaultValue={[16]}
                max={72}
                min={8}
                step={1}
                aria-label='Volume'
                onValueChange={handleFontSliderChange}
                onValueCommit={handleFontSliderCommit}
            >
                <Slider.Track className='SliderTrack' value={50}>
                    <Slider.Range className='SliderRange' />
                </Slider.Track>
                <Slider.Thumb className='SliderThumb' />
            </Slider.Root>
        </form>
    )
}
