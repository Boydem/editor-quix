import { useEffect } from 'react'
import { useState } from 'react'
import { makeId, utilService } from '../../../services/util.service'
import { FiTrash } from 'react-icons/fi'
import { setCurrSite, updateUser } from '../../../store/user/user.actions'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { updateCurrSite } from '../../../store/wap/wap.action'
import { showErrorMsg } from '../../../services/event-bus.service'
import { CgViewCols, CgViewList } from 'react-icons/cg'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsKanbanFill } from 'react-icons/bs'
import { Loader } from '../../../cmps/loader'

export function KanbanDashboard({ user, currSite }) {
    const [newItemText, setNewItemText] = useState({})
    const [boards, setBoards] = useState(currSite.leadsBoards)
    const [leadsList, setLeadsList] = useState()
    const [view, setView] = useState('board')
    useEffect(() => {
        setBoards(currSite.leadsBoards)
    }, [currSite])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setNewItemText(prev => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        const leadsListFormatted = currSite.leadsBoards.reduce((acc, board) => {
            board.items.forEach(item => {
                // const newItem = structuredClone(item)
                item.status = board.title
                acc.push(item)
            })
            return acc
        }, [])
        setLeadsList(leadsListFormatted)
    }, [view])

    function onDragEnd(result) {
        // check if the draggable was dropped in a droppable
        if (!result.destination) {
            return
        }
        let newBoard
        // check if the item was moved within the same list
        if (result.destination.droppableId === result.source.droppableId) {
            newBoard = [...boards]
            const sourceList = newBoard[result.source.droppableId]
            const destList = newBoard[result.destination.droppableId]
            const [removed] = sourceList.items.splice(result.source.index, 1)
            destList.items.splice(result.destination.index, 0, removed)
            setBoards(newBoard)
        }
        // if the item was moved to a different list
        else {
            newBoard = [...boards]
            const sourceList = newBoard[result.source.droppableId]
            const destList = newBoard[result.destination.droppableId]
            const [removed] = sourceList.items.splice(result.source.index, 1)
            destList.items.splice(result.destination.index, 0, removed)
            setBoards(newBoard)
        }
        currSite.leadsBoards = newBoard
        try {
            updateCurrSite(currSite)
        } catch (err) {
            showErrorMsg('Failed to update. Please try again later.')
            console.log('err:', err)
        }
    }

    function onSelectItem(ev, item = '', boardIdx) {
        // document.addEventListener('mousedown', () => {
        //     updateItem(ev, item, boardIdx)
        // })
    }

    function updateItem(ev, itemToUpdate, boardIdx) {
        // if (!itemToUpdate) {
        //     user.boards[boardIdx].title = ev.target.innerText
        // } else {
        //     itemToUpdate.txt = ev.target.innerText
        // }
        // updateUser(user, boards)
    }

    function onDelete(boardIdx, itemId) {
        const removedItemIdx = boards[boardIdx].items.findIndex(item => item.id === itemId)
        boards[boardIdx].items.splice(removedItemIdx, 1)
        setBoards([...boards])
        try {
            updateCurrSite(currSite)
        } catch (err) {
            showErrorMsg('Failed to update. Please try again later.')
            console.log('err:', err)
        }
    }

    function addNewItem(ev, boardId, idx) {
        ev.preventDefault()
        const board = boards[idx]
        boards[idx] = {
            ...board,
            items: [
                ...board.items,
                {
                    data: { '': newItemText[boardId], date: Date.now() },
                    id: makeId(),
                    status: board.title.toLowerCase(),
                },
            ],
        }

        setBoards([...boards])
        setNewItemText('')

        currSite.leadsBoards = boards
        try {
            updateCurrSite(currSite)
        } catch (err) {
            showErrorMsg('Failed to update. Please try again later.')
            console.log('err:', err)
        }
    }

    function onChangeStatus(lead) {
        console.log(lead)
    }

    function onAddBoard() {
        const boardToAdd = {
            id: makeId(),
            title: 'Change me',
            items: [
                {
                    id: makeId(),
                    data: { '': 'Enter your new lead!', date: Date.now() },
                    status: 'Change me',
                },
            ],
        }
        setBoards(prev => [...prev, boardToAdd])
        // currSite.leadsBoards = [...boards, boardToAdd]
        // try {
        //     updateCurrSite(currSite)
        // } catch (err) {
        //     showErrorMsg('Failed to update. Please try again later.')
        //     console.log('err:', err)
        // }
    }
    if (!boards || !boards.length) return <Loader />
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <section className='info-box kanban-board'>
                <div className='inner-nav'>
                    <h4>My Leads</h4>
                    <div className='btns'>
                        <button className={view === 'board' ? 'active' : ''} onClick={() => setView('board')}>
                            <BsKanbanFill />
                        </button>
                        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                            <AiOutlineUnorderedList />
                        </button>
                    </div>
                </div>
                {view === 'board' && (
                    <div className='lists-container'>
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
                                                                            className='close'
                                                                            onClick={() => onDelete(idx, item.id)}
                                                                        >
                                                                            <FiTrash />
                                                                        </button>
                                                                        {Object.keys(item.data).map(
                                                                            (keyName, keyIndex) => {
                                                                                if (keyName === 'date')
                                                                                    return <div key={keyName}></div>
                                                                                return (
                                                                                    <div key={keyName} className='line'>
                                                                                        {keyName && (
                                                                                            <span>{keyName}</span>
                                                                                        )}
                                                                                        {item.data[keyName]}
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        )}
                                                                        <span
                                                                            onClick={ev => onSelectItem(ev, item, idx)}
                                                                            contentEditable={true}
                                                                            suppressContentEditableWarning={true}
                                                                        >
                                                                            {item.txt}
                                                                        </span>
                                                                        <small className='time'>
                                                                            {utilService.formatTimeAgo(item.data.date)}
                                                                        </small>
                                                                    </li>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    ))}
                                                </ul>

                                                {provided.placeholder}
                                                <form
                                                    onSubmit={ev => addNewItem(ev, board.id, idx)}
                                                    className='add-item'
                                                >
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
                    </div>
                )}
                {view === 'list' && (
                    <div className='table-box'>
                        {/* <div className='header'>
                            <div className='text-wrapper'>
                                <h3>My leads</h3>
                            </div>
                            <button className='btn-send-msg'>Download CSV</button>
                        </div> */}
                        <div className='user-forms leads-table'>
                            <ul className='table-row table-header container'>
                                {leadsList && leadsList.length > 0 && (
                                    <>
                                        {Object.keys(leadsList?.at(-1).data).map((key, keyIndex) => {
                                            return (
                                                <li className='col' key={key}>
                                                    {key}
                                                </li>
                                            )
                                        })}
                                    </>
                                )}
                                <li className='col'>Status</li>
                            </ul>

                            {leadsList?.map(lead => {
                                return (
                                    <ul className='table-row container' key={lead.id}>
                                        {Object.keys(lead.data).map((key, keyIndex) => {
                                            return (
                                                <li className='col' key={key}>
                                                    {key === 'date' && utilService.formatTimeAgo(lead.data[key])}
                                                    {key !== 'date' && lead.data[key]}
                                                </li>
                                            )
                                        })}
                                        <li className='col cursor-pointer' onClick={() => onChangeStatus(lead)}>
                                            {utilService.capitalize(lead.status)}
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                )}
            </section>
        </DragDropContext>
    )
}
