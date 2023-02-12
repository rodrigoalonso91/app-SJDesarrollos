import dynamic from "next/dynamic";
import useUserData from "../../src/hooks/UseUserData";
import { Navbar } from "../../src/web/components";


const Neighborhoods = dynamic(() => import("../../src/web/components/Neighborhood"), {
  ssr: false,
});

export default function NeighborhoodsScreen() {

  const user = useUserData()
  
  return (
    <>
      <Navbar nickname={user.nickname}/>
      <Neighborhoods/>
    </>
  )
}