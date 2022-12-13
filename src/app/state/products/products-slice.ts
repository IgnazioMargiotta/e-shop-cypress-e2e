import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum productColor {
  Blue = 'blu',
  Red = 'red',
  Green = 'green'
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  price?: number;
  color?: productColor;
}

export interface ProductsState {
  products: Product[]
}


const initialState: ProductsState = {
  products: [
    {
      id: "1",
      name: "product 1",
      description: "description 1",
      image: "https://via.placeholder.com/400",
      price: 20,
      color: productColor.Red
    },
    {
      id: "2",
      name: "product 2",
      description: "description 2",
      image: "https://via.placeholder.com/400",
      price: 30,
      color: productColor.Green
    },
    {
      id: "3",
      name: "product 3",
      description: "description 3",
      image: "https://via.placeholder.com/400",
      price: 35,
      color: productColor.Red
    }
  ]
};

export const productsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      return {...state, products: [...state.products, {...action.payload, image: "https://via.placeholder.com/400" } ]}
    },
    patchProduct:  (state, action: PayloadAction<Product>) => {
      const filterProduct = state.products.map((product) => {
        return product.id === action.payload.id ? {
          ...product,
          name: action.payload.name ? action.payload.name : product.name,
          description: action.payload.description ? action.payload.description : product.description,
          price: action.payload.price ? action.payload.price : product.price,
          color: action.payload.color ? action.payload.color : product.color
        } : product
      });
      return {...state, products: filterProduct}
    }
  },
});

export const { addProduct, patchProduct } = productsSlice.actions;
export default productsSlice.reducer;
