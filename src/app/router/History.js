import {createBrowserHistory} from 'history';

let history = null;

const getHistory = () => {
  if (!history) {
    history = createBrowserHistory();
    let unblock = history.block(); // block browser navigation
    history.navigate = url => {
      unblock(); // unblock browser navigation
      history.push(url); // redirect
      unblock = history.block(); // block browser navigation again
    };
  }

  return history;
};

export default getHistory();