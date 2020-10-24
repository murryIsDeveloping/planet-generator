import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { EventsService, PlanetService } from "src/services";

ReactDOM.render(
  <EventsService.Provider>
    <PlanetService.Provider>
      <App />
    </PlanetService.Provider>
  </EventsService.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
