import { Link } from "react-router-dom"

const NavButton = ({ children, style = {}, ...rest }) => {
  return (
    <Link {...rest} style={{ color: 'inherit', textDecoration: "none", cursor: "pointer", ...style }}>
      { children }
    </Link>
  )
}

export default NavButton