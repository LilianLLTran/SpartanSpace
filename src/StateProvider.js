// import React, {createContext, useContext, useReducer} from "react";

// export const StateContext = createContext();

// export const StateProvider = ({ reducer, initialState, children}) => (
//     <StateContext.Provider value = {useReducer(reducer, initialState)}>
//         {children}
//     </StateContext.Provider>
// );

// export const useStateValue = () => useContext(StateContext);

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create the context
export const StateContext = createContext();

// Provider Component
export const StateProvider = ({ reducer, initialState, children }) => {
  // Retrieve the state and dispatch from useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save the basket state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook for consuming the context
export const useStateValue = () => useContext(StateContext);
