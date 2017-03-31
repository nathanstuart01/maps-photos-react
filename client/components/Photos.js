import React from 'react';
import { connect } from 'react-redux';
import { handleUpload, fetchPhotos } from '../actions/photos';
import Dropzone from 'react-dropzone';

class Photos extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
  }

  onDrop = (photos) => {
    //instead of console.logging, we need to dispatch the handleUpload action and pass it to the photo
    this.props.dispatch(handleUpload(photos[0]));
  }

  displayPhotos = () => {
    //map through the state of photo urls and display them
    //now that component is connect and we are mappingstate to props we:
    return this.props.photos.map( photo => {
      return(
        <div key={photo.id} className='col s12 m4'>
          <img src={photo.url} className='responsive-img' style={{ height:'300px' }} />
        </div>
      );
    });
  }

  render(){
    return(
      <div className='row'>
        <div className='col s12'>
          <Dropzone
          onDrop={this.onDrop}
          style={{ width: '100%', height: '100px', border: '1px dashed black'}}
          >
            <h4>Try dropping some files or clicking here to upload!</h4>
          </Dropzone>
      </div>
      <div className='col s12'>
        <h2>The Clouds Photos</h2>
        <hr />
        { this.displayPhotos() }
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    return { photos: state.photos }
}

export default connect(mapStateToProps)(Photos);
