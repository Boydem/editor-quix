import DynamicCmp from './dynamic-cmp'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

export function EditorPreview({ template }) {
    const [templateOrder, setTemplateOrder] = useState(template)

    function handleOnDragEnd(result) {
        const items = Array.from(templateOrder)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setTemplateOrder(items)
    }
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='template'>
                {provided => {
                    return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='full'>
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
                                                    <DynamicCmp cmp={fraction}></DynamicCmp>
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}
