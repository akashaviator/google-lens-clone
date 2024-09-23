import React, { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Icon from "@mdi/react"
import { mdiTagOutline } from "@mdi/js"

const ProductsGrid = ({ products, loading }) => {
  const totalProducts = products.length
  const [numberOfColumns, setNumberOfColumns] = useState(4)

  const updateColumnCount = () => {
    console
    if (window.innerWidth >= 1024) {
      setNumberOfColumns(4)
    } else if (window.innerWidth >= 768) {
      setNumberOfColumns(3)
    } else if (window.innerWidth >= 640) {
      setNumberOfColumns(2)
    } else {
      setNumberOfColumns(1)
    }
  }

  useEffect(() => {
    updateColumnCount()

    window.addEventListener("resize", updateColumnCount)

    return () => {
      window.removeEventListener("resize", updateColumnCount)
    }
  }, [])

  const productsPerColumn = Math.ceil(totalProducts / numberOfColumns)
  return loading ? (
    <div className="products-container grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-2 px-2">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          className="rounded-lg mx-3.5 overflow-hidden relative w-fit"
          key={index}
        >
          <Skeleton height={200} width="130px" />
        </div>
      ))}
    </div>
  ) : products.length === 0 ? (
    <div className="h-full flex items-center justify-center w-[600px] text-black">
      Some error occurred. Pleasy try again.
    </div>
  ) : (
    <div className="products-container overflow-y-scroll">
      <div
        className={`grid ${
          numberOfColumns === 1
            ? "grid-cols-1"
            : numberOfColumns === 2
            ? "grid-cols-2"
            : numberOfColumns === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        } justify-between p-4`}
      >
        {Array.from({ length: numberOfColumns }).map((_, columnIndex) => (
          <div key={columnIndex} className={`w-full p-2`}>
            <div className="bg-white w-[140px] overflow-hidden">
              {products
                .slice(
                  columnIndex * productsPerColumn,
                  (columnIndex + 1) * productsPerColumn
                )
                .map((product, index) =>
                  product.google_image ? (
                    <div key={index} className="relative w-full h-fit mb-4">
                      <a
                        href={product.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {product.price ? (
                          <div className="flex items-center bg-white/[0.9] rounded-full text-[rgb(32,33,36)] absolute left-3 top-3 px-0.5 overflow-hidden">
                            <span className="flex items-center justify-center">
                              <Icon
                                path={mdiTagOutline}
                                size="16px"
                                className="transform scale-x-[-1] h-4 w-4 m-1"
                              />
                              <span className="font-sans text-[12px] tracking-tight text-[rgb(32,33,36)] leading-5 font-medium mr-2">
                                {product.price}
                              </span>
                            </span>
                          </div>
                        ) : null}
                        <img
                          src={product.google_image}
                          alt={product.title}
                          className="w-full object-contain rounded-2xl"
                        />
                        <div className="p-1">
                          <p className="text-gray-800 text-[11px] font-medium line line-clamp-2">
                            {product.title}
                          </p>
                        </div>
                      </a>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsGrid
