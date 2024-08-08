import React, { FC, useMemo } from 'react'
import { formatNumberWithDecimals } from '~aptos/(common)/lib/common/format-number-with-decimals'
import { PoolExtended } from '~aptos/pool/lib/use-pools-extended'
import { Row } from './types'

export const PoolReserveCell: FC<Row<PoolExtended>> = ({ row }) => {
  const { token0, token1 } = row

  const [reserve0, reserve1] = useMemo(() => {
    return [
      formatNumberWithDecimals(Number(row?.reserve0), token0.decimals),
      formatNumberWithDecimals(Number(row?.reserve1), token1.decimals),
    ]
  }, [row, token0, token1])

  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-slate-50">
          {parseFloat(reserve0)} {token0?.symbol}{' '}
          <span className="font-normal text-gray-900 dark:text-slate-500">
            /
          </span>{' '}
          {parseFloat(reserve1)} {token1?.symbol}{' '}
        </span>
      </div>
    </div>
  )
}
