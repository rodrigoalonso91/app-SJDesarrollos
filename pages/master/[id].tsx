import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "@emotion/styled";
import { getCustomers } from "@server/domain/customers/GetCustomers";
import { getSalesmen } from "@server/domain/salesmen/GetSalesmen";
import updateNeighborhoodInDb from "@web/api_calls/neighborhood/updateNeighborhoodInDb";
import { useSnackbar } from "@web/hooks";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getNeighborhoodById } from "@server/domain/neighborhood/GetNeighborhoodById";
import getUser from "@server/infrastructure/GetUser";
import { CustomSnackbar } from "@web/components";
import BlockInputs from "@web/components/master/BlockInputs";
import MasterContext, { BasicAdministrator, BasicPerson, SelectedLot, Terrain } from "@web/components/master/MasterContext";
import useNeighborhood from "@web/components/master/UseNeighborhood";
import { Block, Lot, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import usePreventBodyScroll from "@web/hooks/usePreventBodyScroll";
import { NextApiRequest, NextApiResponse } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { getAdministrators } from "@server/domain/administrators/GetAdministrators";

// NOTE: Renderiza con lazy loading en el lado del cliente.

const KonvaMaster = dynamic(
  () => import("@web/components/master/KonvaMaster"),
  { ssr: false }
);

interface Props {
  neighborhood: Neighborhood,
  salesmen: Array<BasicPerson>,
  customers: Array<BasicPerson>,
  administrators: Array<BasicAdministrator>
}

export default function NeighborhoodsScreen({
  neighborhood: initial,
  salesmen,
  customers,
  administrators
}: Props ) {

  const {
    neighborhood,
    changeBlockName,
    changeLotName,
    changeLotPrice,
    changeLotStatus,
    changeLotSalesman,
    changeLotCustomer,
    changeLotCoCustomer,
    changeLotAdministrator,
    hasChanged,
    setHasChanged
  } = useNeighborhood(initial);

  const [ selected, setSelected ] = useState<SelectedLot | null>(null);
  const [ remaining, setRemaining ] = useState<Remaining>(DEFAULT_REMAINING);
  const [ highlighted, setHighlighted ] = useState<Array<Terrain>>([]);
  const { openSnackbar, isSnackbarOpen, closeSnackbar } = useSnackbar();

  usePreventBodyScroll();

  useEffect(() => {
    const blocks = neighborhood.blocks;
    const flattenedLots = blocks.flatMap(block => block.lots);
    const lots = blocks.map(block => block.lots);
    const remaining = {
      repeatedBlocks: blocks.filter(hasRepeatedName),
      repeatedLots: lots.flatMap(x => x.filter(hasRepeatedName)),
      unnamedBlocks: blocks.filter(block => block.name === null),
      unnamedLots: flattenedLots.filter(lot => lot.name === null)
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
        changeLotCustomer,
        changeLotCoCustomer,
        changeLotAdministrator,
        salesmen,
        customers,
        administrators
      }}
    >

      <CustomSnackbar 
        message="Guardado con exíto"
        open={isSnackbarOpen}
        handleClose={closeSnackbar}
      />

      <Box sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
      >
        <KonvaContainer>
          <Paper elevation={8} style={{ overflow: "hidden" }}>
            <KonvaMaster />
          </Paper>

          <Paper elevation={8}>
            <BlockInputsContainer>
              <DetailsContainer>
                <h2>{neighborhood.name}</h2>
                {remaining.unnamedBlocks.length > 0 &&
                  <Info
                    onMouseEnter={() => setHighlighted(remaining.unnamedBlocks)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Restan nombrar ${remaining.unnamedBlocks.length} manzanas`}
                  </Info>
                }
                {remaining.unnamedLots.length > 0 &&
                  <Info
                    onMouseEnter={() => setHighlighted(remaining.unnamedLots)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Restan nombrar ${remaining.unnamedLots.length} lotes`}
                  </Info>
                }
                {remaining.repeatedBlocks.length > 0 &&
                  <Error
                    onMouseEnter={() => setHighlighted(remaining.repeatedBlocks)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Hay ${remaining.repeatedBlocks.length} manzanas con el mismo nombre`}
                  </Error>
                }
                {remaining.repeatedLots.length > 0 &&
                  <Error
                    onMouseEnter={() => setHighlighted(remaining.repeatedLots)}
                    onMouseLeave={() => setHighlighted([])}
                  >
                    {`Hay ${remaining.repeatedLots.length} lotes con el mismo nombre`}
                  </Error>
                }
              </DetailsContainer>
              <Form>
                <BlockInputs />
                <UploadContainer>
                  {hasChanged && <StaticInfo>Hay cambios sin guardar</StaticInfo>}
                  <Button
                    variant="contained"
                    sx={{ gap: 1 }}
                    onClick={async () => {
                      await updateNeighborhoodInDb(neighborhood);
                      setHasChanged(false)
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

    const [user, neighborhood, customers, salesmen, administrators ] = await Promise.all([
      getUser({ res: res as NextApiResponse, req: req as NextApiRequest }),
      getNeighborhoodById(params!.id as string),
      getCustomers(),
      getSalesmen(),
      getAdministrators()
    ]);

    if (!user.isAdmin) return { notFound: true };
    if (!neighborhood) return { notFound: true };
    return {
      props: {
        neighborhood,
        customers: customers.map(x => ({ id: x.id, fullname: `${x.firstname} ${x.lastname}` })),
        salesmen: salesmen.map(x => ({ id: x.id, fullname: `${x.firstname} ${x.lastname}` })),
        administrators : administrators.map(x => ({ id: x.id, fullname: `${x.firstname} ${x.lastname}`, color: x.color}))
      }
    };
  }
});

const BlockInputsContainer = styled.div`
  width: 31.9vw;
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
  gap: 8px;

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

const StaticInfo = styled.span`
  color: blue;
  user-select: none;
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
