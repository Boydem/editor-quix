import { Draggable, Droppable } from 'react-beautiful-dnd'
import { wapService } from '../../../../services/wap.service'

export function CmpFractions({ activeMenuItem }) {
    const assets = wapService.getCmpsByCategory(activeMenuItem.toLowerCase())
    return (
        <section className='quick-add'>
            <Droppable droppableId={activeMenuItem.toLowerCase()}>
                {provided => {
                    return (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='full'>
                            {assets?.map((asset, idx) => {
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
