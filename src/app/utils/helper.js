import * as cheerio from "cheerio"

export async function extractProductsData(html) {
  const $ = cheerio.load(html)
  const scriptElements = $("script")

  let rawData = ""
  let offset = 2

  scriptElements.each((_, element) => {
    const nodeValue = $(element).html()
    if (nodeValue.includes("AF_initDataCallback")) {
      if (offset === 0) {
        rawData = nodeValue
        return false
      } else {
        offset--
      }
    }
  })

  const start = rawData.indexOf("data:") + 5
  const end = rawData.indexOf("sideChannel") - 2
  const jsonData = JSON.parse(rawData.substring(start, end))

  let jason = []

  try {
    jason =
      jsonData[1].length === 2
        ? jsonData[1][1][1][8][8][0][12]
        : jsonData[1][0][1][8][8][0][12]
  } catch (error) {
    console.error("The data is not in the expected format:", error)
  }

  const productList = []

  jason.forEach((product) => {
    const information = {
      google_image: product[0][0],
      title: product[3],
      redirect_url: product[5],
      redirect_name: product[14],
      price: product[0][7] ? product[0][7][1] : null,
    }
    productList.push(information)
  })

  return productList
}
