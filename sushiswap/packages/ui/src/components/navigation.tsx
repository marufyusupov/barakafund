import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

import classNames from 'classnames'
import { SushiIcon } from '../icons/SushiIcon'
import { navigationMenuTriggerStyle } from './navigation-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'

const navigationContainerVariants = cva(
  'px-4 sticky flex items-center flex-grow gap-4 top-0 z-50 min-h-[56px] max-h-[56px] h-[56px]',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800',
        transparent: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface NavContainerProps
  extends VariantProps<typeof navigationContainerVariants> {
  children: React.ReactNode
}

const NavigationContainer: React.FC<NavContainerProps> = ({
  children,
  variant,
}) => {
  return (
    <div className={navigationContainerVariants({ variant })}>
      <SushiIcon width={24} height={24} />
      <div className="flex items-center justify-between flex-grow gap-4">
        {children}
      </div>
    </div>
  )
}

export type NavigationElementShow = 'mobile' | 'desktop' | 'everywhere'

const navigationElementShowMap: Record<NavigationElementShow, string> = {
  mobile: 'md:hidden block',
  desktop: 'md:block hidden',
  everywhere: '',
}

export enum NavigationElementType {
  Single = 'single',
  Dropdown = 'dropdown',
  Custom = 'custom',
}

export type NavigationElementSingle = {
  title: string
  href: string
  show: NavigationElementShow
  type: NavigationElementType.Single
}

export type NavigationElementDropdown = {
  title: string
  items: {
    title: string
    href: string
    description: string
  }[]
  show: NavigationElementShow
  type: NavigationElementType.Dropdown
}

export type NavigationElementCustom = {
  item: React.ReactNode
  show: NavigationElementShow
  type: NavigationElementType.Custom
}

export type NavigationElement =
  | NavigationElementSingle
  | NavigationElementDropdown
  | NavigationElementCustom

interface NavProps extends VariantProps<typeof navigationContainerVariants> {
  leftElements: NavigationElement[]
  rightElement?: React.ReactNode
  chainId?: number
}

const Navigation: React.FC<NavProps> = ({
  leftElements: _leftElements,
  rightElement,
  variant,
}) => {
  const leftElements = React.useMemo(() => {
    const SingleItem = (entry: NavigationElementSingle) => {
      return (
        <NavigationMenuItem
          key={entry.title}
          className={navigationElementShowMap[entry.show]}
        >
          <NavigationMenuLink
            href={entry.href}
            className={navigationMenuTriggerStyle}
          >
            {entry.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
      )
    }

    const DropdownItem = (entry: NavigationElementDropdown) => {
      return (
        <NavigationMenuItem
          key={entry.title}
          className={navigationElementShowMap[entry.show]}
        >
          <NavigationMenuTrigger>{entry.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] gap-3 p-4">
              {entry.items.map((component) => (
                <NavigationListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </NavigationListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    return _leftElements.flatMap((el) => {
      switch (el.type) {
        case NavigationElementType.Single:
          return SingleItem(el)
        case NavigationElementType.Dropdown:
          return DropdownItem(el)
        case NavigationElementType.Custom:
          return (
            <div className={navigationElementShowMap[el.show]}>el.item</div>
          )
      }
    })
  }, [_leftElements])

  return (
    <NavigationContainer variant={variant}>
      <NavigationMenu>
        <NavigationMenuList>{leftElements}</NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        {rightElement ? rightElement : null}
      </div>
    </NavigationContainer>
  )
}

interface NavigationListItemProps extends React.ComponentPropsWithoutRef<'a'> {}

const NavigationListItem = React.forwardRef<
  React.ElementRef<'a'>,
  NavigationListItemProps
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {!href ? (
          <a
            ref={ref}
            className={classNames(
              'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            href={href}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
              {children}
            </p>
          </a>
        ) : (
          <Link
            href={href}
            className={classNames(
              'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
              {children}
            </p>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  )
})

NavigationListItem.displayName = 'NavListItem'

export { Navigation, NavigationContainer, NavigationListItem }
