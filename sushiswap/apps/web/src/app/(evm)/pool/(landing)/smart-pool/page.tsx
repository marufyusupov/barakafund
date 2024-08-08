import { Container } from '@sushiswap/ui'
import React from 'react'

import { SmartPoolsTable } from 'src/ui/pool/SmartPoolsTable'
import { TableFiltersFarmsOnly } from 'src/ui/pool/TableFiltersFarmsOnly'
import { TableFiltersNetwork } from 'src/ui/pool/TableFiltersNetwork'
import { TableFiltersPoolType } from 'src/ui/pool/TableFiltersPoolType'
import { TableFiltersResetButton } from 'src/ui/pool/TableFiltersResetButton'
import { TableFiltersSearchToken } from 'src/ui/pool/TableFiltersSearchToken'

export default async function PoolPage() {
  return (
    <Container maxWidth="7xl" className="px-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <TableFiltersSearchToken />
        <TableFiltersPoolType />
        <TableFiltersNetwork />
        <TableFiltersFarmsOnly />
        <TableFiltersResetButton />
      </div>
      <SmartPoolsTable />
    </Container>
  )
}
