import { makeId } from '../../services/util.service'

export const wap1Nav = {
    name: 'wap-1-nav',
    type: 'div',
    category: 'header',
    themePalette: 'primary',
    id: makeId(),
    thumbnail: '',
    cmps: [
        {
            name: 'logo-container',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    name: 'logo.png',
                    type: 'img',
                    content: {
                        imgUrl: '',
                    },
                },
                {
                    id: makeId(),
                    name: 'about-logo',
                    type: 'div',
                    cmps: [
                        {
                            id: makeId(),
                            type: 'h2',
                            content: {
                                txt: 'WeDu',
                            },
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
