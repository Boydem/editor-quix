import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect, useState } from 'react'
import { utilService } from '../../../services/util.service'
import { useSelector } from 'react-redux'
import { TiBrush } from 'react-icons/ti'
import { setClickedCmp, setElClickedNode } from '../../../store/wap/wap.action'

export function EditorPreview({ wapCmps, setRightSidebarState, rightSidebarState, layout, handleSidebarsChanges }) {
    // const editorResizerRef = [useRef(), useRef()]
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const [elHoveredNode, setElHoveredNode] = useState(null)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
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

    useEffect(() => {
        setEditorWrapperLayout()
    }, [layout])

    function setEditorWrapperLayout() {
        editorWrapper.current.style.maxWidth =
            layout.layoutClass === 'desktopLayout' ? 'revert' : `${layout.width - 10}px`
        editorWrapper.current.classList.toggle('mobile-layout', layout.layoutClass === 'mobileLayout')
        editorWrapper.current.classList.toggle('tablet-layout', layout.layoutClass === 'mobileLayout')
        editorWrapper.current.classList.toggle(
            'tablet-layout',
            layout.layoutClass === 'tabletLayout' || layout.layoutClass === 'mobileLayout'
        )
        editorWrapper.current.classList.toggle('desktop-layout', layout.layoutClass === 'desktopLayout')
    }

    //     editorWrapper.current.classList.toggle('mobile-layout', editorSize < wap.breakpoints.mobileLayout)
    //     editorWrapper.current.classList.toggle('tablet-layout', editorSize < wap.breakpoints.tabletLayout)
    function onClickEditPopup(ev) {
        elHoveredNode.classList.add('clicked')
        elHoveredNode.classList.remove('hover')
        setElClickedNode(elHoveredNode)
        handleSidebarsChanges('right', { isOpen: true })
        // setRightSidebarState(prev => ({ ...prev, isOpen: !prev.isOpen }))
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

    function onSelectCmp(ev, cmp) {
        handleSidebarsChanges('left', { isOpen: false, currModule: null })
        ev.stopPropagation()
        if (!ev.target.type) ev.preventDefault()

        if (!isEditing) return
        if (elClickedNode === ev.target) return

        if (elClickedNode) {
            elClickedNode.classList.remove('clicked')
        }
        ev.target.classList.add('clicked')
        setElClickedNode(ev.target)
        setClickedCmp(cmp)
    }

    function onHoverCmp(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!isEditing) return

        selectedActionsRef.current.style.top = `${ev.target.offsetTop - 45}px`
        selectedActionsRef.current.style.left = `${ev.target.offsetLeft - 16}px`
        selectedActionsRef.current.style.display = 'flex'

        ev.currentTarget.classList.add('hover')
        setElHoveredNode(ev.currentTarget)
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
                                                        onHoverCmp={onHoverCmp}
                                                        onSelectCmp={onSelectCmp}
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
