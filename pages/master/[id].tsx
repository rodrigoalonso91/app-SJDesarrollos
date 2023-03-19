import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "@emotion/styled";
import updateNeighborhoodInDb from "@web/api_calls/neighborhood/updateNeighborhoodInDb";
import { Coordinate } from "@web/domain/types/Coordinate";
import { useSnackbar } from "@web/hooks";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getNeighborhoodById } from "@server/domain/neighborhood/GetNeighborhoodById";
import getUser from "@server/infrastructure/GetUser";
import { CustomSnackbar } from "@web/components";
import BlockInputs from "@web/components/master/BlockInputs";
import MasterContext, { SelectedLot, Terrain } from "@web/components/master/MasterContext";
import useNeighborhood from "@web/components/master/UseNeighborhood";
import { Block, Lot, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import usePreventBodyScroll from "@web/hooks/usePreventBodyScroll";
import { NextApiRequest, NextApiResponse } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const KonvaMaster = dynamic(
  () => import("@web/components/master/KonvaMaster"),
  { ssr: false }
);

export default function NeighborhoodsScreen({ neighborhood: initial }: { neighborhood: Neighborhood }) {
  const {
    neighborhood,
    changeBlockName,
    changeLotName,
    changeLotPrice,
    changeLotStatus,
    changeLotSalesman,
    changeLotCustomer
  } = useNeighborhood(initial);
  const [selected, setSelected] = useState<SelectedLot | null>(null);
  const [remaining, setRemaining] = useState<Remaining>(DEFAULT_REMAINING);
  const [highlighted, setHighlighted] = useState<Array<Terrain>>([]);
  const { openSnackbar, isSnackbarOpen, closeSnackbar } = useSnackbar();

  usePreventBodyScroll();

  useEffect(() => {
    const blocks = neighborhood.blocks;
    const lots = blocks.flatMap(block => block.lots);
    const remaining = {
      repeatedBlocks: blocks.filter(hasRepeatedName),
      repeatedLots: lots.filter(hasRepeatedName),
      unnamedBlocks: blocks.filter(block => block.name === null),
      unnamedLots: lots.filter(lot => lot.name === null)
    };
    setRemaining(remaining);
  }, [neighborhood]);

  return (
    <MasterContext.Provider
      value={{
        selected,
        setSelected,
        highlighted,
        setHighlighted,
        neighborhood,
        changeBlockName,
        changeLotName,
        changeLotPrice,
        changeLotStatus,
        changeLotSalesman,
        changeLotCustomer
      }}
    >

      <CustomSnackbar message="Guardado con exíto" open={isSnackbarOpen} handleClose={closeSnackbar} />

      <Box sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
      >
        <KonvaContainer>
          <Paper elevation={3} style={{overflow: "hidden"}}>
            <KonvaMaster />
          </Paper>

          <Paper elevation={3}>
            <BlockInputsContainer>
              <DetailsContainer>
                <h1>{neighborhood.name}</h1>
                {remaining.unnamedBlocks.length > 0 &&
                  <Info
                    onMouseEnter={() => setHighlighted(remaining.unnamedBlocks)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Restan nombrar ${remaining.unnamedBlocks.length} manzanas`}
                  </Info>}
                {remaining.unnamedLots.length > 0 &&
                  <Info
                    onMouseEnter={() => setHighlighted(remaining.unnamedLots)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Restan nombrar ${remaining.unnamedLots.length} lotes`}
                  </Info>}
                {remaining.repeatedBlocks.length > 0 &&
                  <Error
                    onMouseEnter={() => setHighlighted(remaining.repeatedBlocks)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Hay ${remaining.repeatedBlocks.length} manzanas con el mismo nombre`}
                  </Error>}
                {remaining.repeatedLots.length > 0 &&
                  <Error
                    onMouseEnter={() => setHighlighted(remaining.repeatedLots)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Hay ${remaining.repeatedLots.length} lotes con el mismo nombre`}
                  </Error>}
              </DetailsContainer>
              <Form>
                <BlockInputs />
                <UploadContainer>
                  <Button
                    variant="contained"
                    sx={{ gap: 1 }}
                    onClick={async () => {
                      await updateNeighborhoodInDb(neighborhood);
                      openSnackbar();
                    }}
                    disabled={
                      remaining.repeatedBlocks.length > 0 ||
                      remaining.repeatedLots.length > 0
                    }
                  >
                    <SaveIcon />
                    Guardar
                  </Button>
                </UploadContainer>
              </Form>
            </BlockInputsContainer>
          </Paper>
        </KonvaContainer>
      </Box>
    </MasterContext.Provider>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ res, req, params }) => {
    const user = await getUser({ res: res as NextApiResponse, req: req as NextApiRequest });
    if (!user.isAdmin) return { notFound: true };

    const neighborhood = await getNeighborhoodById(params!.id as string);
    if (!neighborhood) return { notFound: true };

    return { props: { neighborhood } };
  }
});

const BlockInputsContainer = styled.div`
  width: 18.9vw;
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr auto;

  gap: 15px;
  padding: 15px;
`;

const KonvaContainer = styled.div`
  display: flex;
  gap: 20px;
  max-height: 83.5vh;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: flex-end;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.span`
  color: blue;
  user-select: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Error = styled.span`
  color: red;
  user-select: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

function hasRepeatedName<T extends Terrain>(itemA: T, i: number, items: Array<T>): boolean {
  return itemA.name !== null && items.some((itemB, j) => i !== j && itemA.name === itemB.name);
}

const DEFAULT_REMAINING = {
  repeatedBlocks: [],
  repeatedLots: [],
  unnamedBlocks: [],
  unnamedLots: []
};

type Remaining = {
  repeatedBlocks: Array<Block>,
  repeatedLots: Array<Lot>,
  unnamedBlocks: Array<Block>,
  unnamedLots: Array<Lot>
};
