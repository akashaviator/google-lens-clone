import React from "react"

const Button = ({ text, className }) => {
  return (
    <button
      className={`${className} bg-[#303134] font-semibold text-[#e8eaed] text-[13px] rounded-[4px] border-[0.5px] border-transparent hover:border-[#5f6368] py-1.5 px-4`}
    >
      {text}
    </button>
  )
}

export default Button
