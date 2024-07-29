const wapService = require('./wap.service.js')

const logger = require('../../services/logger.service')

async function getWaps(req, res) {
    try {
        logger.debug('Getting Waps')
        const filterBy = {
            owner: req.query.owner || '',
        }
        // console.log('filterBy', filterBy)
        const waps = await wapService.query(filterBy)
        // console.log('waps', waps)
        res.json(waps)
    } catch (err) {
        logger.error('Failed to get waps', err)
        res.status(500).send({ err: 'Failed to get waps' })
    }
}

async function getWapById(req, res) {
    try {
        const wapId = req.params.id
        const wap = await wapService.getById(wapId)
        res.json(wap)
    } catch (err) {
        logger.error('Failed to get wap', err)
        res.status(500).send({ err: 'Failed to get wap' })
    }
}

async function getWapByUrl(req, res) {
    try {
        const wapUrl = req.params.url
        const wap = await wapService.getByUrl(wapUrl)
        res.json(wap)
    } catch (err) {
        logger.error('Failed to get wap by url', err)
        res.status(500).send({ err: 'Failed to get wap' })
    }
}

async function getWapToEdit(req, res) {
    try {
        const id = req.params.id
        console.log('getting wap to edit')
        let demoWap = await wapService.getById(id)
        delete demoWap._id
        const wap = await wapService.add(demoWap)
        res.json(wap)
    } catch (err) {
        logger.error('Failed to get wap', err)
        res.status(500).send({ err: 'Failed to get template to edit' })
    }
}

async function duplicateWap(req, res) {
    try {
        const id = req.params.id
        let copiedWap = await wapService.getById(id)
        delete copiedWap._id
        const wap = await wapService.duplicateWap(copiedWap)
        res.json(wap)
    } catch (err) {
        logger.error('Failed to get wap', err)
        res.status(500).send({ err: 'Failed to duplicate wap' })
    }
}

async function addWap(req, res) {
    const { loggedinUser } = req

    try {
        const wap = req.body
        wap.owner = loggedinUser
        const addedWap = await wapService.add(wap)
        res.json(addedWap)
    } catch (err) {
        logger.error('Failed to add wap', err)
        res.status(500).send({ err: 'Failed to add wap' })
    }
}

async function updateWap(req, res) {
    try {
        const wap = req.body
        const updatedWap = await wapService.update(wap)
        res.json(updatedWap)
    } catch (err) {
        logger.error('Failed to update wap', err)
        res.status(500).send({ err: 'Failed to update wap' })
    }
}

async function removeWap(req, res) {
    try {
        const wapId = req.params.id
        const removedId = await wapService.remove(wapId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove wap', err)
        res.status(500).send({ err: 'Failed to remove wap' })
    }
}

// async function addCarMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const wapId = req.params.id
//         const msg = {
//             txt: req.body.txt,
//             by: loggedinUser,
//         }
//         const savedMsg = await wapService.addCarMsg(wapId, msg)
//         res.json(savedMsg)
//     } catch (err) {
//         logger.error('Failed to update car', err)
//         res.status(500).send({ err: 'Failed to update car' })
//     }
// }

// async function removeCarMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const wapId = req.params.id
//         const { msgId } = req.params

//         const removedId = await wapService.removeCarMsg(wapId, msgId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove car msg', err)
//         res.status(500).send({ err: 'Failed to remove car msg' })
//     }
// }

module.exports = {
    getWaps,
    getWapById,
    addWap,
    updateWap,
    removeWap,
    getWapByUrl,
    getWapToEdit,
    duplicateWap,
    // addCarMsg,
    // removeCarMsg,
}
