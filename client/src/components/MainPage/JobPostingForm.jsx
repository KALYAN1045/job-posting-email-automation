import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import "./JobPostingForm.css";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experienceLevel: '',
    candidates: [], // This will now hold an array of candidate emails
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCandidateAdd = (email) => {
    setFormData(prevData => ({
      ...prevData,
      candidates: [...prevData.candidates, email],
    }));
  };

  const handleCandidateRemove = (email) => {
    setFormData(prevData => ({
      ...prevData,
      candidates: prevData.candidates.filter(c => c !== email),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData); // Adjust the URL as per your backend setup
      console.log(response.data);
      alert("Job created and emails sent!");

      setFormData({
        jobTitle: '',
        jobDescription: '',
        experienceLevel: '',
        candidates: [],
        endDate: '',
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error creating the job or sending emails.");
    }
  };

  return (
    <div className="job-form-container">
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Enter Job Description"
            required
          />
        </div>

        <div className="form-group">
          <label>Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label>Add Candidate</label>
          <div className="candidates-input">
            {formData.candidates.map((email) => (
              <div key={email} className="candidate-tag">
                {email}
                <span onClick={() => handleCandidateRemove(email)}>&times;</span>
              </div>
            ))}
            <input
              type="email"
              placeholder="xyz@gmail.com"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCandidateAdd(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            placeholder='Select a Date'
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;
