/* 
Example usage

// Import component:
import Searchbar from '../../../components/Searchbar/Searchbar';

// Create search handler function. For example:
const [filteredData, setFilteredData] = useState();

const handleSearch = (event) => {
  setPage(1); // Reset page if using pagination
  setFilteredData(
    dataArray.filter((data) =>
    data.toLowerCase().includes(event.target.value.toLowerCase())
    )
  );
};

// Render on page. Pass props for search handler and placeholder text:
<Searchbar handleSearch={handleSearch} placeholder={'Search...'}/>
*/

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
