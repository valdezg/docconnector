

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { getPatients, addComment, getPatient, addPatient, deletePatient } from '../../actions/patient';

const PatientItem = ({
  addComment,
  auth,
  wesbite,
  patient: { _id, skills, website,comments, user ,name, avatar, status, date }
}) => (

    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{skills}</p>
      <p className="my-3">{wesbite}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      <p className="my-2">{status}</p>

       <Link to={`/patients/${_id}`} className="btn btn-primary">
        Discussion{' '}
        
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deletePatient(_id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}


    </div>
  </div>
);

PatientItem.propTypes = {
  patient: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment, addPatient, getPatients })(
  PatientItem
);