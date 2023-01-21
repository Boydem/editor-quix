import { makeId } from '../../services/util.service'

export const wap1Cards1 = {
    id: makeId(),
    name: 'wap-1-cards-1',
    type: 'div',
    category: 'card',
    themePalette: 'primary',
    cmpId: 'Cards-1',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053216/wap-1-cards-1_s7zmml.jpg',
    cmps: [
        {
            id: makeId(),
            name: 'heading',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'p',
                    name: 'header',
                    content: {
                        txt: 'What We Offer',
                    },
                },
                {
                    id: makeId(),
                    type: 'p',
                    name: 'txt',
                    content: {
                        txt: ` I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or
                        double click me to add your own content and make changes to the font.`,
                    },
                },
            ],
        },
        {
            id: makeId(),
            name: 'section-gallery',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'div',
                    name: 'item',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'img',
                            content: {
                                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983830/img1_xrpsr8.webp',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'mini-heading',
                            content: {
                                txt: 'Workflows That Work',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'txt',
                            content: {
                                txt: `I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell
                                a story and let your users know a little more about you.`,
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    name: 'item',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'img',
                            content: {
                                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983827/img2_jkmwc4.webp',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'mini-heading',
                            content: {
                                txt: 'Comprehensive Customer Support',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            content: {
                                txt: `I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell
                                a story and let your users know a little more about you.`,
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    name: 'item',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'img',
                            name: 'mini-heading',
                            content: {
                                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983827/img3_zpvzbd.webp',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'h4',
                            name: 'mini-heading',
                            content: {
                                txt: 'All-In-One Solution',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'txt',
                            content: {
                                txt: `I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell
                                a story and let your users know a little more about you.`,
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    name: 'item',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'img',
                            content: {
                                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983827/img4_cr6btz.webp',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'mini-heading',
                            content: {
                                txt: 'Smart Automation Tools',
                            },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            name: 'txt',
                            content: {
                                txt: `I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell
                                a story and let your users know a little more about you.`,
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
