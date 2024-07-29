const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
// const { getWaps, getWapById, addWap, updateWap, removeWap, addWapMsg, removeWapMsg } = require('./wap.controller')
const {
    getWaps,
    getWapById,
    addWap,
    updateWap,
    removeWap,
    getWapByUrl,
    getWapToEdit,
    duplicateWap,
} = require('./wap.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getWaps)
router.get('/:id', getWapById)
router.get('/url/:url', getWapByUrl)
router.get('/edit/:id', getWapToEdit)
router.get('/copy/:id', duplicateWap)
router.post('/', requireAuth, addWap)
router.put('/:id', updateWap)
router.delete('/:id', removeWap)

// router.delete('/:id', requireAuth, requireAdmin, removeCar)

// router.post('/:id/msg', requireAuth, addCarMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router
