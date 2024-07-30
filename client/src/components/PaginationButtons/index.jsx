import "./index.scss"

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M6.00241 7L0.816406 2L2.37241 0.5L9.11641 7L2.37241 13.5L0.816406 12L6.00241 7Z" fill="currentColor"/>
  </svg>
)

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 12L15.5 17L14 18.5L7.5 12L14 5.5L15.5 7L10.5 12Z" fill="currentColor"/>
  </svg>
)

const PaginationButtons = ({ currentPage, pageCount, handlePageClick }) => {
  // Maximum number of numbered buttons to show at a time
  const maxButtons = 5;

  const start = Math.max(1, Math.min(pageCount - maxButtons + 1, currentPage - Math.floor(maxButtons / 2)))
  const end = Math.min(start + maxButtons, pageCount)

  const pageNumbers = []
  for (let i = start; i < end; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className='pagination' style={{ marginTop: "50px", }}>
      {
        // If end == 0, there are no results
        end > 0 ? (
          <>
            <button
              // Disable button if current page is the first page
              disabled={currentPage === 1}
              onClick={() => handlePageClick(currentPage - 1)}
              className='pagination__button'
            >
              <ChevronLeftIcon />
            </button>
            <button
              key={1}
              onClick={() => handlePageClick(1)}
              className={`pagination__button ${1 === currentPage ? 'active' : ''}`}
            >
              1
            </button>
      
            { pageNumbers[0] > 2 && <p>...</p> }
      
            {
              pageNumbers.map((pageNumber) => {
                if (pageNumber === 1) return
                if (pageNumber === pageCount) return
      
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`pagination__button ${pageNumber === currentPage ? 'active' : ''}`}
                  >
                    { pageNumber }
                  </button>
                )
              })
            }
      
            { pageNumbers[pageNumbers.length - 1] < pageCount - 1 && <p>...</p> }
      
            {
              pageCount > 1 && (
                <button
                  key={pageCount}
                  onClick={() => handlePageClick(pageCount)}
                  className={`pagination__button ${pageCount === currentPage ? 'active' : ''}`}
                >
                  {pageCount}
                </button>
              )
            }
            <button
              // Disable button if current page is the last page
              disabled={currentPage === pageCount}
              onClick={() => handlePageClick(currentPage + 1)}
              className='pagination__button'
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : (
          <p>ei tuloksia</p>
        )
      }


    </div>
  );
};

export default PaginationButtons;