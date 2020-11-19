const initialState = {
  currentArtist: null,
  status: "idle",
  error: null,
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_DATA": {
      return {
        ...state,
        currentArtist: {
          profile: action.data,
        },
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_DATA_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
