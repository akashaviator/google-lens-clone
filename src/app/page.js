import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SearchBox from "@/components/SearchBox"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-dark">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <Image
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
          alt="Logo"
          width={272}
          height={92}
        />
        <SearchBox className="mt-6" />
      </main>
      <Footer />
    </div>
  )
}
