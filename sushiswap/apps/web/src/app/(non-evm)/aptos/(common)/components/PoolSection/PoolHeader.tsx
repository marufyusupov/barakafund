import { LinkExternal, classNames, typographyVariants } from '@sushiswap/ui'
import { Button } from '@sushiswap/ui'
import { FC } from 'react'
import { networkNameToNetwork } from '~aptos/(common)/config/chains'
import { useNetwork } from '~aptos/(common)/lib/common/use-network'
import { CurrencyIcon } from '~aptos/(common)/ui/currency/currency-icon'
import { CurrencyIconList } from '~aptos/(common)/ui/currency/currency-icon-list'
import { Pool } from '~aptos/pool/lib/convert-pool-to-sushi-pool'
import { useTokensFromPool } from '~aptos/pool/lib/use-tokens-from-pool'

interface PoolHeader {
  row: Pool
}

export const PoolHeader: FC<PoolHeader> = ({ row }) => {
  const {
    network,
    contracts: { swap: swapContract },
  } = useNetwork()

  const { token0, token1 } = useTokensFromPool(row)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center gap-3 max-w-[100vh]">
          <CurrencyIconList iconWidth={36} iconHeight={36}>
            <CurrencyIcon currency={token0} />
            <CurrencyIcon currency={token1} />
          </CurrencyIconList>
          <Button
            asChild
            variant="link"
            className={typographyVariants({
              variant: 'h1',
              className:
                'sm:!text2-xl sm:!text-4xl !font-bold text-gray-900 dark:text-slate-50 truncate overflow-x-auto',
            })}
          >
            <LinkExternal
              className="flex flex-col !no-underline group"
              href={`https://explorer.aptoslabs.com/account/${swapContract}/coins?network=${networkNameToNetwork(
                network,
              )}`}
            >
              {token0.symbol}/{token1.symbol}
            </LinkExternal>
          </Button>
          <div
            className={classNames(
              'bg-pink/20 text-pink',
              'text-sm px-2 py-1 font-semibold rounded-full mt-0.5',
            )}
          >
            V2
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-y-5 gap-x-[32px] text-secondary-foreground mb-8 mt-1.5">
        {/* <div className="flex items-center gap-1.5">
          <span className="tracking-tighter font-semibold">APR</span>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted underline-offset-2">
                  {formatPercent(0)}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                The APR displayed is algorithmic and subject to change.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}
        <div className="flex items-center gap-1.5">
          <span className="tracking-tighter font-semibold">Network</span>
          Aptos
        </div>
      </div>
    </div>
  )
}
