import dynamic from "next/dynamic";
import {useEffect, useState} from "react";


const Neighborhoods = dynamic(() => import("../../src/web/components/Neighborhood"), {
  ssr: false,
});

export default function NeighborhoodsScreen() {
  return <Neighborhoods/>
}