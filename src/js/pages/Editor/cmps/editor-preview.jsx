import DynamicCmp from './dynamic-cmp'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function EditorPreview({ templateOrder }) {
    return (
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
                                                <DynamicCmp cmp={fraction} />
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
    )
}
