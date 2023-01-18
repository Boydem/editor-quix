import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect } from 'react'

export function EditorPreview({ templateOrder }) {
    const editorResizerRef = [useRef(), useRef()]
    let resizingState = { isResizing: false, draggingResizer: null }
    const editorWrapper = useRef()
    useEffect(() => {
        if (editorResizerRef) {
            document.addEventListener('mousemove', handleResizeDrag)
            document.addEventListener('mousemove', handleResizeDrag)

            editorResizerRef[0].current.addEventListener('mousedown', () => handleMouseDown('left'))
            editorResizerRef[1].current.addEventListener('mousedown', () => handleMouseDown('right'))

            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('mouseup', handleMouseUp)
        }
    }, [])

    function handleMouseDown(dir) {
        resizingState.isResizing = true
        if (dir === 'left') {
            resizingState.draggingResizer = 'left'
        } else {
            resizingState.draggingResizer = 'right'
        }
    }
    function handleMouseUp() {
        resizingState.isResizing = false
    }
    function handleResizeDrag(ev) {
        if (!resizingState.isResizing) return

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 25
        let leftLeft
        let rightLeft
        if (resizingState.draggingResizer === 'left') {
            leftLeft = ev.clientX + 5
            rightLeft = vw - ev.clientX - 15
        }
        if (resizingState.draggingResizer === 'right') {
            leftLeft = vw - ev.clientX + 5
            rightLeft = ev.clientX - 15
        }

        // leftLeft = Math.max(leftLeft, 150)
        leftLeft = Math.min(leftLeft, vw / 2 - 200)
        rightLeft = Math.max(rightLeft, vw / 2 + 200)
        editorResizerRef[1].current.style.left = `${rightLeft}px`
        editorResizerRef[0].current.style.left = `${leftLeft}px`
        editorWrapper.current.style.width = `${rightLeft - leftLeft - 30}px`
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
