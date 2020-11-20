import configStore from './configStore.js';
import reducers from '../reducers';
const store = configStore(reducers);
export default store;