import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import PixiStage from './components/pixi-stage'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="text-3xl font-bold underline">
        test
        <PixiStage />
      </div>
    </main>
  )
}
