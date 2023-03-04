import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { MainRouter } from './navigation';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const AppContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </ChakraProvider>
  );
};

export default AppContainer;
