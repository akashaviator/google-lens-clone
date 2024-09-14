const ProductsGrid = ({ products }) => {
  return (
    <div className="products-container overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md relative"
          key={index}
        >
          <div className="absolute top-2 left-2 bg-red-500 text-white font-bold px-2 py-1 rounded">
            {product.price}
          </div>
          <img
            src={product.google_image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-gray-800 font-bold truncate">{product.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsGrid
