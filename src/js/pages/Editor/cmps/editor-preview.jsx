import DynamicCmp from './dynamic-cmp'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function EditorPreview({ templateOrder }) {
    const editorResizerRef = [useRef(), useRef()]
    let [isResizing, setIsResizing] = useState(false)
    const editorWrapper = useRef()
    useEffect(() => {
        if (editorResizerRef) {
            editorResizerRef.forEach(resizer => {
                resizer.current.addEventListener('mousemove', handleResizeDrag)
                resizer.current.addEventListener('mousedown', handleMouseDown)
                document.addEventListener('mouseup', handleMouseUp)
            })
        }
    }, [])

    function handleMouseDown() {
        console.log('DOWN')
        isResizing = true
    }
    function handleMouseUp() {
        console.log('UP')
        isResizing = false
    }
    function handleResizeDrag(ev) {
        if (!isResizing) return
        console.log('DRAG')
        // console.log('ev:', ev)
        // console.log('ev.offsetX:', ev.offsetX)
        // console.log('ev.screenX:', ev.screenX)
        const currLeft = window.getComputedStyle(editorResizerRef[0].current).getPropertyValue('left')
        const currLeftFormatted = +currLeft.substring(0, currLeft.length - 2) - 3
        const currRight = window.getComputedStyle(editorResizerRef[1].current).getPropertyValue('left')
        const currRightFormatted = +currRight.substring(0, currRight.length - 2) + 3
        //  + editorResizerRef[1].current.offsetWidth / 2
        editorWrapper.current.style.width = `${currRightFormatted - currLeftFormatted - 30}px`
        console.log('currLeftFormatted:', currLeftFormatted)
        console.log('currRightFormatted:', currRightFormatted)
        console.log('editorWrapper.current.style.width:', editorWrapper.current.style.width)
        editorResizerRef[0].current.style.left = `${+currLeftFormatted + ev.offsetX}px`
        editorResizerRef[1].current.style.left = `${+currRightFormatted - ev.offsetX}px`
        console.log(+editorResizerRef[1].current.offsetWidth / 2)
        // console.log(editorResizerRef[0].current.style.left)
        // editorResizerRef[0].current.style.left = `${Math.abs(ev.offsetX)}px`
        // console.log(editorResizerRef[0].current.style.left)
        // console.log(editorWrapper.current.offsetWidth)
        // console.log('Dragging:')
        // console.log(window.getComputedStyle(editorResizerRef[0].current).getPropertyValue('left')) // border-radius can be replaced with any other style attributes;
    }

    return (
        <Droppable droppableId='editor-preview'>
            {provided => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        <div ref={editorWrapper} className='wrapper'>
                            <div ref={editorResizerRef[0]} className='editor-resizer left'></div>
                            {templateOrder.map((fraction, idx) => {
                                return (
                                    <Draggable key={idx} draggableId={idx.toString()} index={idx}>
                                        {provided => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <DynamicCmp cmp={fraction} />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            <div ref={editorResizerRef[1]} className='editor-resizer right'></div>
                            {provided.placeholder}
                        </div>
                    </div>
                )
            }}
        </Droppable>
    )
}
