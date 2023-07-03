'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import PixiStage from './components/pixi-with-matter'
import { useState } from 'react'
import MatterOnly from './components/matter-only'

export default function Home() {
  const [pixiWithMatterTarget, setPMTarget] = useState<HTMLElement>();
  
  return (
    <main className={styles.main}>
      <div className='flex justify-center items-center flex-col'>
        <h1 className="text-3xl font-bold underline">Pixi with matter</h1>
        <div ref={(ref) => setPMTarget(ref as HTMLElement)}>
          <PixiStage target={pixiWithMatterTarget}/>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold underline">Matter only</h1>
        <MatterOnly />
      </div>
    </main>
  )
}
