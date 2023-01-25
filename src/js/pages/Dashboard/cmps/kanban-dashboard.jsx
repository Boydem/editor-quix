import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../../../services/user.service'
import { makeId, utilService } from '../../../services/util.service'
import { SET_USER } from '../../../store/user/user.reducer'
import { FiTrash } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'
import { updateUser } from '../../../store/user/user.actions'

export function KanbanDashboard({ user, currSite }) {
    const [newItemText, setNewItemText] = useState({})
    const dispatch = useDispatch()
    const [boards, setBoards] = useState(user?.boards || [])
    useEffect(() => {}, [user.boards])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setNewItemText(prev => ({ ...prev, [field]: value }))
    }

    function onSelectItem(ev, item = '', boardIdx) {
        document.addEventListener('mousedown', () => {
            updateItem(ev, item, boardIdx)
        })
    }

    function updateItem(ev, itemToUpdate, boardIdx) {
        if (!itemToUpdate) {
            user.boards[boardIdx].title = ev.target.innerText
            console.log('user.boards[boardIdx]', user.boards[boardIdx])
        } else {
            itemToUpdate.txt = ev.target.innerText
        }
        updateUser(user, boards)
    }

    function onDelete(boardIdx, itemId) {
        const removedItemIdx = boards[boardIdx].items.findIndex(item => item._id === itemId)
        boards[boardIdx].items.splice(removedItemIdx, 1)
        setBoards([...boards])
        updateUser(user, boards)
    }

    function addNewItem(ev, boardId, idx) {
        ev.preventDefault()
        const board = boards[idx]
        boards[idx] = {
            ...board,
            items: [...board.items, { txt: newItemText[boardId], _id: makeId(), createdAt: Date.now() }],
        }
        console.log('board addNewItem:', board)
        setBoards([...boards])
        updateUser(user, boards)
        setNewItemText('')
    }

    function onAddBoard() {
        const boardToAdd = {
            _id: makeId(),
            title: 'Change me',
            items: [
                {
                    _id: makeId(),
                    txt: 'Edit your task here!',
                    createdAt: Date.now(),
                },
            ],
        }

        user.boards = user.boards.length ? [...user.boards, boardToAdd] : [boardToAdd]
        setBoards([...user.boards])
        updateUser(user, boards)
    }

    console.log('boards:', boards)
    if (!boards || !boards.length) return <div>Loading..</div>
    return (
        <section className='kanban-board info-box'>
            {user?.boards &&
                boards.map((board, idx) => (
                    <div key={board._id} className='list-wrapper'>
                        <div className='list-content list'>
                            <div
                                className='list-header'
                                onClick={ev => onSelectItem(ev, null, idx)}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                            >
                                {board.title}
                            </div>
                            <ul className='list-items'>
                                {board.items?.map(item => (
                                    <li onClick={ev => onSelectItem(ev, item, idx)} key={item._id}>
                                        <button className='btn-icon close' onClick={() => onDelete(idx, item._id)}>
                                            <FiTrash />
                                        </button>
                                        <span contentEditable={true} suppressContentEditableWarning={true}>
                                            {item.txt}
                                        </span>
                                        <small>{utilService.formatTimeAgo(item.createdAt)}</small>
                                    </li>
                                ))}
                            </ul>
                            <form onSubmit={ev => addNewItem(ev, board._id, idx)} className='add-item'>
                                <input
                                    onChange={handleChange}
                                    value={newItemText[board._id] || ''}
                                    type='text'
                                    name={board._id}
                                    placeholder='Add a card'
                                />
                            </form>
                        </div>
                    </div>
                ))}
            <button className='btn-icon add-board' onClick={onAddBoard}>
                <AiOutlinePlus />
            </button>
        </section>
    )
}
