import './App.css';

import Images from './components/Images';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
function App() {
  return (

    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL
        + "/back2.png"})`,
    height: "300px", backgroundRepeat: "repeat"
  }} >
      <Container>
        <Images />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
