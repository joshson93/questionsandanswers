import React, { useReducer } from 'react';
import reducer from './reducer.js';
import ThemeProvider, { lightTheme, darkTheme } from './ThemeProvider';

export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);

// localStorage.removeItem('user');
const savedInLocal = localStorage.getItem('user');
const localStoreUser = savedInLocal
  ? JSON.parse(savedInLocal)
  : { cart: [], outfit: [], theme: 'light', upVoted: [] };
console.log('User data fetched from localStorage', localStoreUser);

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const initPageState = {
  dev: { logs: false, renders: false, state: true, reducer: true },
  modal: { name: 'none', props: {} },
  user: {
    cart: localStoreUser.cart || [],
    outfit: localStoreUser.outfit || [],
    theme: localStoreUser.theme || 'light',
    upVoted: localStoreUser.upVoted || [],
  },
  currentProduct: 37322,
  QA: {},
  details: {},
  related: {},
  reviews: {},
};

const AppContextProvider = ({ children, passedState }) => {
  const initState = passedState || initPageState;
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <DispatchContext.Provider value={[null, dispatch]}>
      <StateContext.Provider value={[state]}>
        {/* <ThemeProvider STYLES={darkTheme} /> */}
        <ThemeProvider STYLES={themes[state.user.theme]} />
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default AppContextProvider;
