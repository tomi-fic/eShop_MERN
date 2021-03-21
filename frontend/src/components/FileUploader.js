import React from 'react'
import { Button } from 'react-bootstrap'

const FileUploader = ({ inputFile, uploadFileHandler }) => {
  return (
    <div>
      <input
        ref={inputFile}
        onChange={uploadFileHandler}
        type='file'
        style={{ display: 'none' }}
        multiple={true}
      />
      <Button variant='primary' onClick={() => inputFile.current.click()}>
        <i className='fas fa-plus'></i>
      </Button>
    </div>
  )
}

export default FileUploader
