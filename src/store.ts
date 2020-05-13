import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import throttle from 'lodash';
import State from './reducers/reducers'

// export const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//         return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (err) {
//         return undefined;
//     }
// }; 
// const persistedState = loadState();

// const saveState = (state: any) => {
//     try {
//       const serializedState = JSON.stringify(state);
//       localStorage.setItem('state', serializedState);
//     } catch {
//       // ignore write errors
//     }
// };

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

// store.subscribe(() => {
//     saveState({State});
// });


export default store