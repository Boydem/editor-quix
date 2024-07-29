import { makeId } from '../../services/util.service'

export const wap1Hero = {
    id: makeId(),
    name: 'wap-1-hero',
    type: 'div',
    category: 'hero',
    themePalette: 'primary',
    cmpId: 'Hero',
    thumbnail: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673995017/wapHero1_nadu0l.png',
    cmps: [
        {
            id: makeId(),
            name: 'content',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'p',
                    name: 'header',
                    content: {
                        txt: 'Communicate. Collaborate. Create.',
                    },
                },
                {
                    id: makeId(),
                    type: 'p',
                    name: 'txt',
                    content: {
                        txt: 'WeDu provides an effective and powerful way to manage your projects',
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
                                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983827/speed-security_n3cafu.svg',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    name: 'txt',
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
                                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983829/flex-scale_zxqcyf.svg',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    name: 'txt',
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
                                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983828/better-collab_kzdfno.svg',
                                    },
                                },
                                {
                                    id: makeId(),
                                    type: 'p',
                                    name: 'txt',
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
        {
            id: makeId(),
            type: 'img',
            name: 'hero-image',
            content: {
                imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673980989/hero-image_rvuthf.svg',
            },
        },
    ],
}
