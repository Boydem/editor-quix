import { makeId } from '../../services/util.service'

export const wap1Section3 = {
    id: makeId(),
    name: 'wap-1-section-3',
    type: 'div',
    category: 'section',
    themePalette: 'primary',
    cmpId: 'Section-3',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053215/wap-1-section-4_fxqmn1.jpg',
    cmps: [
        {
            id: makeId(),
            type: 'p',
            name: 'heading',
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
