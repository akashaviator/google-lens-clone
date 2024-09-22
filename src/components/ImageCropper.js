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
    const formData = new FormData()
    const fileSize = blob.size
    const fileType = blob.type || "image/jpeg"
    formData.append("file", blob, fileName)
    formData.append("fileName", croppedFileName)
    formData.append("fileSize", fileSize)
    formData.append("fileType", fileType)
    try {
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.status === 200) {
        const { uploadUrl, fileName } = response.data

        const uploadResponse = await axios.put(uploadUrl, blob, {
          headers: {
            "Content-Type": blob.type,
          },
        })

        if (uploadResponse.status === 200) {
          console.log("Cropped Image Saved Succesfully.")
        } else {
          console.error("S3 Upload Failed:", uploadResponse.data.error)
        }
      } else {
        console.error("Failed to save image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
    }
  }

  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      setLoading(true)
      const croppedImageBlob = await getCroppedImg(imgRef.current, crop)
      await saveImage(croppedImageBlob)
      setShouldFetch((prev) => prev + 1)
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
            crossOrigin="anonymous"
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
