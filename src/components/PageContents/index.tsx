/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react'
import React, { useState } from 'react'
import sampleJson from '../../assets/json/sample.json'
import { Button } from '../Button'

const textarea = css`
  box-sizing: border-box;
  width: 200%;
  min-height: 100px;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: -200px;
  font-size: 2.4rem;
  line-height: 2.4rem;
  border: 2px solid #000;
  border-radius: 0;
  outline: none;
  transition: border-bottom 0.1s ease-in;
  transform: scale(0.5);
  transform-origin: top left;
  resize: vertical;
`

const gradient = keyframes`
from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
`

export const PageContents: React.VFC = () => {
  const [AA, setAA] = useState<string>('')
  const [palette, setPalette] = useState<string[]>([
    '#40e0d0',
    '#41e081',
    '#e0d041',
    '#ff8c00',
    '#ff0080',
    '#d041e0'
  ])

  return (
    <div className="px-6 overflow-hidden">
      <div className="overflow-hidden">
        <textarea
          name="aa-input"
          id="aa-input"
          rows={10}
          css={textarea}
          placeholder="入力してください"
          value={AA}
          onChange={(e) => {
            setAA(e.target.value)
            // console.log(encodeURI(e.target.value))
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
      <div className="mt-4 flex">
        {sampleJson.color_samples.map((sample, i) => {
          return (
            <div
              key={i}
              className="flex ml-2"
              onClick={() => {
                setPalette(sample.palette)
              }}
            >
              {sample.palette.map((color, j) => {
                return (
                  <span
                    key={j}
                    style={{ backgroundColor: color }}
                    className="h-6 w-6 inline-block"
                  ></span>
                )
              })}
            </div>
          )
        })}
      </div>
      <div>
        <p className="py-4">↓</p>
      </div>
      <div>
        <p
          css={css`
            background: -webkit-linear-gradient(0deg, ${palette.join(',')});
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.2rem;
            line-height: 1.2rem;
            white-space: nowrap;
            animation: ${gradient} 1s linear infinite;
          `}
        >
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
