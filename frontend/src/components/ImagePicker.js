import React from 'react'
import { Button, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ImagePicker = ({
  gallery,
  onRemoveImg,
  isUploadPending,
  uploadError,
}) => {
  console.log(
    'Image pricker props: ',
    gallery,
    onRemoveImg,
    isUploadPending,
    uploadError
  )
  return (
    <div
      style={{
        height: '90px',
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'auto',
      }}
    >
      {isUploadPending ? (
        <Loader size='sm' />
      ) : uploadError ? (
        <Message variant='danger'>{uploadError}</Message>
      ) : (
        gallery.map((img, key) => (
          <div
            style={{ minWidth: '80px', position: 'relative' }}
            key={img.image + Date.now()}
          >
            <Image
              src={img.image}
              alt={img.image}
              key={img.image + Date.now()}
              fluid
              rounded
              style={{
                width: '80px',
                margin: '1px',
              }}
            />
            <Button
              variant='danger'
              size='sm'
              key={Date.now() + key}
              style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                padding: '.2rem .2rem',
                fontSize: '.1rem',
                lineHeight: '1',
              }}
              onClick={() => {
                onRemoveImg(img.image)
              }}
            >
              X
            </Button>
          </div>
        ))
      )}
    </div>
  )
}

export default ImagePicker
