import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../../../services/user.service'
import { makeId } from '../../../services/util.service'
import { SET_USER } from '../../../store/user/user.reducer'
import { FiTrash } from 'react-icons/fi'

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
    // console.log('newItemText:', newItemText)
    function updateItem() {
        // const boardIndex = user.boards.findIndex(board=>board._id === boardId)
    }

    function onDelete() {
        console.log('DELETING')
    }

    function addNewItem(ev, boardId, idx) {
        ev.preventDefault()
        // let board = boards.find(board => board._id === boardId)
        const board = boards[idx]
        boards[idx] = { ...board, items: [...board.items, { txt: newItemText[boardId], _id: makeId() }] }
        console.log('board addNewItem:', board)
        setBoards([...boards])
        // dispatch({ type: SET_USER, user })
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
                                    <li key={item._id}>
                                        <button className='btn-icon close' onClick={onDelete}>
                                            <FiTrash />
                                        </button>
                                        <span>{item.txt}</span>
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
        </section>
    )
}
