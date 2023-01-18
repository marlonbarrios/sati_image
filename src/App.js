
import './App.css';
//import all componenets at the top
import Navigation from './components/Navigation.js';
import Home from './components/Home';
import Text from './components/Text';
import Images from './components/Images';
import Keywords from './components/Keywords';

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Navigation />

      <Routes>
    
      <Route path= "https://openai-proto.netlify.app//Home" element={ <Home />}> </Route>
      <Route path= "https://openai-proto.netlify.app//Text" element={ <Text />}> </Route>
      <Route path= "https://openai-proto.netlify.app//Images" element={ <Images />}> </Route>
      <Route path= "https://openai-proto.netlify.app//Keywords" element={ <Keywords />}> </Route>
     
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;
