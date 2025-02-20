import React from 'react'
import { Weather } from './components/Weather'
import styles from "./App.module.css"

export const App = () => {
  return (
    <div className={styles.App}>
      <Weather/>
    </div>
  )
}

