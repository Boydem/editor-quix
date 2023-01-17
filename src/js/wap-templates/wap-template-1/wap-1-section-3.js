import { makeId } from '../../services/util.service'

export const wap1Section3 = {
    id: makeId(),
    name: 'wap-1-section-3',
    type: 'div',
    category: 'section',
    themePalette: 'primary',
    thumbnail: '',
    cmps: [
        {
            id: makeId(),
            type: 'h1',
            content: {
                txt: 'Get Ready to Maximize Your Productivity With Our Workflow Solutions',
            },
        },
        {
            id: makeId(),
            type: 'button',
            content: {
                txt: 'Get Started',
            },
        },
        {
            id: makeId(),
            type: 'img',
            content: {
                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983828/section-4_dgefar.svg',
            },
        },
    ],
}
