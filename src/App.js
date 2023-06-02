import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Signin from './Pages/Auth/Signin'
import Signup from './Pages/Auth/Signup'
import Products from './Pages/Products'
import Home from './Pages/Home'
import Error404 from './Pages/Error404'
import Container from './Components/Container'
import Shell from './Shell'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'
import Favorites from './Pages/Favorites'

function App() {
  return (
    <div className="container mx-auto">
      
      <Container>
        <Routes>
          <Route path="/" exact element={<Shell isHome={true}><Home /></Shell>} />
          <Route path="/products" exact element={<Shell><Products /></Shell>} />
          <Route path="/:category_id" element={<Shell><Products /></Shell>} />
          <Route path="/product/:product_id" element={<Shell><ProductDetail /></Shell>} />
          <Route path="/cart" element={<Shell><Cart /></Shell>} />
          <Route path="/favorites" element={<Shell><Favorites /></Shell>} />
          <Route path="/signin" element={<Shell><Signin /></Shell>} />
          <Route path="/signup" element={<Shell><Signup /></Shell>} />
          <Route path="*" element={<Shell><Error404 /></Shell>} />
        </Routes>
      </Container>
    </div>
  )
}

export default App