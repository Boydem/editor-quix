import { useEffect } from 'react'
import { useState } from 'react'
import { makeId, utilService } from '../../../services/util.service'
import { FiTrash } from 'react-icons/fi'
import { updateUser } from '../../../store/user/user.actions'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export function KanbanDashboard({ user, currSite }) {
    console.log('currSite:', currSite)
    const [newItemText, setNewItemText] = useState({})
    const [boards, setBoards] = useState(currSite.leadsBoards)
    useEffect(() => {}, [user.boards])

    useEffect(() => {
        // const formattedBoards = currSite.leads.reduce((acc, lead) => {
        //     const index = acc.findIndex(board => board.title.toLowerCase() === lead.status)
        //     console.log('index:', index)
        //     if (index > -1) {
        //         acc[index].items.push({ id: makeId(), data: lead.data, createdAt: lead.data.date })
        //     } else {
        //         const boardNew = {
        //             id: makeId(),
        //             title: utilService.capitalize(lead.status),
        //             items: [{ id: makeId(), data: lead.data, createdAt: lead.data.date }],
        //         }
        //         acc.push(boardNew)
        //     }
        //     return acc
        // }, [])
        // console.log('formattedBoards:', formattedBoards)
        // if (!formattedBoards[0]) {
        //     formattedBoards[0] = {
        //         id: makeId(),
        //         title: 'New',
        //         items: [],
        //     }
        // }
        // if (!formattedBoards[1]) {
        //     formattedBoards[1] = {
        //         id: makeId(),
        //         title: 'In Progress',
        //         items: [],
        //     }
        // }
        // if (!formattedBoards[2]) {
        //     formattedBoards[2] = {
        //         id: makeId(),
        //         title: 'Done',
        //         items: [],
        //     }
        // }
        // setBoards(formattedBoards)
    }, [currSite])

    function handleChange(ev) {
        // const value = ev.target.value
        // const field = ev.target.name
        // setNewItemText(prev => ({ ...prev, [field]: value }))
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
            console.log('sourceList:', sourceList)
            console.log('destList:', destList)
            setBoards(newBoard)
        }
        // if the item was moved to a different list
        else {
            const newBoard = [...boards]
            const sourceList = newBoard[result.source.droppableId]
            const destList = newBoard[result.destination.droppableId]
            const [removed] = sourceList.items.splice(result.source.index, 1)
            destList.items.splice(result.destination.index, 0, removed)
            console.log('result.source:', result.source)
            // console.log('destList:', destList)
            updateLeads()
            setBoards(newBoard)
        }
    }

    function updateLeads() {}

    function onSelectItem(ev, item = '', boardIdx) {
        // document.addEventListener('mousedown', () => {
        //     updateItem(ev, item, boardIdx)
        // })
    }

    function updateItem(ev, itemToUpdate, boardIdx) {
        // if (!itemToUpdate) {
        //     user.boards[boardIdx].title = ev.target.innerText
        //     console.log('user.boards[boardIdx]', user.boards[boardIdx])
        // } else {
        //     console.log('ev.target:', ev.target)
        //     itemToUpdate.txt = ev.target.innerText
        // }
        // updateUser(user, boards)
    }

    function onDelete(boardIdx, itemId) {
        // const removedItemIdx = boards[boardIdx].items.findIndex(item => item.id === itemId)
        // boards[boardIdx].items.splice(removedItemIdx, 1)
        // setBoards([...boards])
        // updateUser(user, boards)
    }

    function addNewItem(ev, boardId, idx) {
        // ev.preventDefault()
        // const board = boards[idx]
        // boards[idx] = {
        //     ...board,
        //     items: [...board.items, { txt: newItemText[boardId], id: makeId(), createdAt: Date.now() }],
        // }
        // console.log('board addNewItem:', board)
        // setBoards([...boards])
        // updateUser(user, boards)
        // setNewItemText('')
    }

    function onAddBoard() {
        // const boardToAdd = {
        //     id: makeId(),
        //     title: 'Change me',
        //     items: [
        //         {
        //             id: makeId(),
        //             txt: 'Edit your task here!',
        //             createdAt: Date.now(),
        //         },
        //     ],
        // }
        // console.log('boardToAdd:', boardToAdd)
        // user.boards = user.boards.length ? [...user.boards, boardToAdd] : [boardToAdd]
        // console.log('user.boards:', user.boards)
        // setBoards(user.boards)
        // updateUser(user, boards)
    }
    // console.log('user:', user)
    // console.log('currSite:', currSite)
    // console.log('boards[0]:', boards[0])
    // console.log('boards:', boards)
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
                                    key={board.id}
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
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {provided => {
                                                        return (
                                                            <li
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                <button
                                                                    className='btn-icon close'
                                                                    onClick={() => onDelete(idx, item.id)}
                                                                >
                                                                    <FiTrash />
                                                                </button>
                                                                {Object.keys(item.data).map((keyName, keyIndex) => {
                                                                    if (keyName === 'date')
                                                                        return <div key={keyName}></div>
                                                                    return (
                                                                        <div key={keyName} className='line'>
                                                                            <span>{keyName}</span>
                                                                            {item.data[keyName]}
                                                                        </div>
                                                                    )
                                                                })}
                                                                <span
                                                                    onClick={ev => onSelectItem(ev, item, idx)}
                                                                    contentEditable={true}
                                                                    suppressContentEditableWarning={true}
                                                                >
                                                                    {item.txt}
                                                                </span>
                                                                <small>
                                                                    {utilService.formatTimeAgo(item.data.date)}
                                                                </small>
                                                            </li>
                                                        )
                                                    }}
                                                </Draggable>
                                            ))}
                                        </ul>

                                        {provided.placeholder}
                                        <form onSubmit={ev => addNewItem(ev, board.id, idx)} className='add-item'>
                                            <input
                                                onChange={handleChange}
                                                value={newItemText[board.id] || ''}
                                                type='text'
                                                name={board.id}
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
