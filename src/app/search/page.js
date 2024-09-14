"use client"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import TwinkleImage from "@/components/TwinkleImage"
import ImageCropper from "@/components/ImageCropper"
import { extractProductsData } from "../utils/helper"
import ProductsGrid from "@/components/ProductsGrid"
import axios from "axios"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const qsearch = searchParams.get("search")
  const [fileName, setFileName] = useState(qsearch)
  const [shouldFetch, setShouldFetch] = useState(0)

  useEffect(() => {
    console.log(fileName, shouldFetch)
    const url = fileName

    const fetchData = async () => {
      try {
        console.log(url)
        const response = await axios.get(`/api/proxy?url=${url}`)
        setProducts(response.data)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [fileName, shouldFetch])

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Header className="text-[#5f6267] bg-[#ffffff]" showLogo />
      <div className="grid grid-cols-2 flex-grow bg-[#202125]">
        <div className="h-full flex items-center justify-center bg ">
          {qsearch ? (
            // <TwinkleImage
            //   src={`/uploads/${fileName}`}
            //   alt="Uploaded Image"
            //   width={500}
            //   height={500}
            //   imageClass="rounded"
            // />
            <ImageCropper
              imageSrc={`/uploads/${qsearch}`}
              fileName={fileName}
              setFileName={setFileName}
              setLoading={setLoading}
              setShouldFetch={setShouldFetch}
            />
          ) : (
            <p>No image found.</p>
          )}
        </div>
        <div className="h-full bg-[#ffffff] border-t border-[#f1f1f1]">
          <ProductsGrid products={products} />
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
