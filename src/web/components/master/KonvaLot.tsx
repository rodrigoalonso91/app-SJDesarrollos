import MasterContext from "@web/components/master/MasterContext";
import { Coordinate } from "@web/domain/types/Coordinate";
import { first } from "@web/domain/utils/LineUtils";
import React, { useContext, useRef, useState } from "react";
import { Shape, Text } from "react-konva";

export default function KonvaLot({
  name,
  coordinates,
  block,
  lot,
  highlight
}: {
  name: string
  block: number
  lot: number
  coordinates: Array<Coordinate>,
  highlight: boolean
}) {
  
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<any>(null);
  const [center] = useState(() => centerOf(coordinates))
  const [textCoordinates, setTextCoordinates] = useState(center);

  const { setSelected, selected } = useContext(MasterContext);

  React.useEffect(() => {
    const width = textRef.current?.width();
    const height = textRef.current?.height();
    setTextCoordinates({ x: center.x - width / 2, y: center.y - height / 2 });
  }, [name, center.x, center.y]);

  let color = "transparent";
  if (highlight) color = "red"
  else if (lot === selected?.lot && block === selected?.block) color = hovered ? "#64D8C7" : "#1ea191";
  else if (block === selected?.block) color = hovered ? "#C3FCF1" : "#F380F0";
  else if (hovered) color = "#FFE6FF";

  return (
    <>
      <Shape
        onClick={() => setSelected({ block, lot })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sceneFunc={(context, shape) => {
          context.beginPath();
          const [start, ...remaining] = coordinates;
          context.moveTo(start.x, start.y);
          remaining.forEach(({ x, y }) => context.lineTo(x, y));
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        fill={color}
        stroke="black"
        strokeWidth={0.35}
      />
      <Text x={textCoordinates.x} y={textCoordinates.y} text={name} fontSize={2.8} ref={textRef} />
    </>
  );
}

function centerOf(coordinates: Array<Coordinate>): Coordinate {
  const boundaries = coordinates.reduce(
    (boundaries, coordinate) => ({
      minX: boundaries.minX > coordinate.x ? coordinate.x : boundaries.minX,
      maxX: boundaries.maxX < coordinate.x ? coordinate.x : boundaries.maxX,
      minY: boundaries.minY > coordinate.y ? coordinate.y : boundaries.minY,
      maxY: boundaries.maxY < coordinate.y ? coordinate.y : boundaries.maxY
    }),
    defaultBoundary(first(coordinates))
  );
  return {
    x: (boundaries.minX + boundaries.maxX) / 2,
    y: (boundaries.minY + boundaries.maxY) / 2
  };
}

const defaultBoundary = ({ x, y }: Coordinate) => ({
  minX: x,
  maxX: x,
  minY: y,
  maxY: y
});
