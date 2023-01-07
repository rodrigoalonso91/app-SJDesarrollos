import { Button, Grid, TextField, Typography } from "@mui/material";

export const SalesForm = () => {

    const handleAddSalesman = () => {

    }



    return (

        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 3}}
        >

            <Grid 
                className="box-shadow"
                item
                xs={ 3 }
                sx={{
                    width: {sm: 450},
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>Agregar vendedor</Typography>

                <form>
                    <Grid container>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Nombre"
                                type="text"
                                placeholder="Ej: Juan"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Apellido"
                                type="text"
                                placeholder="Ej: Garcia"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Teléfono"
                                type="text"
                                placeholder="Ej: 1171348080"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Email"
                                type="email"
                                placeholder="Ej: JuanGarcia@gmail.com"
                                fullWidth
                            />
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >

                            <Grid item xs={ 12 } sm={ 6 } >
                                <Button variant="contained" fullWidth onClick={handleAddSalesman} >
                                    Crear
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 6 } >
                                <Button variant="contained" fullWidth >
                                    <Typography>Cancelar</Typography>
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </form>

            </Grid>
        </Grid>
    )
}
