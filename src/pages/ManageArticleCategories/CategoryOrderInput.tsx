import useCustomComponent from 'hooks/useCustomComponent'
import { CSSProperties, ReactElement, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DroppableProps,
  DropResult,
  NotDraggingStyle
} from 'react-beautiful-dnd'

export type CategoryItem = { id: number } & { [k: string]: any }

// a little function to help us with reordering the result
const reorder = (list: CategoryItem[], startIndex: number, endIndex: number): CategoryItem[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean): CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])
  if (!enabled) {
    return null
  }
  return <Droppable {...props}>{children}</Droppable>
}

type CategoryOrderInputProps = {
  value?: CategoryItem[]
  defaultValue?: CategoryItem[]
  onChange?: (val: CategoryItem[]) => void
}
export default function CategoryOrderInput ({ value, defaultValue = [], onChange }: CategoryOrderInputProps) {
  const [computedValue, triggerChangeValue] = useCustomComponent({ value, defaultValue, onChange })

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    const reordered = reorder(
      computedValue || [],
      result.source.index,
      result.destination.index
    )

    triggerChangeValue(reordered)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="droppable">
        {(provided, snapshot): ReactElement => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {(computedValue || []).map((item, index) => (
              <Draggable key={`${item.id}`} draggableId={`${item.id}`} index={index}>
                {(provided, snapshot): ReactElement => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}
