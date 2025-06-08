import './index.css'

const Pagination = ({currentPage, setPage}) => {
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1)
  }

  const handleNext = () => {
    setPage(currentPage + 1)
  }

  return (
    <div className="pagination">
      <button type="button" onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default Pagination
