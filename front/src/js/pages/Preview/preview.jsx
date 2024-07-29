import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { showErrorMsg } from '../../services/event-bus.service'
import { socketService } from '../../services/socket.service'
import { wapService } from '../../services/wap.service'
import { saveWap, setWap, setWapNull } from '../../store/wap/wap.action'
import DynamicCmp from '../Editor/cmps/dynamic-cmp'

export function Preview() {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const { wapId, wapUrl } = useParams()
    const containerRef = useRef()
    const user = useSelector(storeState => storeState.userModule.user)
    // eslint-disable-next-line no-unused-vars
    const [isUserSite, setIsUserSite] = useState(false)

    useEffect(() => {
        loadWap()
        socketService.emit('set-wap-room', wapUrl)
        if (!wap.visitors) wap.visitors = []
        wap.visitors.push(Date.now())
        saveWap(wap)

        return () => {
            const root = document.getElementById('root')
            root.classList.remove(wap.themeClass)
            setWapNull()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            if (wap.owner === user._id) setIsUserSite(true)
        } catch (err) {
            showErrorMsg('Failed to load your demo. Please try again later.')
        }
    }

    if (!wap || !wap.cmps) return <div>Loader...</div>
    return (
        <div className='full templates-css-reset' ref={containerRef}>
            {wap.cmps.map(cmp => {
                return <DynamicCmp cmp={cmp} key={cmp.id} />
            })}
        </div>
    )
}
