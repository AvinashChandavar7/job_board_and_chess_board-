
const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='load_more-button'
    >
      Load more jobs
    </button>
  )
}

export default LoadMoreButton