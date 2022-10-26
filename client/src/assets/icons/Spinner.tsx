import React from "react";
import "./spinner.css";

interface Props {
  width?: string | number
  height?: string | number
  border?: string
}

const Spinner:React.FC<Props> = ({width, height, border}) => {
  return (
    <div className="spinner" style={{width: width, height: height, border: border}}></div>
  )
}

export default Spinner