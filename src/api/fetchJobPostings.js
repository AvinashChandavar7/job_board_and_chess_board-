

const JOB_IDS_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

const JOB_DETAILS_URL = 'https://hacker-news.firebaseio.com/v0/item'


export const fetchJobIds = async () => {
  try {
    const response = await fetch(JOB_IDS_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch job IDs');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching job IDs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    const jobDetailsResponse = await fetch(`${JOB_DETAILS_URL}/${id}.json`);

    if (!jobDetailsResponse.ok) {
      throw new Error('Failed to fetch job details');
    }

    return jobDetailsResponse.json();
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};

export const fetchJobPostings = async (visibleJobs, setJobPostings, setLoading, setError) => {
  setLoading(true);

  try {
    const jobIds = await fetchJobIds();

    const limitedJobIds = jobIds.slice(0, visibleJobs);

    const jobs = await Promise.all(limitedJobIds.map(fetchJobDetails));

    setJobPostings(jobs);

  } catch (error) {
    console.error('Error fetching job postings:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};


// export const fetchJobPostings = async (visibleJobs, setJobPostings, setLoading) => {
//   setLoading(true);
//   try {
//     const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
//     const jobIds = await response.json();
//     const limitedJobIds = jobIds.slice(0, visibleJobs);

//     const jobs = await Promise.all(limitedJobIds.map(async (id) => {
//       const jobDetailsResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
//       return await jobDetailsResponse.json();
//     }));

//     setJobPostings(jobs);
//   } catch (error) {
//     console.error('Error fetching job postings:', error);
//   } finally {
//     setLoading(false);
//   }
// };
