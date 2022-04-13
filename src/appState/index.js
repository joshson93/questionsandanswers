import React, { useReducer } from 'react';
import reducer from './reducer.js';
import ThemeProvider, { lightTheme, darkTheme } from './ThemeProvider';

export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);

// localStorage.removeItem('user')
const savedInLocal = localStorage.getItem('user');
const localStoreUser = savedInLocal
  ? JSON.parse(savedInLocal)
  : { cart: [], outfit: [], theme: 'light', upVoted: [] };
// console.log('User data fetched from localStorage', localStoreUser);

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const root = document.getElementById('root');
const mediaWidth = root.clientWidth || 600;
const mediaHeight = root.clientHeight || 600;
const imgType = mediaWidth > 600 ? 'url' : 'thumbnail_url';

const logState = {
  mod: {
    main: true,
    details: false,
    related: false,
    QA: false,
    reviews: false,
  },
};

const logRenders = {
  mod: {
    main: false,
    details: false,
    related: false,
    QA: false,
    reviews: false,
  },
};

const initPageState = {
  dev: { logs: false, renders: logRenders, state: logState, reducer: true },
  media: { width: mediaWidth, height: mediaHeight },
  img: { type: imgType },
  modal: { name: 'none', props: {} },
  user: {
    cart: localStoreUser.cart || [],
    outfit: localStoreUser.outfit || [],
    theme: localStoreUser.theme || 'light',
    upVoted: localStoreUser.upVoted || [],
  },
  currentProduct: 37311,
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
        <ThemeProvider STYLES={themes[state.user.theme]} dimensions={initState.media} />
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default AppContextProvider;
