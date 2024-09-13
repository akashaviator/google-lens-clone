"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState()
  const [fileName, setFileName] = useState(searchParams.get("search"))
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Header className="text-[#5f6267] bg-[#ffffff]" showLogo />
      <div className="grid grid-cols-2 flex-grow bg-[#202125]">
        <div className="h-full flex items-center justify-center bg ">
          {fileName ? (
            <Image
              src={`/uploads/${fileName}`}
              alt="Uploaded Image"
              width={500}
              height={500}
              className="rounded"
            />
          ) : (
            <p>No image found.</p>
          )}
        </div>
        <div className="h-full bg-[#ffffff] border-t border-[#f1f1f1]"></div>
      </div>
    </div>
  )
}
