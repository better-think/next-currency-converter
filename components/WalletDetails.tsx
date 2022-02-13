import React, { MouseEventHandler, useState, FC, memo, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from '../core-elements/Modal';
import { hooks, metaMask } from '../connectors/metaMask'
import { Connect } from './ConnectButton'
import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import type { Web3ReactHooks } from '@web3-react/core'
import { trimAddress } from '../utils/common'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

interface WalletDetailProps {
	isOpen: boolean,
	toggle: MouseEventHandler<HTMLButtonElement>
}

interface DetailProps {
	account: string | undefined,
	chainId: number | undefined,
	balance: string | undefined
}

const styles = {
	firstCol: 'py-4 border-b-2 border-slate-50',
	secondCol: 'py-4 border-b-2 border-slate-50 text-right',
}

function useBalances(
	provider?: ReturnType<Web3ReactHooks['useProvider']>,
	accounts?: string[]
): BigNumber[] | undefined {
	const [balances, setBalances] = useState<BigNumber[] | undefined>()

	useEffect(() => {
		if (provider && accounts?.length) {
			let stale = false

			void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
				if (!stale) {
					setBalances(balances)
				}
			})

			return () => {
				stale = true
				setBalances(undefined)
			}
		}
	}, [provider, accounts])

	return balances
}

const DetailTable: FC<DetailProps> = ({ account, chainId, balance }) => {
	return (
		<>
			<div className='px-6 pt-5'>
				<table className='table-auto w-full'>
					<thead>
						<tr>
							<th className='text-left border-b-2 border-slate-50'>KEY</th>
							<th className='text-right border-b-2 border-slate-50'>VALUE</th>
						</tr>
					</thead>
					<tbody>
						<tr className=''>
							<td className={styles.firstCol}>Account</td>
							<td className={styles.secondCol}>{trimAddress(account || '')}</td>
						</tr>
						<tr>
							<td className={styles.firstCol}>Chain ID</td>
							<td className={styles.secondCol}>{chainId}</td>
						</tr>
						<tr>
							<td className={styles.firstCol}>Balance</td>
							<td className={styles.secondCol}>{balance}</td>
						</tr>
					</tbody>
				</table>
				<p className='pt-4 text-center'>Wallet details</p>
			</div>
		</>

	)
}

const MemorizedDetailTable = memo(DetailTable);

const WalletDetails: React.FC<WalletDetailProps> = ({ isOpen, toggle }) => {
	const [errorText, setErrorText] = useState(`Error`);

	const chainId = useChainId()
	const accounts = useAccounts()
	const error = useError()
	const isActivating = useIsActivating()

	const isActive = useIsActive()

	const provider = useProvider()
	const balances = useBalances(provider, accounts)

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader>Wallet details</ModalHeader>
			<ModalBody>
				{
					isActive && balances &&
					<MemorizedDetailTable account={accounts?.[0]} balance={balances?.length > 0 ? `Ξ${formatEther(balances[0])}` : ''} chainId={chainId} />
				}
				<Connect
					connector={metaMask}
					chainId={97}
					isActivating={isActivating}
					error={error}
					isActive={isActive}
					toggle={toggle}
				/>
			</ModalBody>
		</Modal>
	)
}

export default WalletDetails