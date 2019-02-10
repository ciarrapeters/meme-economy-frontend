import { CHANGE_MEME, CHANGE_SITE } from '../actions';

const initialState = {
  memeId: null,
  site: null
}

function memeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MEME:
      return {
        ...state,
        memeId: action.id
      }
    case CHANGE_SITE:
      return {
        ...state,
        site: action.site
      }
    default:
      return state;
  }
}

export default memeReducer;