import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';


// instantiate the global state object
const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        product: [],
        categories: [],
        currentCategory: '',
    });
    // use this confirm it work!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

// custom react hook
const useStoreContext = () => {
    return useContext(StoreContext);
};

// exporting functionality
export { StoreProvider, useStoreContext};