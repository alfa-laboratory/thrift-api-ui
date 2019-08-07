import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Application } from './containers/Application';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import './app.css';

// Create main element
const mainElement = document.createElement('div');
mainElement.id = 'container';
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <PersistGate loading={ null } persistor={ persistor }>
                    <Component />
                </PersistGate>
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
