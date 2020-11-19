# Exercise 4 - Frontend plumbing

We need to set up Redux!

Create a few new files:

- `src/reducers/index.js`
- `src/store.js`
- `src/actions.js`

For this workshop, here are the types of data we'll be dealing with:

- We need to hit our server to get an API key // `auth`
- We need to hit Spotify's API to get artist information // `artists`

These fall into two broad categories: `auth` and `artists`. Here's a depiction of what our state will look like:

```js
{
  auth: {
    token: 'abc123',
    status: 'idle',
  },
  artists: {
    currentArtist: /* Data from Spotify API */,
    status: 'idle',
  }
}
```

Inside `src/reducers/index.js`, add the following code:

```js
import { combineReducers } from "redux";

import auth from "./auth-reducer";
import artists from "./artists-reducer";

export default combineReducers({ auth, artists });
```

Create the two files mentioned, `auth-reducer` and `artists-reducer`. We'll want to create the "minimum viable reducer" for now.

Here's what `auth-reducer` looks like:

```js
const initialState = {
  token: null,
  status: "idle",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
```

Follow the same pattern for `artist-reducer.js`

- The initial state for `artist-reducer`.

Inside `store.js`, we'll do our typical Redux store boilerplate:

> REMEMBER: Lead a healthy lifestyle, don't eat the copy pasta!

```js
import { createStore } from "redux";

import reducer from "./reducers";

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
```

> This looks slightly different from last time! Instead of doing the store-creation inside `src/index.js`, we're doing it in `store.js` and exporting a function to create a store.
>
> This is a more common practice on larger applications.

Inside your main index file, let's finish up the Redux boilerplate by importing the `Provider`, and passing it a new store:

```diff
import React from 'react';
import ReactDOM from 'react-dom';
+import { Provider } from 'react-redux';

+import configureStore from './store';

import App from './components/App';

+const store = configureStore();

ReactDOM.render(
- <App />,
+ <Provider store={store}>
+   <App />
+ </Provider>,
  document.getElementById('root')
);
```
