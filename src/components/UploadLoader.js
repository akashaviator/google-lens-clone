import Loader from "../../public/svgs/loader.svg"

const UploadLoader = () => {
  return (
    <div className="bg-[#394456] text-[#89b4f8] w-full border-dashed border border-[#89b4f8] h-[280px] flex flex-col gap-6 items-center rounded-[10px] justify-center">
      <Loader className="animate-spin" width={35} height={35} />
      <span>Uploading...</span>
    </div>
  )
}

export default UploadLoader
