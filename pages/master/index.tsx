import styled from "@emotion/styled";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import getNeighborhoods from "@web/api_calls/neighborhood/getNeighborhoods";
import transformXmlToNeighborhoods, { BlockError, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import usePreventBodyScroll from "@web/hooks/usePreventBodyScroll";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Select } from "@web/components/layout/Select";
import addNeighborhood from "@web/api_calls/neighborhood/addNeighborhood";

const KonvaMasterPreview = dynamic(
  () => import("@web/components/master/preview/KonvaPreviewMaster"),
  { ssr: false }
);

export default function NeighborhoodsScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [errors, setErrors] = useState<Array<BlockError>>([]);
  const [neighborhoods, setNeighborhoods] = useState<Array<{ name: string }>>([]);

  usePreventBodyScroll();

  useEffect(() => {
    (async () => {
      const neighborhoods = await getNeighborhoods();
      setNeighborhoods(neighborhoods);
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

  const hasErrors = errors.length > 0;
  const hasExistingName = neighborhoods.some(x => x.name === text);

  return (
    <Box sx={{
      width: "100%",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}
    >
      <KonvaContainer>
        <Paper elevation={3} style={{ overflow: "hidden", position: "relative" }}>
          <KonvaMasterPreview neighborhood={neighborhood} errors={errors} />
          {neighborhood === null &&
            <Instructions>
              <h2>Instrucciones para cargar un SVG</h2>
              <ol>
                <li>Diagramar el barrio en un archivo de AutoCAD (.dwg). El diagrama debe consistir unicamente de las
                  lineas que delimitan las manzanas y los lotes.
                </li>
                <li>Las lineas que delimitan las manzanas deben ser pintadas de Fuchsia (fuchsia).</li>
                <li>Las lineas internas a las manzanas que delimitan los lotes deben ser pintadas de Rojo (red).</li>
                <li>Una vez completado el archivo de AutoCAD, usar <a href="https://cloudconvert.com/dwg-to-svg"
                                                                      target="_blank">esta web</a> para convertirlo a
                  SVG (.svg).
                </li>
                <li>El archivo resultante (.svg) puede ser ingresado en la web de SJDesarrollos presionando el boton
                  "Cargar SVG".
                </li>
                <li>Una vez cargado el archivo, se mostrara un preview del master.</li>
                <li>En caso de encontrarse errores, estos se mostraran en rojo. Debera de corregirlos en el archivo
                  AutoCAD y repetir el proceso.
                </li>
              </ol>
              <h3>Ejemplo de como debe verse el .dwg inicial</h3>
              <img src="/sample_neighborhood.png" style={{ maxHeight: "400px" }} />
            </Instructions>
          }
        </Paper>

        <Paper elevation={3}>
          <SideContainer>
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
                  const id = await addNeighborhood({ ...neighborhood!, name: text });
                  await router.push(`/master/${id}`);
                }}
              >
                <SaveIcon />
                Guardar
              </Button>
            </ControlsContainer>
            <ControlsContainer>
              Actualice un Master existente
              <Select
                collection={neighborhoods}
                value=""
                handleChange={(e: any) => router.push(`/master/${e.target.value}`)}
              />
            </ControlsContainer>
          </SideContainer>
        </Paper>
      </KonvaContainer>
    </Box>
  );
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


const KonvaContainer = styled.div`
  display: flex;
  gap: 20px;
  max-height: 83.5vh;
`;

const SideContainer = styled.div`
  height: 100%;
  width: 18.9vw;

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
