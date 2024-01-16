import { Icon } from '@iconify/react';

const DisplayDataFromInputModal = ({ savedDataTitle }) => {
    return (
      <div>
        <ul>
          {savedDataTitle.map((title, index) => (
            <li
              key={index}
              className='list_group_skills_title'
            >
              <span className='title' style={{ flex: '1' }} >
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