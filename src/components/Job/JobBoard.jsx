
const JobBoard = ({ job }) => {
  return (
    <div key={job.id} className='job_card' >
      <h2 className='job_card-title'>
        {job.url ? (
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            {job.title}
          </a>
        ) : (
          job.title
        )}
      </h2>
      <p>Posted by {job.by} on {new Date(job.time * 1000).toLocaleDateString()}</p>

    </div>
  )
}

export default JobBoard


