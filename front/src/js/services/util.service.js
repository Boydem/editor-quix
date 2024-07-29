export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getLeftRightPropertiesForDrag,
    formatTimeAgo,
    capitalize,
}

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function getLeftRightPropertiesForDrag(ev, resizingState) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 25
    let leftLeft
    let rightLeft
    if (resizingState.draggingResizer === 'left') {
        leftLeft = ev.clientX + 5
        rightLeft = vw - ev.clientX - 15
    }
    if (resizingState.draggingResizer === 'right') {
        leftLeft = vw - ev.clientX + 5
        rightLeft = ev.clientX - 15
    }

    leftLeft = Math.min(leftLeft, vw / 2 - 250)
    rightLeft = Math.max(rightLeft, vw / 2 + 250)
    return [leftLeft, rightLeft]
}

function formatTimeAgo(sentAt) {
    const timestamp = Date.now()
    const seconds = Math.floor(timestamp / 1000)
    const oldTimestamp = Math.floor(sentAt / 1000)

    const difference = seconds - oldTimestamp
    let output = ``
    if (difference < 60) {
        // Less than a minute has passed:
        output = `Just now`
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`
    }

    return `${output}`
}
