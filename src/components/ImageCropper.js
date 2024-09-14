import React, { useState, useRef, useEffect } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import axios from "axios"

const ImageCropper = ({
  imageSrc,
  fileName,
  setFileName,
  setShouldFetch,
  setLoading,
}) => {
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [croppedFileName, setCroppedFileName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const setFullCrop = () => {
    setCrop({
      unit: "%",
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    })
  }

  const generateUniqueFileName = () => {
    const timestamp = new Date().getTime()
    const randomString = Math.random().toString(36).substring(2, 8)
    return `cropped_image_${timestamp}_${randomString}.jpg`
  }

  useEffect(() => {
    console.log("setting file name")
    setFullCrop()
    const croppedName = generateUniqueFileName()
    setFileName(croppedName)
    setCroppedFileName(croppedName)
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

  const saveImage = async (blob) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("file", blob, fileName)
    formData.append("fileName", croppedFileName)
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
    } finally {
      //   setFileName(croppedFileName)
      setLoading(false)
    }
  }

  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageBlob = await getCroppedImg(imgRef.current, crop)
      await saveImage(croppedImageBlob)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {!!imageSrc && (
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={onCropComplete}
          onDragEnd={() => setShouldFetch((prev) => prev + 1)}
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
    </div>
  )
}

export default ImageCropper
