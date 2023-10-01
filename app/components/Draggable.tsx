import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type DraggableProps = {
  id: string,
  children?: React.ReactNode,
}

export function Draggable(props: DraggableProps) {
  const { setNodeRef, setActivatorNodeRef, transform, attributes, listeners } = useDraggable({
    id: props.id,
  });

  return (
    <div
      ref={ setNodeRef }
      style={
        {
          backgroundColor: "white",
          broder: "1px sold black",
          transform: CSS.Translate.toString(transform),
        } as React.CSSProperties
      }
    >
      <div
        ref={ setActivatorNodeRef }
        style={
          {
            backgroundColor: "lightgray",
            cursor: "move",
          }
        }
        { ...listeners }
        { ...attributes }
      >
        &#8596;
      </div>
      { props.children }
    </div>
  );
}
