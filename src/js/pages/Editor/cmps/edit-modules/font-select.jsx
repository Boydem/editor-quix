import { FontFamilySelect } from '../font-family-select'

export function FontSelect({ handleFontFamilyChange, SelectItem }) {
    return (
        <div className='selector adjust-inputs'>
            <p>Font Select</p>
            <FontFamilySelect handleFontFamilyChange={handleFontFamilyChange} SelectItem={SelectItem} />
        </div>
    )
}
