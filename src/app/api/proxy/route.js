import { extractProductsData } from "@/app/utils/helper"
import axios from "axios"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return new Response("URL parameter is required", { status: 400 })
  }

  try {
    const apiUrl = `https://lens.google.com/uploadbyurl?url=${url}`

    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
      },
    }
    const response = await axios.get(apiUrl, options)

    const data = await extractProductsData(response.data)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return new Response("Failed to fetch data", { status: 500 })
  }
}
