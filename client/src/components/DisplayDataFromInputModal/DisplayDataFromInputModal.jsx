import { Icon } from '@iconify/react';
import './displayDataFromInputModal.scss'

const DisplayDataFromInputModal = ({ savedDataTitle }) => {
    return (
      <div>
        <ul>
          {savedDataTitle.map((title, index) => (
            <li
              key={index}
              className='list_group_skills_titles'
            >
              <span className='title'>
                {index + 1}. {title}{' '}
              </span>
              <span>
                {' '}
                <Icon icon='uil:pen' color='#0000bf' />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default DisplayDataFromInputModal;