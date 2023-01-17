import { makeId } from '../../services/util.service'

export const wap1Section2 = {
    id: makeId(),
    name: 'wap-1-section-2',
    type: 'div',
    category: 'section',
    themePalette: 'primary',
    thumbnail: '',
    cmps: [
        {
            id: makeId(),
            type: 'img',
            content: {
                imgUrl: '',
            },
        },
        {
            id: makeId(),
            name: 'content',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'h2',
                    content: {
                        txt: 'Built for Creatives, by Creatives',
                    },
                },
                {
                    id: makeId(),
                    type: 'p',
                    content: {
                        txt: `I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or
                        double click me to add your own content and make changes to the font. I’m a great place for you to
                        tell a story and let your users know a little more about you.`,
                    },
                },
                {
                    id: makeId(),
                    name: 'icons',
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            name: 'icon',
                            type: 'div',
                            cmps: [
                                {
                                    id: makeId(),
                                    type: 'img',
                                    content: {
                                        imgUrl: '',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    content: {
                                        txt: 'Speed & Security',
                                    },
                                },
                            ],
                        },
                        {
                            id: makeId(),
                            name: 'icon',
                            type: 'div',
                            cmps: [
                                {
                                    id: makeId(),
                                    type: 'img',
                                    content: {
                                        imgUrl: '',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    content: {
                                        txt: 'Flexibility & Scalability',
                                    },
                                },
                            ],
                        },
                        {
                            id: makeId(),
                            name: 'icon',
                            type: 'div',
                            cmps: [
                                {
                                    id: makeId(),
                                    type: 'img',
                                    content: {
                                        imgUrl: '',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    content: {
                                        txt: 'Better Collaboration',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
