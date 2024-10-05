import { Link, LinkProps, useLocation } from 'react-router-dom'

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation() // retorna a rota atual
  return (
    <Link
      data-current={pathname === props.to}
      className="font flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current-true]:text-foreground"
      {...props}
    />
  )
}