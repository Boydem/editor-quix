import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setClickedCmp, setElClickedNode } from '../../../store/wap/wap.action'

export function EditorPreview({ wapCmps, rightSidebarState, layout, handleSidebarsChanges, leftSidebarState }) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    const editorWrapper = useRef()

    useEffect(() => {
        setEditorWrapperLayout()
    }, [layout])

    useEffect(() => {
        const elChat = document.querySelector('.chat-1')
        const elChatCmp = document.querySelector('.chat')
        if (elChat && elChatCmp) {
            setTimeout(() => {
                const rect = editorWrapper.current.getBoundingClientRect()
                elChat.style.left = `${rect.right - 75}px`
                elChatCmp.style.left = `${rect.right - 400}px`
            }, 500)
        }
    }, [rightSidebarState, leftSidebarState])

    function setEditorWrapperLayout() {
        editorWrapper.current.style.maxWidth = layout.layoutClass === 'desktopLayout' ? '100%' : `${layout.width}px`
        editorWrapper.current.classList.toggle('mobile-layout', layout.layoutClass === 'mobileLayout')
        editorWrapper.current.classList.toggle('tablet-layout', layout.layoutClass === 'mobileLayout')
        editorWrapper.current.classList.toggle(
            'tablet-layout',
            layout.layoutClass === 'tabletLayout' || layout.layoutClass === 'mobileLayout'
        )
        editorWrapper.current.classList.toggle('desktop-layout', layout.layoutClass === 'desktopLayout')
    }

    function onSelectCmp(ev, cmp) {
        if (leftSidebarState.isOpen) {
            handleSidebarsChanges('left', { isOpen: false })
        }
        ev.stopPropagation()
        if (!ev.target.type) ev.preventDefault()

        if (!isEditing) return
        if (elClickedNode === ev.target) return

        if (elClickedNode) {
            elClickedNode.classList.remove('clicked')
        }
        handleSidebarsChanges('right', { isOpen: true })
        ev.target.classList.add('clicked')
        setElClickedNode(ev.target)
        setClickedCmp(cmp)
    }

    function onHoverCmp(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!isEditing) return

        ev.currentTarget.classList.add('hover')
    }

    return (
        <Droppable droppableId='editor-preview'>
            {provided => {
                return (
                    <main {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        <div className='editor-wrapper templates-css-reset' ref={editorWrapper}>
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
                    </main>
                )
            }}
        </Droppable>
    )
}
