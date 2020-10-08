import React, { useState  } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import './Modal';
import { useStateValue } from "./StateProvider";


function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
      
    //Bem naming convention
    <div className="app">
      {!user ? (
       <Login />
         ) : (
       
          <div className="app-body">
            <Router>
            <div className="header-area">
            <Header />
            </div>
            <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
                </Switch>
                <div className="footer-area">
                 <Footer />
                 </div> 
            </Router>
          </div>
         

      )}

     
    </div>
    
  );
}

export default App;
