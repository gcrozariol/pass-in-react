import { Link, LinkProps } from 'react-router-dom'

interface NavLinkInterface extends LinkProps {
  children: React.ReactNode
}

export function NavLink(props: NavLinkInterface) {
  return <Link {...props} className="font-medium text-sm text-zinc-300" />
}
