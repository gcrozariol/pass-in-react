import { ComponentProps } from 'react'

interface NavLinkInterface extends ComponentProps<'a'> {
  children: React.ReactNode
}

export function NavLink(props: NavLinkInterface) {
  return <a {...props} className="font-medium text-sm text-zinc-300" />
}
