import React, { useState } from 'react'
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
          onBlur={(e) => {
            setAA(e.target.value)
          }}
        ></textarea>
      </div>
      <div>
        <p>↓</p>
      </div>
      <div>
        <p className={classes.gaming}>{AA}</p>
      </div>
    </div>
  )
}
