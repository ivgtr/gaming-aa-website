import React, { useState } from 'react'
import sampleJson from '../../assets/json/sample.json'
import { Button } from '../Button'
import classes from './PageContents.module.scss'

export const PageContents: React.VFC = () => {
  const [AA, setAA] = useState<string>('')
  const [palette, setPalette] = useState<string[]>(['#40e0d0', '#ff8c00', '#ff0080'])

  const gradient = `-webkit-linear-gradient(0deg, ${palette.join(',')})`

  return (
    <div className="px-6 overflow-hidden">
      <div className="overflow-hidden">
        <textarea
          name="aa-input"
          id="aa-input"
          rows={10}
          className={classes.textarea}
          placeholder="入力してください"
          value={AA}
          onChange={(e) => {
            setAA(e.target.value)
            console.log(encodeURI(e.target.value))
          }}
        ></textarea>
      </div>
      <div>
        {sampleJson.aa_samples.map((sample, index) => {
          return (
            <Button
              onClick={() => {
                setAA(decodeURI(sample.value))
              }}
              key={index}
            >
              {sample.title}
            </Button>
          )
        })}
        <Button
          onClick={() => {
            setAA('')
          }}
        >
          リセット
        </Button>
      </div>
      <div className="mt-4">
        {sampleJson.color_samples.map((sample, i) => {
          return (
            <div
              key={i}
              className="flex"
              onClick={() => {
                setPalette(sample.palette)
                console.log(gradient)
              }}
            >
              {sample.palette.map((color, j) => {
                return <span key={j} style={{ backgroundColor: color }} className="h-6 w-6"></span>
              })}
            </div>
          )
        })}
      </div>
      <div>
        <p className="py-4">↓</p>
      </div>
      <div>
        <p className={classes.gaming}>
          {AA.split('\n').map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  )
}
