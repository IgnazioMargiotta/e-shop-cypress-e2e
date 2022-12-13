import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { HomePage } from './pages/home/home-page';
import { CounterPage } from './pages/counter/counter-page';
import { ProductPage } from './pages/product/product-page';

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<HomePage />} />
          <Route path="counter" element={<CounterPage />} />
          <Route path='product/:id' element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}