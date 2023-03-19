import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "@emotion/styled";
import updateNeighborhoodInDb from "@web/api_calls/neighborhood/updateNeighborhoodInDb";
import { useSnackbar } from "@web/hooks";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getNeighborhoodById } from "@server/domain/neighborhood/GetNeighborhoodById";
import getUser from "@server/infrastructure/GetUser";
import { CustomSnackbar } from "@web/components";
import BlockInputs from "@web/components/master/BlockInputs";
import MasterContext, { SelectedLot } from "@web/components/master/MasterContext";
import useNeighborhood from "@web/components/master/UseNeighborhood";
import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import usePreventBodyScroll from "@web/hooks/usePreventBodyScroll";
import { NextApiRequest, NextApiResponse } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";

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
  const { openSnackbar, isSnackbarOpen, closeSnackbar } = useSnackbar();

  usePreventBodyScroll();

  return (
    <MasterContext.Provider
      value={{
        selected,
        setSelected,
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
          <Paper elevation={3}>
            <KonvaMaster />
          </Paper>

          <Paper elevation={3}>
            <BlockInputsContainer>
              <h1>{neighborhood.name}</h1>
              <Form>
                <BlockInputs />

                <UploadContainer>
                  <Button
                    variant="contained"
                    sx={{ gap: 1 }}
                    onClick={async () => {
                      await updateNeighborhoodInDb(neighborhood)
                      openSnackbar()
                    }}
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;