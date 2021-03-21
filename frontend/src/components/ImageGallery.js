import React from 'react'
import ImageGallery from 'react-image-gallery'
import '../assets/scss/ImageGallery.scss'

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ]

const GalleryComp = ({ gallery }) => {
  const images = []
  gallery.forEach((file) => {
    images.push({
      original: file.image,
      thumbnail: file.image,
    })
  })
  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      // showBullets={true}
      showIndex={true}
      originalAlt={images.original}
      thumbnailPosition={'left'}
    />
  )
}

export default GalleryComp
