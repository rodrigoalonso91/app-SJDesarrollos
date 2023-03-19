import KonvaBlock from "@web/components/master/KonvaBlock";
import KonvaPreviewErrors from "@web/components/master/preview/KonvaPreviewErrors";
import { BlockError, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import useBoundKonva from "@web/hooks/useBoundKonva";
import useHandleKonvaWheel from "@web/hooks/useHandleKonvaWheel";
import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";

export default function KonvaPreviewMaster({ neighborhood, errors }: Props) {
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const handleWheel = useHandleKonvaWheel({ setStageScale, setStageY, setStageX });
  const boundKonva = useBoundKonva({ setStageScale, setStageY, setStageX });

  useEffect(() => {
    if (!neighborhood) return;
    boundKonva({neighborhood, errors})
  }, [neighborhood, errors, boundKonva]);

  return (
    <Stage
      width={window.innerWidth * 0.78}
      height={window.innerHeight * 0.8492}
      onWheel={handleWheel}
      scaleX={stageScale}
      scaleY={stageScale}
      x={stageX}
      y={stageY}
      draggable={true}
    >
      <Layer>
        {
          neighborhood &&
          neighborhood.blocks.map((block, i) => (
            <KonvaBlock key={i} {...block} block={i} />
          ))
        }
        {errors && <KonvaPreviewErrors errors={errors} />}
      </Layer>
    </Stage>
  );
}

type Props = {
  neighborhood: Neighborhood | null
  errors: Array<BlockError>
}
