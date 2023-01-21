import { makeId } from '../../services/util.service'

export const wap1Section1 = {
    id: makeId(),
    name: 'wap-1-section-1',
    type: 'div',
    category: 'section',
    themePalette: 'primary',
    cmpId: 'Section-1',
    thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674053214/wap-1-section-1_qtuqgo.jpg',
    cmps: [
        {
            id: makeId(),
            name: 'content',
            type: 'div',
            cmps: [
                {
                    id: makeId(),
                    type: 'h3',
                    name: 'header',
                    content: {
                        txt: 'With the Right Software, Great Things Can Happen',
                    },
                },
                {
                    id: makeId(),
                    type: 'p',
                    content: {
                        txt: `I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or
                        double click me to add your own content and make changes to the font. Feel free to drag and drop me
                        anywhere you like on your page. I'm a great place for you to tell a story and let your users know a
                        little more about you.`,
                    },
                },
            ],
        },
    ],
}
