import DynamicCmp from './dynamic-cmp'
import { getWap1Template } from '../../../wap-templates/wap-template-1/wap-1-template'

export function EditorPreview() {
    return (
        <div className='full templates-css-reset'>
            {getWap1Template().map(c => {
                return <DynamicCmp cmp={c} key={c.id} />
            })}
        </div>
    )
}
