import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../../../services/user.service'
import { makeId, utilService } from '../../../services/util.service'
import { SET_USER } from '../../../store/user/user.reducer'
import { FiTrash } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'

export function KanbanDashboard({ user, currSite }) {
    const [newItemText, setNewItemText] = useState({})
    const dispatch = useDispatch()
    // const [boards,setBoards] = useState(user?.boards || null)
    const [boards, setBoards] = useState(user?.boards || [])
    useEffect(() => {}, [user.boards])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setNewItemText(prev => ({ ...prev, [field]: value }))
    }

    function onSelectItem(ev, item, boardIdx) {
        console.log(ev)
        console.log(item)
        document.addEventListener('mousedown', () => {
            updateItem(ev, item, boardIdx)
        })
    }

    // console.log('newItemText:', newItemText)
    function updateItem(ev, itemToUpdate, boardIdx) {
        // const boardIndex = user.boards.findIndex(board=>board._id === boardId)
        console.log(boards[boardIdx])
        // const itemToUpdateIdx = boards[boardIdx].items.findIndex(item => item._id === itemToUpdate._id)
        // console.log(itemToUpdate, itemToUpdateIdx)
        // boards[boardIdx].items[itemToUpdateIdx] = {ev.target.innerText}
        itemToUpdate.txt = ev.target.innerText
        console.log(boards[boardIdx])
    }

    function onDelete(boardIdx, itemId) {
        const removedItemIdx = boards[boardIdx].items.findIndex(item => item._id === itemId)
        boards[boardIdx].items.splice(removedItemIdx, 1)
        setBoards([...boards])
    }

    function addNewItem(ev, boardId, idx) {
        ev.preventDefault()
        // let board = boards.find(board => board._id === boardId)
        const board = boards[idx]
        boards[idx] = {
            ...board,
            items: [...board.items, { txt: newItemText[boardId], _id: makeId(), createdAt: Date.now() }],
        }
        console.log('board addNewItem:', board)
        setBoards([...boards])
        // dispatch({ type: SET_USER, user })
    }

    function onAddBoard() {
        const boardToAdd = {
            _id: makeId(),
            title: '',
            items: [
                {
                    _id: makeId(),
                    txt: 'Click me to edit the text',
                    createdAt: Date.now(),
                },
            ],
        }

        user.boards = user.boards.length ? [...user.boards, boardToAdd] : [boardToAdd]
        setBoards(user.boards)
    }

    console.log('boards:', boards)
    if (!boards || !boards.length) return <div>Loading..</div>
    return (
        <section className='kanban-board info-box'>
            {user?.boards &&
                boards.map((board, idx) => (
                    <div key={board._id} className='list-wrapper'>
                        <div className='list-content list'>
                            <div className='list-header'>{board.title}</div>
                            <ul className='list-items'>
                                {board.items?.map(item => (
                                    <li onClick={e => onSelectItem(e, item, idx)} key={item._id}>
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
