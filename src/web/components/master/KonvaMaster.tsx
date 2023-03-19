import KonvaBlock from "@web/components/master/KonvaBlock";
import MasterContext from "@web/components/master/MasterContext";
import useBoundKonva from "@web/hooks/useBoundKonva";
import useHandleKonvaWheel from "@web/hooks/useHandleKonvaWheel";
import React, { useContext, useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";

export default function KonvaMaster() {
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const handleWheel = useHandleKonvaWheel({ setStageScale, setStageY, setStageX });
  const boundKonva = useBoundKonva({ setStageScale, setStageY, setStageX });
  const {neighborhood, highlighted} = useContext(MasterContext)

  useEffect(() => {
    boundKonva({neighborhood, errors: []})
  }, []);

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
          neighborhood.blocks.map((block, i) => (
            <KonvaBlock key={i} {...block} block={i} highlight={highlighted.includes(block)}/>
          ))
        }
      </Layer>
    </Stage>
  );
}
