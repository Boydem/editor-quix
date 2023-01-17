import { makeId } from '../../services/util.service'

export const wap1Cards2 = {
    id: makeId(),
    name: 'wap-1-cards-2',
    type: 'div',
    category: 'card',
    themePalette: 'primary',
    thumbnail: '',
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
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
            ],
        },
    ],
}
