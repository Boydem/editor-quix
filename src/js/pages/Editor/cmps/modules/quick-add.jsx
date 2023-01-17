import { Draggable, Droppable } from 'react-beautiful-dnd'
import { wap1Hero } from '../../../../wap-templates/wap-template-1/wap-1-hero'
import wap2Hero from '../../../../wap-templates/wap-template-2/wap-2-hero.json'
export function QuickAdd() {
    const assets = [wap1Hero, wap2Hero]
    return (
        <section className='quick-add'>
            <Droppable droppableId='assets'>
                {provided => {
                    return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='full'>
                            {assets.map((asset, idx) => {
                                return (
                                    <Draggable draggableId={asset.id.toString()} index={idx} key={asset.id}>
                                        {provided => {
                                            return (
                                                <img
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    alt='nothing'
                                                    src={asset.thumbnail}
                                                />
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
        </section>
    )
}
