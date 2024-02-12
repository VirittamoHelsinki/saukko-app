
import React from 'react';
import { Icon } from '@iconify/react';

function Searchbar(props) {
  return(
    <div className='searchField__container'>
      <input onChange={props.handleSearch} placeholder={props.placeholder} />
      <Icon icon='material-symbols:search' hFlip={true} />
    </div>
  );
}

export default Searchbar;
