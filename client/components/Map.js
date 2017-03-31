import React from 'react';
import GoogleMapReact from 'google-map-react';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';

class Map extends React.Component {
  static defaultProps = {
    center: { lat: 40.760551, lng: -111.882587 },
    zoom: 16
  }

  state = {
    center: this.props.center,
    zoom: this.props.zoom,
    address: 'Devpoint Labs'
  }

createMapOptions () {
  return {
    panControl: true,
    mapTypeControl: true,
    scrollWheel: true
  }
}

findAddress = (e) => {
  e.preventDefault();
  let { dispatch } = this.props;
  let address = this.refs.address.value;

  $.ajax({
    url: '/api/location',
    type: 'GET',
    dataType: 'JSON',
    data: { address }
  }).done( data =>{
    this.setState({ address, center: { lat: data[0], lng: data[1] } });
    dispatch(setFlash('Address Found!', 'Success'));
  }).fail( data => {
    dispatch(setFlash('Error finding address. Try again!', 'error'));
  });
}
  render(){
    let { center, zoom, address } = this.state;
    return(
      <div>
        <h2>Basic Google Map</h2>

        <form onSubmit={ this.findAddress }>
          <input type='text' required placeholder='Address' ref='address' />
          <input type='submit' value='Find Address' className='btn' />
        </form>

        <h4>Viewing: { address }</h4>
        <div style={{ height: '600px', width: '600px', margin: '0 auto' }}>
          <GoogleMapReact
            options={this.createMapOptions}
            defaultCenter={this.props.center}
            defaultZoom={zoom}
            center={center}
            >
            </GoogleMapReact>
          </div>
        </div>
    );
  }

}

export default connect()(Map);
