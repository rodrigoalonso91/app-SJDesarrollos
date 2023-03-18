import { Block } from "@web/domain/TransformXmlToNeighborhoods";
import { Coordinate } from "@web/domain/types/Coordinate";
import { Shape } from "react-konva";

export default function KonvaPreviewBlock({ lots }: Block) {
  return (
    <>
      {lots.map(({ coordinates, name }, i) => (
        <KonvaPreviewLot key={i} coordinates={coordinates} />
      ))}
    </>
  );
}

function KonvaPreviewLot({ coordinates }: { coordinates: Array<Coordinate> }) {

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        const [start, ...remaining] = coordinates;
        context.moveTo(start.x, start.y);
        remaining.forEach(({ x, y }) => context.lineTo(x, y));
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      fill="transparent"
      stroke="black"
      strokeWidth={0.35}
    />
  );
}
