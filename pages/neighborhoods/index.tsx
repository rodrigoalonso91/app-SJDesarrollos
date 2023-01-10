import dynamic from "next/dynamic";
import {useEffect, useState} from "react";


const Neighborhoods = dynamic(() => import("../../src/web/components/Neighborhood"), {
  ssr: false,
});

export default function NeighborhoodsScreen() {
  const [fome, setFome] = useState<any>([])
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/wea", {method: "GET"})
      setFome(await result.json())
    })()
  }, [])

  return <Neighborhoods perimeter={fome[0]}/>
}