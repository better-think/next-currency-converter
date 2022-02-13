import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import type { WalletLink } from '@web3-react/walletlink'
import { useCallback, useState } from 'react'
import { CHAINS, getAddChainParameters, URLS } from '../chains'

export function Connect({
	connector,
	chainId,
	isActivating,
	error,
	isActive,
	toggle
}: {
	connector: MetaMask | WalletConnect | WalletLink | Network
	chainId: ReturnType<Web3ReactHooks['useChainId']>
	isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
	error: ReturnType<Web3ReactHooks['useError']>
	isActive: ReturnType<Web3ReactHooks['useIsActive']>
	toggle: React.MouseEventHandler
}) {
	const isNetwork = connector instanceof Network

	const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1);

	if (isActive) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ marginBottom: '1rem' }} />
				<button onClick={() => connector.deactivate()}
					className='text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-red-500 w-full'
				>Disconnect</button>
			</div>
		)
	} else {
		return (
			<div>
				<p className='text-error text-xl'>{`Wallet not connected. Please click the "Connect Now" button below`}</p>
				<div className='flex flex-row'>
					<button
						className='text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-blue-600 w-1/2'
						onClick={
							isActivating
								? undefined
								: () =>
									connector instanceof WalletConnect || connector instanceof Network
										? connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
										: connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
						}
						disabled={isActivating}
					>
						Connect
					</button>
					<button
						onClick={toggle}
						className='text-black focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-slate-100 w-1/2'
					>
						Cancel
					</button>
				</div>
			</div>
		)
	}
}
