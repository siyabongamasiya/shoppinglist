import React from 'react'

interface ButtonProps {
    text : string,
    onClick : () => void,
    hasIcon? : boolean,
    style : React.CSSProperties
}

export default function Button({text, onClick, hasIcon = false,style} : ButtonProps) {
  return (
    <div>
      <button>{text}</button>
    </div>
  )
}
