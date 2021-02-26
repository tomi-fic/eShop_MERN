import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import UserListView from './views/UserListView'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const MainWrapper = styled.main`
  min-height: 85vh;
  margin: 3px 0 3px 0;
`

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainWrapper>
        <Container>
          <Route path='/' component={HomeView} exact />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart' component={CartView} />
          <Route path='/login' component={LoginView} />
          <Route path='/register' component={RegisterView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/shipping' component={ShippingView} />
          <Route path='/payment' component={PaymentView} />
          <Route path='/placeorder' component={PlaceOrderView} />
          <Route path='/orders/:id' component={OrderView} />
          <Route path='/admin/users' component={UserListView} />
        </Container>
      </MainWrapper>
      <Footer />
    </BrowserRouter>
  )
}

export default App
