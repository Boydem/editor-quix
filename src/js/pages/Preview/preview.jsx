import { useEffect } from 'react'
import { useParams } from 'react-router'
import { wapService } from '../../services/wap.service'

export function Preview() {
    const { wapId } = useParams()
    useEffect(() => {
        loadWap()
    }, [])

    async function loadWap() {
        let template = await wapService.get(wapId)
    }
    return <div>Preview</div>
}
