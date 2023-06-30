import React from 'react';
import Header from './components/header/Header';
import Tabview from './components/body/Tabs';
import Footer from './components/footer/Footer';
import './styles/App.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Tabview />
      <Footer />
    </div>
  );
};

export default App;