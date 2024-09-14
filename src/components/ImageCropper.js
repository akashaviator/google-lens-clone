import React, { useState, useRef, useEffect } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import axios from "axios"

const ImageCropper = ({ imageSrc }) => {
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [fileName, setFileName] = useState("")

  const setFullCrop = () => {
    setCrop({
      unit: "%",
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    })
  }

  useEffect(() => {
    setFullCrop()
  }, [imageSrc])

  const onImageLoad = (e) => {
    setFullCrop()
  }

  const getCroppedImg = (image, pixelCrop) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        }
      }, "image/jpeg")
    })
  }

  const saveImage = async (blob, fileName) => {
    const formData = new FormData()
    formData.append("file", blob, fileName)
    try {
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.status === 200) {
        console.log("Image saved successfully")
      } else {
        console.error("Failed to save image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageBlob = await getCroppedImg(imgRef.current, crop)
      const fileName = "croppedImage.jpg"
      setFileName(fileName)
      await saveImage(croppedImageBlob, fileName)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {!!imageSrc && (
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={onCropComplete}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
            onLoad={onImageLoad}
            style={{ width: "400px", height: "auto" }}
          />
        </ReactCrop>
      )}
      {fileName && (
        <p className="text-gray-500">Cropped image saved as: {fileName}</p>
      )}
    </div>
  )
}

export default ImageCropper
