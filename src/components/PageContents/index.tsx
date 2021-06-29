import React, { useState } from 'react'
import sampleJson from '../../assets/json/sample.json'
import { Button } from '../Button'
import classes from './PageContents.module.scss'

export const PageContents: React.VFC = () => {
  const [AA, setAA] = useState<string>('')

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
            // console.log(encodeURI(e.target.value))
          }}
        ></textarea>
      </div>
      <div>
        {sampleJson.samples.map((sample, index) => {
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
      <div>
        <p className="py-4">↓</p>
      </div>
      <div>
        <p className={classes.gaming}>{AA}</p>
      </div>
    </div>
  )
}
