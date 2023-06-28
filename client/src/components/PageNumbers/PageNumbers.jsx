import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import DegreeContext from '../../utils/context/DegreeContext';

const PageNumbers = ({ activePage, totalPages }) => {
  const navigate = useNavigate();

  // Get degree from DegreeContext
  const { degree } = useContext(DegreeContext);

  return (
    <div className="page-numbers__wrapper">
      <div className="page-numbers__wrapper--numbers">
        {[...Array(totalPages)].map((_, pageIndex) => {
          const page = pageIndex + 1;
          const isCurrentPage = activePage === page;
          const isPageDone = activePage > page;
          const isPageClickable = activePage >= page;
          const circleClassName = `circle ${isCurrentPage ? 'active' : isPageDone ? 'done' : ''}`;

          return (
            <div key={pageIndex} className={circleClassName}>
              {isCurrentPage ? (
                <span className={`number ${isPageClickable ? 'active' : ''}`}>{page}</span>
              ) : (
                <Icon icon="mdi:tick" color="white" />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <div className="page-numbers__wrapper--text">
          {[...Array(totalPages)].map((_, pageIndex) => {
            const page = pageIndex + 1;
            const isPageClickable = activePage >= page;
            const textClassName = `page-text ${activePage >= page ? 'active' : ''}`;

            return (
              <span
                key={pageIndex}
                className={textClassName}
                onClick={() => navigate(`/degrees/${degree._id}/units/confirm-selection`)}
              >
                {`Page ${page}`}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

PageNumbers.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PageNumbers;
