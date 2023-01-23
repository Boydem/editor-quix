import { Draggable, Droppable } from 'react-beautiful-dnd'
import { wapService } from '../../../../services/wap.service'

export function CmpFractions({ activeMenuItem }) {
    console.log(activeMenuItem)
    const assets = wapService.getCmpsByCategory(activeMenuItem.toLowerCase())
    return (
        <section className='quick-add'>
            <Droppable
                droppableId={activeMenuItem.toLowerCase()}
                renderClone={(provided, snapshot, rubric) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='drag-and-drop-portal'
                    >
                        <img src={assets[0].thumbnail} alt='ggggggggg'></img>
                    </div>
                )}
            >
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
