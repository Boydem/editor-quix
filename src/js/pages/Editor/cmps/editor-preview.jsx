import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect } from 'react'
import { utilService } from '../../../services/util.service'

export function EditorPreview({ wapCmps, selectedActionsRef }) {
    const editorResizerRef = [useRef(), useRef()]
    let resizingState = { isResizing: false, draggingResizer: null }
    const editorWrapper = useRef()
    useEffect(() => {
        addResizerEventListeners()
    }, [])

    function addResizerEventListeners() {
        document.addEventListener('mousemove', handleResizeDrag)
        editorResizerRef[0].current.addEventListener('mousedown', () => handleMouseDown('left'))
        editorResizerRef[1].current.addEventListener('mousedown', () => handleMouseDown('right'))
        document.addEventListener('mouseup', handleMouseUp)
    }

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
        const [leftResizerLeftProperty, rightResizerLeftProperty] = utilService.getLeftRightPropertiesForDrag(
            ev,
            resizingState
        )
        editorResizerRef[1].current.style.left = `${rightResizerLeftProperty}px`
        editorResizerRef[0].current.style.left = `${leftResizerLeftProperty}px`
        editorWrapper.current.style.width = `${rightResizerLeftProperty - leftResizerLeftProperty - 30}px`
    }
    return (
        <Droppable droppableId='editor-preview'>
            {provided => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        <div className='editor-resizer left' ref={editorResizerRef[0]}></div>
                        <div className='wrapper' ref={editorWrapper}>
                            {wapCmps.map((cmp, idx) => {
                                return (
                                    <Draggable key={idx} draggableId={idx.toString()} index={idx}>
                                        {provided => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <DynamicCmp cmp={cmp} selectedActionsRef={selectedActionsRef} />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                        <div className='editor-resizer right' ref={editorResizerRef[1]}></div>
                    </div>
                )
            }}
        </Droppable>
    )
}
