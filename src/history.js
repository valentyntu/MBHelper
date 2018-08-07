import createHistory from 'history/createBrowserHistory'

let history;

if (typeof document !== 'undefined') {

  history = createHistory()
}

export default history