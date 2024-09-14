import { extractProductsData } from "@/app/utils/helper"
import axios from "axios"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url") // Get the URL from query parameters

  if (!url) {
    return new Response("URL parameter is required", { status: 400 })
  }

  try {
    const apiUrl = `https://lens.google.com/uploadbyurl?url=${process.env.HOME_URL}/uploads/${url}`

    console.log(apiUrl)
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    })

    const data = extractProductsData(response.data)
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
