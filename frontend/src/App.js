import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const MainWrapper = styled.main`
  min-height: 85vh;
  margin: 3px 0 3px 0;
`

const App = () => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Container>
          <HomeView />
        </Container>
      </MainWrapper>
      <Footer />
    </>
  )
}

export default App
