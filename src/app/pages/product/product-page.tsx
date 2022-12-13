// Third part
import { useMemo, useState } from 'react'
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

// Components
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

// Store
import { RootState } from '../../state/store';
import { patchProduct, Product, productColor } from '../../state/products/products-slice';
import { useAppDispatch } from '../../state/hooks';

interface ProductValues {
  name: string;
  description?: string;
  image: string;
  price?: number;
  color: productColor;
}

export const ProductPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const productSelected: Product[] = useSelector((state: RootState  )=> state.productsSlice.products.filter(product => product.id === id))
  const memoProductSelected = useMemo<Product>(() => productSelected[0], [productSelected])

  const { register, handleSubmit, formState: { errors } } = useForm<ProductValues>({defaultValues: memoProductSelected});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<ProductValues> = data => dispatch(patchProduct({...data, id: id! }));

  return memoProductSelected ? (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Test PhotoSì
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Link to={`/`}>Back to the home page</Link>
        </Grid>
        <Grid item md={6} xs={12}><Button onClick={handleOpen}>Edit product</Button></Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modifica prodotto
          </Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <StyledTextField id="outlined-basic" label="Product name" variant="outlined" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
              </Grid>
              <Grid item xs={6}>
                <StyledTextField id="outlined-basic" label="Price" variant="outlined" {...register("price")} type="number" />
                {errors.price && <span>Error</span>}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="color-select-label">Color</InputLabel>
                  <Select label="Color" {...register("color")} labelId="color-select-label" defaultValue={memoProductSelected.color}>
                      <MenuItem value={productColor.Red}>Red</MenuItem>
                      <MenuItem value={productColor.Blue}>Blue</MenuItem>
                      <MenuItem value={productColor.Green}>Green</MenuItem>
                  </Select>
                </FormControl>
                  {errors.color && <span>Error</span>}
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    {...register("description")}
                  />
              </Grid>
            </Grid>
            <StyledButton variant="contained" type="submit">Edit product</StyledButton>
          </Form>
        </Box>
      </Modal>
      <StyledGrid container spacing={0}>
        <Grid item md={6} xs={12}>
          <img alt={`product ${memoProductSelected?.name}`} src={memoProductSelected.image} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <StyledGridInfoProduct item xs={6}>Name: {memoProductSelected?.name}</StyledGridInfoProduct>
            <StyledGridInfoProduct item xs={6}>Price: {memoProductSelected?.price}</StyledGridInfoProduct>
            <StyledGridInfoProduct item xs={12}>Color: {memoProductSelected?.color}</StyledGridInfoProduct>
            <StyledGridInfoProduct item xs={12}>description: {memoProductSelected?.description}</StyledGridInfoProduct>
          </Grid>
        </Grid>
        
      </StyledGrid>
    </Container>
      ) : null
}

const Form = styled.form`
  margin: 30px 0;
`

const StyledTextField = styled(TextField)`
  margin: 5px 0;
`

const StyledButton = styled(Button)`
  margin-top: 30px;
`

const StyledGrid = styled(Grid)`
  margin: 30px 0;
`

const StyledGridInfoProduct = styled(Grid)`
  margin: 5px 0;
`

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #f3f3f3',
  boxShadow: 24,
  p: 4,
};