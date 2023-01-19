import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { showErrorMsg } from '../../services/event-bus.service'
import { wapService } from '../../services/wap.service'
import DynamicCmp from '../Editor/cmps/dynamic-cmp'
import { DarkHeader } from '../Template/cmps/dark-header'

export function Preview() {
    const [wap, setWap] = useState(null)
    const { wapId, wapUrl } = useParams()
    useEffect(() => {
        loadWap()
    }, [wap])

    async function loadWap() {
        let wap
        try {
            if (wapId) {
                wap = await wapService.get(wapId)
            } else {
                wap = await wapService.getWapByUrl(wapUrl)
            }
            setWap(wap)
        } catch (err) {
            console.log('Failed to load wap in wap-preview', err)
            showErrorMsg('Failed to load your demo, try again later')
        }
    }

    if (!wap || !wap.cmps) return <div>Loader...</div>
    return (
        <div className='full'>
            {/* <DarkHeader /> */}
            {wap.cmps.map(cmp => {
                return <DynamicCmp cmp={cmp} previewOnly={true} key={cmp.id} />
            })}
        </div>
    )
}
