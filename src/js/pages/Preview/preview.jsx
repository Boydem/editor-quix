import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { wapService } from '../../services/wap.service'
import DynamicCmp from '../Editor/cmps/dynamic-cmp'
import { DarkHeader } from '../Template/cmps/dark-header'

export function Preview() {
    const [template, setTemplate] = useState(null)
    const { wapId } = useParams()
    useEffect(() => {
        loadWap()
    }, [])

    async function loadWap() {
        let template = await wapService.get(wapId)
        setTemplate(template)
    }

    if (!template) return <></>
    return (
        <div className='full'>
            {/* <DarkHeader /> */}
            {template.cmps.map(fraction => {
                return <DynamicCmp cmp={fraction} previewOnly={true} />
            })}
        </div>
    )
}
