import { Icon } from '@iconify/react';

function Hyperlink(props) {
  return (
  <div className="link__wrapper">
    <a href={props.linkSource}>{props.linkText}</a>
    <Icon icon="akar-icons:link-out" />
  </div>
  )
}

export default Hyperlink;
