"use client"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import TwinkleImage from "@/components/TwinkleImage"
import ImageCropper from "@/components/ImageCropper"
import ProductsGrid from "@/components/ProductsGrid"
import axios from "axios"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const qsearch = searchParams.get("search")
  const [fileName, setFileName] = useState(qsearch)
  const [shouldFetch, setShouldFetch] = useState(0)
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
  const region = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION

  const imageSrc = qsearch
    ? `https://${bucketName}.s3.${region}.amazonaws.com/${qsearch}`
    : null
  const searchImageSrc = qsearch
    ? `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`
    : null

  useEffect(() => {
    console.log(fileName, shouldFetch)
    if (!imageSrc) return
    const fetchData = async () => {
      try {
        console.log("Fetching data for:", imageSrc)
        const response = await axios.get(
          `/api/proxy?url=${encodeURIComponent(
            shouldFetch > 0 ? searchImageSrc : imageSrc
          )}`
        )
        setProducts(response.data)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [imageSrc, shouldFetch])

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Header className="text-[#5f6267] bg-[#ffffff]" showLogo />
      <div className={`grid grid-cols-[3fr_auto] flex-grow bg-[#202125]`}>
        <div className="h-full flex items-center justify-center bg ">
          {qsearch ? (
            <TwinkleImage twinkle={loading && shouldFetch === 0}>
              <ImageCropper
                imageSrc={imageSrc}
                fileName={fileName}
                setFileName={setFileName}
                setLoading={setLoading}
                setShouldFetch={setShouldFetch}
              />
            </TwinkleImage>
          ) : (
            <p>No image found.</p>
          )}
        </div>
        <div className="h-full bg-[#ffffff] border-t border-[#f1f1f1]">
          <ProductsGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
