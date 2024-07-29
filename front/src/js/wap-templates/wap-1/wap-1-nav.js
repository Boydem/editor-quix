import { makeId } from '../../services/util.service'

export const wap1Nav = {
    name: 'wap-1-nav',
    type: 'div',
    category: 'header',
    id: makeId(),
    cmpId: 'Header',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053214/wap-1-header_p95k8i.jpg',
    cmps: [
        {
            id: makeId(),
            name: 'logo-container',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    name: 'logo.png',
                    type: 'img',
                    content: {
                        imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1673983827/logo_gbu6tf.svg',
                    },
                },
                {
                    id: makeId(),
                    name: 'about-logo',
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'p',
                            content: {
                                txt: 'WeDu',
                            },
                            style: { fontSize: '1.5rem' },
                        },
                        {
                            id: makeId(),
                            type: 'p',
                            content: {
                                txt: 'Communicate. Collaborate. Create.',
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: makeId(),
            type: 'div',
            name: 'links',
            cmps: [
                {
                    id: makeId(),
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'a',
                            content: {
                                txt: 'Home',
                                href: '',
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'a',
                            content: {
                                txt: 'Product',
                                href: '',
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'a',
                            content: {
                                txt: 'Pricing Plans',
                                href: '',
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'a',
                            content: {
                                txt: 'Log In',
                                href: '',
                            },
                        },
                    ],
                },
                {
                    id: makeId(),
                    type: 'button',
                    content: {
                        txt: 'Get Started',
                    },
                },
            ],
        },
    ],
}
