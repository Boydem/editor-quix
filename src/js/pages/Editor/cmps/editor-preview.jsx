import DynamicCmp from './dynamic-cmp'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function EditorPreview({ templateOrder }) {
    const editorResizerRef = [useRef(), useRef()]
    const editorWrapper = useRef()
    useEffect(() => {
        if (editorResizerRef) {
            editorResizerRef.forEach(resizer => {
                resizer.current.addEventListener('drag', handleResizeDrag)
            })
        }
    }, [])
    function handleResizeDrag(ev) {
        // console.log('ev:', ev)
        console.log('ev.offsetX:', ev.offsetX)
        console.log('ev.screenX:', ev.screenX)
        editorWrapper.current.style.width = `${window.innerWidth - Math.abs(ev.offsetX)}%`
        console.log('Dragging:')
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
