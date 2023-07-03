import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="text-3xl font-bold underline">
        test
      </div>
    </main>
  )
}
