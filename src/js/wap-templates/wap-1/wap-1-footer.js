import { makeId } from '../../services/util.service'

export const wap1Footer = {
    id: makeId(),
    name: 'wap-1-footer',
    type: 'div',
    category: 'footer',
    themePalette: 'primary',
    cmpId: 'Footer',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053214/wap-1-footer_zk7vka.jpg',
    cmps: [{ id: makeId(), type: 'p', content: { txt: '© 2035 by WeDu. Powered and secured by Webix' } }],
}
