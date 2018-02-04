import createMemoryHistory, { MemoryHistory } from 'history/createMemoryHistory';

const history: MemoryHistory = createMemoryHistory();

window['h'] = history;

export default history;
