import React, { useState, useRef } from "react"

interface ISegmentedInputProp {
  length: number
  label: string
  initialValues?: string
  onComplete: (str: string) => any
}
const SegmentedInput: React.FC<ISegmentedInputProp> = ({
  length,
  label,
  onComplete,
  initialValues,
}) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""))
  const inputs = useRef<HTMLInputElement[]>([])
  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value
    if (/[^0-9]/.test(num)) return
    const newCode = [...code]
    newCode[slot] = num
    setCode(newCode)
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus()
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""))
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ""
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }
  }
  return (
    <div className="segmented-code-input">
      <span className="myform__label">{label}</span>
      <div className="segmented-code-inputs">
        {initialValues?.split("").map((item, index) => (
          <input key={index} type="text" disabled={true} value={item} />
        ))}
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              onChange={e => processInput(e, idx)}
              onKeyUp={e => onKeyUp(e, idx)}
              ref={ref => inputs.current.push(ref!)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SegmentedInput
