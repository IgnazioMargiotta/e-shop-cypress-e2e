// Third part
import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Store
import {RootState} from '../../state/store'
import { Product, addProduct, productColor } from '../../state/products/products-slice';
import { useAppDispatch } from '../../state/hooks';

// Components
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

interface SearchInputs {
  name: string;
  color: productColor;
};

interface ProductValues {
  name: string;
  description?: string;
  image: string;
  price?: number;
  color: productColor;
}

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [productsList, setProductsList] = useState<Product[]>()
  const products = useSelector((state: RootState  )=> state.productsSlice.products)
  const memoProducts = useMemo(() => products, [products])

  const { watch, register } = useForm<SearchInputs>({mode: 'onChange',});
  const searchTextInput = watch('name')	
  const searchColorInput = watch('color')
  
  const { register: registerProduct, handleSubmit: handleSubmitProduct, formState: { errors: productErrors } } = useForm<ProductValues>();
  const onSubmitProduct: SubmitHandler<ProductValues> = data => dispatch(addProduct({...data, id: `${productsList?.length! + 1}` }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    if((!searchTextInput || searchTextInput.length === 0) && !searchColorInput) {
      setProductsList(memoProducts)
    } 

    if((searchTextInput && searchTextInput.length > 0) && !searchColorInput) {
      setProductsList(memoProducts?.filter(product => product.name.toLocaleLowerCase().includes(searchTextInput)))
    } else if((!searchTextInput || searchTextInput.length === 0) && searchColorInput) {
      const filtered = memoProducts?.filter(product => product.color?.toLocaleLowerCase().includes(searchColorInput.toLocaleLowerCase()))
      if(filtered?.length === 0) {
        setProductsList(undefined)
      } else {
        setProductsList(filtered)
      }
    } else if((searchTextInput && searchTextInput.length > 0) && searchColorInput) {
      const filtered = memoProducts?.filter(product => 
        product.color?.toLocaleLowerCase().includes(searchColorInput.toLocaleLowerCase()) &&
        product.name.toLocaleLowerCase().includes(searchTextInput)
      )
      setProductsList(filtered)
    }

  }, [searchTextInput, memoProducts, searchColorInput])

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        E-shop-cypress-e2e
      </Typography>
      <StyledGrid container spacing={0.5}>
        <Grid item md={8} xs={12}>
          <form>
            <Grid container spacing={1}>
              <Grid item md={4} xs={12}>
                <TextField id="filled-basic" {...register("name")} label="Find by name" variant="filled" />
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="color-select-label">Color</InputLabel>
                  <Select label="Color" {...register("color")} labelId="color-select-label" defaultValue={""}>
                      <MenuItem value={productColor.Red}>Red</MenuItem>
                      <MenuItem value={productColor.Blue}>Blue</MenuItem>
                      <MenuItem value={productColor.Green}>Green</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item md={4} xs={12}>
          <Button onClick={handleOpen}>Create a new product</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New product
              </Typography>
              <Form onSubmit={handleSubmitProduct(onSubmitProduct)}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StyledTextField id="outlined-basic" label="Product name" variant="outlined" {...registerProduct("name", { required: true })} />
                    {productErrors.name && <span>This field is required</span>}
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField id="outlined-basic" label="Price" variant="outlined" {...registerProduct("price")} type="number" />
                    {productErrors.price && <span>Error</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="color-select-label">Color</InputLabel>
                      <Select label="Color" {...registerProduct("color")} labelId="color-select-label" defaultValue={""}>
                          <MenuItem value={productColor.Red}>Red</MenuItem>
                          <MenuItem value={productColor.Blue}>Blue</MenuItem>
                          <MenuItem value={productColor.Green}>Green</MenuItem>
                      </Select>
                    </FormControl>
                     {productErrors.color && <span>Error</span>}
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        {...registerProduct("description")}
                      />
                  </Grid>
                </Grid>
                <StyledButton variant="contained" type="submit">Create new product</StyledButton>
              </Form>
            </Box>
          </Modal>
        </Grid>
      </StyledGrid>
      <StyledGrid container spacing={0.5}>
        {productsList ? productsList.map((product) => (
          <Grid item key={product.id} md={4} xs={12} data-testid="product-component">
            <Card variant="outlined">
              <CardMedia
                component="img"
                image={product.image}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {product.color}
                </Typography>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {product.price} €
                </Typography>
                <Typography variant="body2">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`product/${product.id}`} role="button" >See more</Link>
              </CardActions>
              </Card>
            </Grid>
        )) : 'Nessun prodotto trovato'}
      </StyledGrid>
    </Container>
  )
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