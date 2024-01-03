import { useEffect, useState } from 'react'



import './Job.css'
import { fetchJobPostings } from '../../api/fetchJobPostings';
import JobBoard from './JobBoard';
import LoadMoreButton from './LoadMoreButton';
import { Link } from 'react-router-dom';


const Job = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(6);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobPostings(visibleJobs, setJobPostings, setLoading, setError);
  }, [visibleJobs]);

  const loadMorePostings = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 6);
  }

  return (
    <div className='job-container'>

      <div className='job_sub_container'>

        <h1 className='job-title'>
          Hacker News Jobs Board
        </h1>


        <Link to="/chessboard">
          <button className='chess-btn'>
            ChessBoard
          </button>
        </Link>
      </div>


      <div >
        {jobPostings.map((job) => (
          <JobBoard key={job.id} job={job} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {!loading && jobPostings.length > 0 && (
        <LoadMoreButton onClick={loadMorePostings} disabled={jobPostings.length > visibleJobs} />
      )}


    </div>
  );
};

export default Job;