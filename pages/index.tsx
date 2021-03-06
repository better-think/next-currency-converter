import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Head from 'next/head'
import Input from '../core-elements/Input'
import { Card } from '../core-elements/Card'
import OutlineButton from '../core-elements/Buttons/OutlineButton'
import { precisionNumber } from '../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightArrowLeft
} from '@fortawesome/free-solid-svg-icons'

const WalletDetails = dynamic(() => import('../components/WalletDetails'), { ssr: false })

const RATES = {
  NETP: 1,
  BUSD: 3,
}

const exchange = (amount: number, fromUnit: number, toUnit: number) => precisionNumber(amount * fromUnit / toUnit);

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nepAmount, setNepAmount] = useState<number>(0);
  const [busdAmount, setBusdAmount] = useState<number>(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onNepChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNepAmount(e.currentTarget.valueAsNumber || 0);
    setBusdAmount(exchange(e.currentTarget.valueAsNumber, RATES.BUSD, RATES.NETP));
  }

  const onBusdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBusdAmount(e.currentTarget.valueAsNumber || 0);
    setNepAmount(exchange(e.currentTarget.valueAsNumber, RATES.NETP, RATES.BUSD));
  }

  return (
    <div>
      <Head>
        <title>Crypto Converter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className="h-screen grid grid-cols-1 gap-4 content-center">
          <div className='w-5/6 max-w-lg m-auto'>
            <Card>
              <div className="p-12">
                <h1 className="font-bold text-2xl">Crypto Converter</h1>
                <Input id='nep' className='mt-8' label='NEP' type='number' placeholder={'0.01'} step={'0.01'}
                  value={nepAmount}
                  onChange={onNepChange}
                />
                <div className="text-center text-slate-400 mt-8">
                  <FontAwesomeIcon size={'2x'} icon={faArrowRightArrowLeft} />
                </div>
                <Input id='busd' className='mt-8' label='BUSD' type='number' placeholder={'0.01'} step={0.01}
                  value={busdAmount}
                  onChange={onBusdChange}
                />
                <div className='text-center mt-8'>
                  <OutlineButton type='button' onClick={toggle} >Check Wallet Details</OutlineButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <WalletDetails isOpen={isOpen} toggle={toggle} />
    </div>
  )
}

export default Home
