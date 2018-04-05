import React from 'react';

import './job-detail.css';

const jobDetail = (props) => {
  return (
    <div className="job-detail">
      <p className="job-detail__type">{props.type}</p>
      <p className="job-detail__value">{props.data}</p>
    </div>
  );
};

export default jobDetail;