import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { showErrorMsg } from '../../services/event-bus.service'
import { wapService } from '../../services/wap.service'
import DynamicCmp from '../Editor/cmps/dynamic-cmp'
import { DarkHeader } from '../Template/cmps/dark-header'

export function Preview() {
    const [wap, setWap] = useState(null)
    const { wapId, wapUrl } = useParams()
    const containerRef = useRef()
    useEffect(() => {
        loadWap()

        return () => {
            const root = document.getElementById('root')
            root.classList.remove(wap.themeClass)
        }
    }, [])

    async function loadWap() {
        let wap
        try {
            if (wapId) {
                wap = await wapService.get(wapId)
            } else {
                wap = await wapService.getWapByUrl(wapUrl)
            }
            setWap(wap)
            const root = document.getElementById('root')
            root.classList.add(wap.themeClass)
        } catch (err) {
            console.log('Failed to load wap in wap-preview', err)
            showErrorMsg('Failed to load your demo. Please try again later.')
        }
    }

    if (!wap || !wap.cmps) return <div>Loader...</div>
    return (
        <div className='full templates-css-reset' ref={containerRef}>
            {/* <DarkHeader /> */}
            {wap.cmps.map(cmp => {
                return <DynamicCmp cmp={cmp} key={cmp.id} />
            })}
        </div>
    )
}
