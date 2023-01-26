import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setClickedCmp, setElClickedNode } from '../../../store/wap/wap.action'

export function EditorPreview({ wapCmps, setRightSidebarState, rightSidebarState, layout, handleSidebarsChanges }) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    const editorWrapper = useRef()

    useEffect(() => {
        setEditorWrapperLayout()
        console.log('test')
    }, [layout])

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
        handleSidebarsChanges('left', { isOpen: false })
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
                    <div {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        <div className='wrapper templates-css-reset' ref={editorWrapper}>
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
                    </div>
                )
            }}
        </Droppable>
    )
}
