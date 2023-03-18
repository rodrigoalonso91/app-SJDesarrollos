import { BlockError, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import { useCallback } from "react";

export default function useBoundKonva({ setStageScale, setStageX, setStageY }: Props) {
  return useCallback(({neighborhood, errors = []}: { neighborhood: Neighborhood, errors: Array<BlockError>}) => {
    const boundaries = neighborhood.blocks
      .flatMap((block) => block.lots)
      .flatMap((lot) => lot.coordinates)
      .concat(errors.flatMap((error) => error.lines).flatMap((line) => line))
      .reduce(
        ({ minX, minY, maxX, maxY }, { x, y }) => ({
          minX: minX === null ? x : Math.min(minX, x),
          minY: minY === null ? y : Math.min(minY, y),
          maxX: maxX === null ? y : Math.max(maxX, y),
          maxY: maxY === null ? y : Math.max(maxY, y)
        }),
        { minX: null, minY: null, maxX: null, maxY: null } as
          | { minX: null; minY: null; maxX: null; maxY: null }
          | { minX: number; minY: number; maxX: number; maxY: number }
      );

    if (boundaries.minX === null) return;
    const height = boundaries.maxY - boundaries.minY;
    if (height > 0) {
      const scale = window.innerHeight / height;
      setStageScale(scale);
      setStageX(-boundaries.minX * scale);
      setStageY(-boundaries.minY * scale);
    }
  }, [])
}

type Props = {
  setStageScale: (value: number) => void
  setStageX: (value: number) => void
  setStageY: (value: number) => void
}