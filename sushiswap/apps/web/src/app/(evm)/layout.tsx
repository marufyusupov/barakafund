import type { Metadata } from 'next'
import { headers } from 'next/headers'
import React from 'react'
import { SanctionedAddressDialog } from 'src/lib/wagmi/components/sanctioned-address-dialog'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Sushi 🍣',
    template: '%s | Sushi 🍣',
  },
  description:
    'A Decentralised Finance (DeFi) app with features such as swap, cross chain swap, streaming, vesting, and permissionless market making for liquidity providers.',
}

export default function EvmLayout({ children }: { children: React.ReactNode }) {
  const cookie = headers().get('cookie')
  return (
    <Providers cookie={cookie}>
      <div className="flex flex-col h-full">
        <SanctionedAddressDialog />
        {children}
      </div>
    </Providers>
  )
}
