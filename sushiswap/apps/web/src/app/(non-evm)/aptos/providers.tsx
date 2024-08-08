'use client'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter'
import { MSafeWalletAdapter } from '@msafe/aptos-wallet-adapter'
import { PontemWallet } from '@pontem/wallet-adapter-plugin'
import { RiseWallet } from '@rise-wallet/wallet-adapter'
import { BaseProviders } from '@sushiswap/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter'
import { PetraWallet } from 'petra-plugin-wallet-adapter'
import { Modal } from '~aptos/(common)/components/Modal/Modal'
import { chains } from '~aptos/(common)/config/chains'

const wallets = [
  new PetraWallet(),
  new PontemWallet(),
  new FewchaWallet(),
  new MartianWallet(),
  new RiseWallet(),
  new MSafeWalletAdapter(
    Object.values(chains).map((chain) => chain.other.MSafeOrigin),
  ),
]

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
          <BaseProviders>
            <Modal.Provider>{children}</Modal.Provider>
          </BaseProviders>
        </AptosWalletAdapterProvider>
      </QueryClientProvider>
    </>
  )
}
