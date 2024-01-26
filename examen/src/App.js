import React from 'react';
import './App.css';
import Components from './components/Components';
import logo from './logo.png'


function App() {
  return (
    <div className='app-container'>
      <header className='app-header'>
        <img src={logo} alt='Logo de la marca' className='app-logo' />
        <h1 className='app-title'>Tu Marca de Ropa</h1>
      </header>
      <main className='app-main'>
        <Components />
      </main>
    </div>
  );
}

export default App;
