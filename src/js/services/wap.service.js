import { wap1Hero } from '../wap-templates/wap-template-1/wap-1-hero'
import wap2Hero from '../wap-templates/wap-template-2/wap-2-hero.json'

export const wapService = {
    getCmpById,
}

const cmpsInList = [wap1Hero, wap2Hero]
function getCmpById(id) {
    return cmpsInList.find(cmp => cmp.id === id)
}
