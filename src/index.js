import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './Context/AuthContext'
import { ProductProvider } from './Context/ProductContext'
import { CartProvider } from './Context/CartContext'
import { AssessmentProvider } from './Context/AssessmentContext'
import { FavoriteProvider } from './Context/FavoriteContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AssessmentProvider>
            <FavoriteProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FavoriteProvider>
          </AssessmentProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

