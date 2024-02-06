import React, { useRef, useState, useEffect } from 'react'
import './imageUpload.css'
import Button from './Button'

const ImageUpload = (props) => {
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isVaild, setIsvalid] = useState(false)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickHandler = (event) => {
    let pickedFile
    let fileIsValid = isVaild
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
      setIsvalid(true)
      fileIsValid = true
    } else {
      setIsvalid(false)
      fileIsValid = false
    }
    props.onInput(props.id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className="from-control">
      <input
        type="file"
        id={props.id}
        style={{ display: 'none' }}
        ref={filePickerRef}
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />

      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isVaild && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
