import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect, useState } from 'react'
import { utilService } from '../../../services/util.service'
import { useSelector } from 'react-redux'
import { TiBrush } from 'react-icons/ti'
import { setElClickedNode } from '../../../store/wap/wap.action'

export function EditorPreview({ wapCmps, setRightSidebarState, rightSidebarState }) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const [elHoveredNode, setElHoveredNode] = useState(null)
    const editorWrapper = useRef()
    const selectedActionsRef = useRef()

    useEffect(() => {
        selectedActionsRef.current.style.display = 'none'
        if (!elClickedNode) return
        setTimeout(() => {
            selectedActionsRef.current.style.display = 'flex'
            selectedActionsRef.current.style.left = `${
                elClickedNode.getBoundingClientRect().x - editorWrapper.current.getBoundingClientRect().x
            }px`
            selectedActionsRef.current.style.top = `${
                elClickedNode.getBoundingClientRect().y - editorWrapper.current.getBoundingClientRect().y - 30
            }px`
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rightSidebarState.isOpen])

    function onClickEditPopup(ev) {
        elHoveredNode.classList.add('clicked')
        elHoveredNode.classList.remove('hover')
        setElClickedNode(elHoveredNode)
        setRightSidebarState(prev => ({ ...prev, isOpen: !prev.isOpen }))
        // selectedActionsRef.current.style.display = 'none'
        // setTimeout(() => {
        //     selectedActionsRef.current.style.display = 'flex'
        //     selectedActionsRef.current.style.left = `${
        //         elClickedNode.getBoundingClientRect().x - editorWrapper.current.getBoundingClientRect().x - 16
        //     }px`
        //     selectedActionsRef.current.style.top = `${
        //         elClickedNode.getBoundingClientRect().y - editorWrapper.current.getBoundingClientRect().y - 45
        //     }px`
        // }, 500)
    }

    function onHoverEditPopup(ev) {
        elHoveredNode.classList.add('hover')
        selectedActionsRef.current.style.display = 'flex'
    }
    function ohLeaveHoverEditPopup(ev) {
        elHoveredNode.classList.remove('hover')
    }
    return (
        <Droppable droppableId='editor-preview'>
            {provided => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        <div className='wrapper templates-css-reset' ref={editorWrapper}>
                            <div
                                className={`selected-actions ${rightSidebarState.isOpen ? 'hidden' : ''}`}
                                ref={selectedActionsRef}
                                onClick={onClickEditPopup}
                                onMouseEnter={onHoverEditPopup}
                                onMouseLeave={ohLeaveHoverEditPopup}
                            >
                                <div className='mini-wrapper'>
                                    <TiBrush />
                                </div>
                            </div>
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
                                                    <DynamicCmp
                                                        cmp={cmp}
                                                        selectedActionsRef={selectedActionsRef}
                                                        setElHoveredNode={setElHoveredNode}
                                                    />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    </div>
                )
            }}
        </Droppable>
    )
}
