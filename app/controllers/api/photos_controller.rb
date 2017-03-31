class Api::PhotosController < ApplicationController
  def index
    render json: Photo.all
  end

  def create
    # todo: make sure to use DOTEVN gem
    auth = {
      cloud_name: 'dvewqv31h',
      api_key: '413148842282874',
      api_secret: '_faipLCcbZhjSxZpX6sRVvlrESg'
    }

    uploaded_photo_name = params.keys.first
    uploaded_file = params[uploaded_photo_name]

    begin
      cloud_photo = Cloudinary::Uploader.upload(uploaded_file, auth)
      photo = Photo.create(url: cloud_photo['url'])
      render json: photo
    rescue => e
      render json: { errors: e }, status: :bad_request
    end
  end
end
