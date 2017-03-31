import { setFlash } from './flash';
import request from 'superagent';
require('superagent-rails-csrf')(request);

const addPhoto = (photo) => {
  return { type: 'ADD_PHOTO', photo }
}

const setPhotos = (photos) => {
  return { type: 'SET_PHOTOS', photos}
}

export const fetchPhotos = () => {
  // where our superagent get request happens
  // dispatch the setphotos action
  return(dispatch) => {
  let req = request.get('/api/photos');
  req.set('Accept', 'application/json');
  req.setCsrfToken();
  req.end( (err, res)  => {
    if(err)
      dispatch(setFlash('Error fetching all photos.', 'error'));
    else
      dispatch(setPhotos(res.body));
  });
 }
}

export const handleUpload = (photo) => {
  // where our superagent post request to caret a new photo
  // dispatch addphoto action
  return(dispatch) => {
    let req = request.post('/api/photos');
    req.set('Accept', 'application/json');
    req.attach(photo.name, photo);
    req.setCsrfToken();
    req.end( (err, res) => {
      if(err)
        dispatch(setFlash('Error uploading file. Please try again!', 'error'));
      else
        dispatch(addPhoto(res.body));
    });
  }
}
