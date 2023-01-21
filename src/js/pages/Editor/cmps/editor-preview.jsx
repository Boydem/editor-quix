import DynamicCmp from './dynamic-cmp'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef, useEffect } from 'react'
import { utilService } from '../../../services/util.service'
import { useSelector } from 'react-redux'
import { TiBrush } from 'react-icons/ti'

export function EditorPreview({ wapCmps, setRightSidebarState, rightSidebarState }) {
    // const editorResizerRef = [useRef(), useRef()]
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const wap = useSelector(storeState => storeState.wapModule.wap)
    let resizingState = { isResizing: false, draggingResizer: null }
    const editorWrapper = useRef()
    const selectedActionsRef = useRef()

    // useEffect(() => {
    // addResizerEventListeners()

    // return () => {
    //     removeResizerEventListeners()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // function removeResizerEventListeners() {
    // document.removeEventListener('mousemove', handleResizeDrag)
    // editorResizerRef[0].current.removeEventListener('mousedown', () => handleMouseDown('left'))
    // editorResizerRef[1].current.removeEventListener('mousedown', () => handleMouseDown('right'))
    // document.removeEventListener('mouseup', handleMouseUp)
    // }

    // function addResizerEventListeners() {
    //     document.addEventListener('mousemove', handleResizeDrag)
    //     editorResizerRef[0].current.addEventListener('mousedown', () => handleMouseDown('left'))
    //     editorResizerRef[1].current.addEventListener('mousedown', () => handleMouseDown('right'))
    //     document.addEventListener('mouseup', handleMouseUp)
    // editorWrapper.current.addEventListener('resize', () => {
    //     console.log('YEES')
    // })
    // new ResizeObserver(onEditorWrapperResize).observe(editorWrapper.current)
    // document.addEventListener('resize', onEditorWrapperResize)
    // const observer = new MutationObserver(onEditorWrapperResize)
    // const config = { attributes: true, attributeFilter: ['style'] }
    // observer.observe(editorWrapper.current, config)
    // }
    // setInterval(() => {
    //     console.log(editorWrapper.current.getBoundingClientRect().x)
    // }, 1000)

    // function onEditorWrapperResize(ev) {
    // console.log(window.getComputedStyle(editorWrapper.current))
    // }
    // useEffect(() => {
    //     setTimeout(() => {
    //         // const editorWrapperX = editorWrapper.current.getBoundingClientRect().x
    //         // const editorWrapperWidth = editorWrapper.current.style.width
    //         // console.log(editorWrapper.current.getBoundingClientRect().x)
    //         // console.log('BEFORE', editorResizerRef[0].current.style.left)
    //         // editorResizerRef[0].current.style.left = `${editorWrapperX - 10}px`
    //         // editorResizerRef[1].current.style.left = `${editorWrapperX + parseInt(editorWrapperWidth) + 10}px`
    //         // console.log(editorResizerRef[1].current.style.left)
    //         // console.log('HISHUV', editorWrapperX)
    //         // console.log('AFTER', editorResizerRef[0].current.style.left)
    //         // console.log(editorWrapper.current.style.width)
    //     }, 500)
    // }, [rightSidebarState])

    // function handleMouseDown(dir) {
    //     resizingState.isResizing = true
    //     if (dir === 'left') {
    //         resizingState.draggingResizer = 'left'
    //     } else {
    //         resizingState.draggingResizer = 'right'
    //     }
    // }
    // function handleMouseUp() {
    //     resizingState.isResizing = false
    // }
    // function handleResizeDrag(ev) {
    //     if (!resizingState.isResizing) return
    //     const [leftResizerLeftProperty, rightResizerLeftProperty] = utilService.getLeftRightPropertiesForDrag(
    //         ev,
    //         resizingState
    //     )
    //     editorResizerRef[1].current.style.left = `${rightResizerLeftProperty}px`
    //     editorResizerRef[0].current.style.left = `${leftResizerLeftProperty}px`
    //     editorWrapper.current.style.width = `${rightResizerLeftProperty - leftResizerLeftProperty - 30}px`
    //     const editorSize = rightResizerLeftProperty - leftResizerLeftProperty - 30

    //     editorWrapper.current.classList.toggle('mobile-layout', editorSize < wap.breakpoints.mobileLayout)
    //     editorWrapper.current.classList.toggle('tablet-layout', editorSize < wap.breakpoints.tabletLayout)
    // }

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

    function onEditPopup(ev) {
        setRightSidebarState(prev => ({ ...prev, isOpen: !prev.isOpen }))
        selectedActionsRef.current.style.display = 'none'
        setTimeout(() => {
            selectedActionsRef.current.style.display = 'flex'
            selectedActionsRef.current.style.left = `${
                elClickedNode.getBoundingClientRect().x - editorWrapper.current.getBoundingClientRect().x
            }px`
            selectedActionsRef.current.style.top = `${
                elClickedNode.getBoundingClientRect().y - editorWrapper.current.getBoundingClientRect().y - 30
            }px`
        }, 500)
    }
    return (
        <Droppable droppableId='editor-preview'>
            {provided => {
                return (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='editor-preview full'>
                        {/* <div className='editor-resizer left' ref={editorResizerRef[0]}></div> */}
                        <div className='wrapper templates-css-reset' ref={editorWrapper}>
                            <div
                                className={`selected-actions ${
                                    !elClickedNode || rightSidebarState.isOpen ? 'hidden' : ''
                                }`}
                                ref={selectedActionsRef}
                                onClick={onEditPopup}
                            >
                                <TiBrush />
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
                                                    <DynamicCmp cmp={cmp} selectedActionsRef={selectedActionsRef} />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                        {/* <div className='editor-resizer right' ref={editorResizerRef[1]}></div> */}
                    </div>
                )
            }}
        </Droppable>
    )
}
