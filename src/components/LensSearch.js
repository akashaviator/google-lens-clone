import React, { forwardRef, useRef, useState } from "react"
import Close from "../../public/svgs/close.svg"
import Placeholder from "../../public/svgs/placeholder.svg"
import { useRouter } from "next/navigation"
import axios from "axios"
import UploadLoader from "./UploadLoader"

const LensSearch = forwardRef(({ onClose }, ref) => {
  const fileInput = useRef(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const uploadFile = async () => {
    const file = fileInput.current.files[0]

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type)
      alert("Please upload a valid image (PNG, JPEG, JPG, WEBP).")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileSize", file.size)
    formData.append("fileType", file.type)

    setLoading(true)

    try {
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        const { uploadUrl, fileName } = response.data

        const uploadResponse = await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        })

        if (uploadResponse.status === 200) {
          router.push(`/search?search=${fileName}`)
        } else {
          console.error("S3 Upload Failed:", uploadResponse.data.error)
          alert("Failed to upload image to S3.")
        }
      } else {
        console.error("Upload Failed:", response.data.error)
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center h-[362px] max-w-[592px] bg-[#303134] mb-1 rounded-[25px]"
    >
      <div className="w-[555px] h-full">
        <span
          className="absolute right-0 translate-y-4 -translate-x-full cursor-pointer"
          onClick={onClose}
        >
          <Close width={25} height={25} />
        </span>

        <div className="h-[60px] flex justify-center text-[#F1F3F4] items-center">
          Search any image with Google Lens
        </div>
        {loading ? (
          <UploadLoader />
        ) : (
          <React.Fragment>
            <div className="bg-[#202125] w-full border-dashed border border-[#3c4043] h-[280px] justify-end flex flex-col items-center rounded-[10px]">
              <div className="h-[200px] w-11/12 flex items-center justify-center ">
                <span className="flex items-center justify-center gap-6">
                  <Placeholder w={100} />
                  <span>
                    Drag an image here or
                    <span
                      onClick={() => fileInput.current.click()}
                      className="cursor-pointer ml-1.5 text-[rgb(138,180,248)] hover:underline hover:decoration-[rgb(138,180,248)]"
                    >
                      upload a file
                    </span>
                    <input
                      type="file"
                      ref={fileInput}
                      onChange={uploadFile}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </span>
                </span>
              </div>
              <div className="h-[80px] w-11/12 border-gray-600 border-t-[0.5px] relative">
                <span className="absolute flex items-center justify-center top-0 -translate-y-3.5 w-[60px] left-56 bg-[#202125]">
                  OR
                </span>
                <div className="h-full w-full flex items-center">
                  <input
                    type="text"
                    placeholder="Paste image link"
                    className="
                  bg-[#303134] 
                  border border-[rgb(60,64,67)] 
                  hover:border-gray-500
                  hover:broder-[0.5px]
                  text-[rgb(241,243,244)] 
                  rounded-[36px] 
                  flex-grow 
                  text-[14px] 
                  h-[40px] 
                  px-[24px] 
                  w-full 
                  outline-none
                "
                  />
                  <button
                    className="
                  flex items-center 
                  bg-[#303134] 
                  rounded-[32px] 
                  border border-[rgb(60,64,67)]
                  hover:text-[rgb(210,227,252)]
                  hover:bg-[rgba(136,170,187,0.04)]
                  hover:border-[rgb(60,64,67)]
                  text-[rgb(138,180,248)] 
                  cursor-pointer 
                  justify-center 
                  text-[14px] 
                  ml-[8px] 
                  outline-none 
                  py-[8px] 
                  px-[24px] 
                "
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
})

export default LensSearch
