import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../../../services/user.service'
import { makeId, utilService } from '../../../services/util.service'
import { SET_USER } from '../../../store/user/user.reducer'
import { FiTrash } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'
import { updateUser } from '../../../store/user/user.actions'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export function KanbanDashboard({ user, currSite }) {
    const [newItemText, setNewItemText] = useState({})
    const dispatch = useDispatch()
    // const []
    const [boards, setBoards] = useState(user?.boards || [])
    useEffect(() => {}, [user.boards])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setNewItemText(prev => ({ ...prev, [field]: value }))
    }

    function onDragEnd(result) {
        // check if the draggable was dropped in a droppable
        if (!result.destination) {
            return
        }
        // check if the item was moved within the same list
        if (result.destination.droppableId === result.source.droppableId) {
            const newBoard = [...boards]
            const sourceList = newBoard[result.source.droppableId]
            const destList = newBoard[result.destination.droppableId]
            const [removed] = sourceList.items.splice(result.source.index, 1)
            destList.items.splice(result.destination.index, 0, removed)
            setBoards(newBoard)
        }
        // if the item was moved to a different list
        else {
            const newBoard = [...boards]
            const sourceList = newBoard[result.source.droppableId]
            const destList = newBoard[result.destination.droppableId]
            const [removed] = sourceList.items.splice(result.source.index, 1)
            destList.items.splice(result.destination.index, 0, removed)
            setBoards(newBoard)
        }
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
            console.log('ev.target:', ev.target)
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
        console.log('boardToAdd:', boardToAdd)
        user.boards = user.boards.length ? [...user.boards, boardToAdd] : [boardToAdd]
        console.log('user.boards:', user.boards)
        setBoards(user.boards)
        // updateUser(user, boards)
    }
    console.log('user:', user)

    console.log('boards:', boards)
    if (!boards || !boards.length) return <div>Loading..</div>
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className='kanban-board info-box'>
                {boards.map((board, idx) => (
                    <Droppable droppableId={idx.toString()} key={idx}>
                        {provided => {
                            return (
                                <div
                                    key={board._id}
                                    className='list-wrapper'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
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
                                            {board.items?.map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {provided => {
                                                        return (
                                                            <li
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                <button
                                                                    className='btn-icon close'
                                                                    onClick={() => onDelete(idx, item._id)}
                                                                >
                                                                    <FiTrash />
                                                                </button>
                                                                <span
                                                                    onClick={ev => onSelectItem(ev, item, idx)}
                                                                    contentEditable={true}
                                                                    suppressContentEditableWarning={true}
                                                                >
                                                                    {item.txt}
                                                                </span>
                                                                <small>
                                                                    {utilService.formatTimeAgo(item.createdAt)}
                                                                </small>
                                                            </li>
                                                        )
                                                    }}
                                                </Draggable>
                                            ))}
                                        </ul>

                                        {provided.placeholder}
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
                            )
                        }}
                    </Droppable>
                ))}
                <div className='list-wrapper add-btn'>
                    <button className='' onClick={onAddBoard}>
                        Add a new board
                    </button>
                </div>
            </section>
        </DragDropContext>
    )
}
