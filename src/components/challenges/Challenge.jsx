import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import ShortAnswer from './questions/ShortAnswer.jsx';

const Challenge = ({ data }) => {
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (data.instructions_path) {
      fetch(data.instructions_path)
        .then((res) => res.text())
        .then((html) => setInstructions(html))
        .catch(console.error);
    } else {
      setInstructions(data.instructions || '');
    }
  }, [data]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset this challenge? All progress and submitted questions will be lost.")) {
      localStorage.removeItem(data.uid);
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header_breadcrumb">
          <Link to={`/`} className="header_breadcrumb_item">SOC 201 Labs</Link>
          <Link to={`/${data.uid}`} className="header_breadcrumb_item">{data.uid}</Link>
        </div>
      </div>

      <div className="challenge_form">
        <div className="challenge_metadata">
          <h1>[{data.uid}] {data.title}</h1>
          <div className="challenge_metadata_fields">
            <div className="challenge_metadata_field">
              <span className="metadata_label">Case Number</span>
              <span className="metadata_value">{data.uid}</span>
            </div>

            <div className="challenge_metadata_field">
              <span className="metadata_label">Domain</span>
              <span className="metadata_value">{data.module}</span>
            </div>

            <div className="challenge_metadata_field">
              <span className="metadata_label">Assignee</span>
              <span className="metadata_value">
                <FontAwesomeIcon icon={faCircleUser} /> {data.assignee}
              </span>
            </div>

            <div className="challenge_metadata_field">
              <span className="metadata_label">Status</span>
              <span className="metadata_value">{data.status}</span>
            </div>

            <div className="challenge_metadata_field">
              <span className="metadata_label">Time Estimate</span>
              <span className="metadata_value">{data.time_estimate}</span>
            </div>

<div className="challenge_metadata_field">
  <span className="metadata_label">Tags</span>
  <span className="metadata_value">
    {data.tags.map((tag, index) => (
      <code key={index} style={{ marginRight: "4px" }}>{tag}</code>
    ))}
  </span>
</div>


          </div>
        </div>

        <div>
          <h2>Instructions:</h2>
          <div
            className="challenge_instructions"
            dangerouslySetInnerHTML={{ __html: instructions }}
          />
        </div>

        <div className="questions">
          {data.questions.map((question, index) => (
            <ShortAnswer key={index} data={question} index={index + 1} uid={data.uid} />
          ))}
        </div>

        <div className="reset_button">
          <button
            type="button"
            className="challenge_question_reset_button"
            onClick={handleReset}
          >
            Reset Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
