const photos  = ( state = [], action ) => {
  switch ( action.type ) {
    case 'ADD_PHOTO':
      return [...state, action.photo]
    case 'SET_PHOTOS':
      return action.photos;
    default:
      return state;
  }
}

export default photos;
