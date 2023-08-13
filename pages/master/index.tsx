import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from "@mui/material/TextField";
import getNeighborhoodNames from "@web/api_calls/neighborhood/getNeighborhoodNames";
import transformXmlToNeighborhoods, { BlockError, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import usePreventBodyScroll from "@web/hooks/usePreventBodyScroll";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Select } from "@web/components/layout/Select";
import addNeighborhood from "@web/api_calls/neighborhood/addNeighborhood";
import getUser from "@server/infrastructure/GetUser";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Image from "next/image";
import resources from "../../config/resources.json"
import { useBackDrop } from "@web/hooks";

const KonvaMasterPreview = dynamic(
  () => import("@web/components/master/preview/KonvaPreviewMaster"),
  { ssr: false }
);

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({ res, req }: any) => {

		const user = await getUser({ res, req })
		if (!user.isAdmin) return { notFound: true }

    return { props: {} } as any
	}
})

export default function NeighborhoodsScreen() {

  const { isOpen, openBackDrop } = useBackDrop();
  const router = useRouter();
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [errors, setErrors] = useState<Array<BlockError>>([]);
  const [neighborhoodList, setNeighborhoodList] = useState<Array<{ name: string }>>([]);

  usePreventBodyScroll();

  useEffect(() => {
    (async () => {
      const neighborhoodList = await getNeighborhoodNames();
      setNeighborhoodList(neighborhoodList);
    })();
  }, []);

  async function onFileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const xml = await encode(file);

    const { neighborhood, errors } = transformXmlToNeighborhoods(xml);
    setNeighborhood(neighborhood);
    setErrors(errors);
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  }

  const hasErrors = errors.length > 0;
  const hasExistingName = neighborhoodList.some(x => x.name === text);

  return (
    <>
      <Backdrop style={{ zIndex: 100 }} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
      >
        <KonvaContainer>
          <Paper elevation={8} sx={{ overflow: "hidden", position: "relative" }}>
            <KonvaMasterPreview neighborhood={neighborhood} errors={errors} />
            {neighborhood === null &&
            <Instructions>
              {
                resources.instructions.map((instruction) => (
                  <div key={instruction.title}>
                    <h2>{instruction.title}</h2>
                    <ol>
                      {instruction.steps.map((step, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                      ))}
                    </ol>
                  </div>
                ))
              }
              <h3>{resources.images[0].title}</h3>
              <Image
                src={resources.images[0].src}
                alt={resources.images[0].title}
                style={resources.images[0].style}
                width={resources.images[0].width}
                height={resources.images[0].height}
                priority={resources.images[0].priority}
              />
            </Instructions>
            }
          </Paper>


          <Paper elevation={8}>
            <SideContainer>

              <Box sx={{ width: '100%' }}>

                <Tabs value={selectedTab} onChange={handleTabChange} >
                  <Tab label="Subir master" {...getTabPropByIndex(0)} />
                  <Tab label="Actualizar master" {...getTabPropByIndex(1)} />
                </Tabs>

                <CustomTabPanel value={selectedTab} index={0}>
                  <ControlsContainer>
                    Ingrese un nuevo Master
                    <TextField
                      label="Nombre del Barrio"
                      size="medium"
                      placeholder="Ej: Del Pilar, Perdices"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    {hasExistingName && <Error>Ya existe un barrio con ese nombre</Error>}
                    <Button component="label" variant="contained" sx={{ gap: 1 }}>
                      <UploadFileIcon />
                      Cargar SVG
                      <input type="file" onChange={onFileUpload} hidden />
                    </Button>
                    {hasErrors && <Error>El archivo subido tiene errores</Error>}
                    <Button
                      component="label"
                      variant="contained"
                      sx={{ gap: 1 }}
                      disabled={text === "" || neighborhood === null || hasErrors || hasExistingName}
                      onClick={async () => {
                        openBackDrop();
                        const id = await addNeighborhood({ ...neighborhood!, name: text });
                        await router.push(`/master/${id}`);
                      }}
                    >
                      <SaveIcon />
                      Guardar
                    </Button>
                  </ControlsContainer>
                </CustomTabPanel>

                <CustomTabPanel value={selectedTab} index={1}>
                  <ControlsContainer>
                    Actualice un Master existente
                    <Select
                      collection={neighborhoodList}
                      value={selectedNeighborhood}
                      handleChange={(e: any) => {
                        openBackDrop();
                        setSelectedNeighborhood(e.target.value);
                        router.push(`/master/${e.target.value}`)
                      }}
                    />
                  </ControlsContainer>
                </CustomTabPanel>
              </Box>

            </SideContainer>
          </Paper>
        </KonvaContainer>
      </Box>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function getTabPropByIndex(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

async function encode(file: File): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => resolve(ev.target!.result as string);
    reader.onerror = reject;
    reader.readAsText(file, "UTF-8");
  });
  return await promise;
}

const ControlsContainer = styled.div`
  gap: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;


const KonvaContainer = styled.main`
  display: flex;
  gap: 20px;
  max-height: 83.5vh;
`;

const SideContainer = styled.div`
  height: 100%;
  width: 21vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Error = styled.span`
  color: red;
`;

const Instructions = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
`;
