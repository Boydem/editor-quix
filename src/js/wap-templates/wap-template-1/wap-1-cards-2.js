import { makeId } from '../../services/util.service'

export const wap1Cards2 = {
    id: makeId(),
    name: 'wap-1-cards-2',
    type: 'div',
    category: 'card',
    themePalette: 'primary',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053216/wap-1-section-2_fodj8k.jpg',
    cmps: [
        {
            id: makeId(),
            name: 'content',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'h2',
                    content: {
                        txt: 'Trusted Among Industry Leaders',
                    },
                },
                {
                    id: makeId(),
                    type: 'p',
                    content: {
                        txt: `I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or
                        double click me to add your own content and make changes to the font.`,
                    },
                },
            ],
        },
        {
            id: makeId(),
            name: 'gallery',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983828/comp1_frdkd1.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983828/comp2_a763bi.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp3_beuj1j.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp4_iwfnzj.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp5_hdasey.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp8_pi6adk.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp6_b4keda.webp',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/comp7_rajd2g.webp',
                    },
                },
            ],
        },
    ],
}
