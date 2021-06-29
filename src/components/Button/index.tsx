import React from 'react'

type Props = {
  onClick: () => void
}

export const Button: React.FC<Props> = (props) => {
  return (
    <button
      className="h-8 leading-8 ml-2 px-2 rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
