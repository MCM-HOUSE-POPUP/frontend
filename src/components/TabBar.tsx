import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/home', label: 'Home' },
  { to: '/map', label: 'Map' },
  { to: '/saved', label: 'Saved' },
  { to: '/passport', label: 'Passport' },
]

export default function TabBar() {
  return (
    <nav>
      {tabs.map(({ to, label }) => (
        <NavLink key={to} to={to}>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}