

import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  getPatient, addPatient } from '../../actions/patient';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {

  status: '',
  skills: '',

};

const PatientForm = ({
  getPatient,
  addPatient
}) => {
  const [formData, setFormData] = useState(initialState);

  //const creatingProfile = useMatch('/create-profile');


  const navigate = useNavigate();

  // useEffect(() => {
  //   // if there is no profile, attempt to fetch one
  //   if (!profile) getCurrentProfile();

  //   // if we finished loading and we do have a profile
  //   // then build our profileData
  //   if (!loading && profile) {
  //     const profileData = { ...initialState };
  //     for (const key in profile) {
  //       if (key in profileData) profileData[key] = profile[key];
  //     }
  //     for (const key in profile.social) {
  //       if (key in profileData) profileData[key] = profile.social[key];
  //     }
  //     // the skills may be an array from our API response
  //     if (Array.isArray(profileData.skills))
  //       profileData.skills = profileData.skills.join(', ');
  //     // set local state with the profileData
  //     setFormData(profileData);
  //   }
  // }, [loading, getCurrentProfile, profile]);

  const {
   
    status,
    skills,
    wesbite
   
   
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    // const editing = profile ? true : false;
    e.preventDefault();
    addPatient(formData)
  };

  return (
    <section className="container">
     
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
    <div className="form-group">
          <input
            type="text"
            placeholder="* Status"
            name="status"
            value={status}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

         <div className="form-group">
          <input
            type="text"
            placeholder="* Wesbite"
            name="wesbite"
            value={wesbite}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
       

      


        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

PatientForm.propTypes = {
  addPatient: PropTypes.func.isRequired,
 
  
};

const mapStateToProps = (state) => ({
  getPatient: state.getPatient
});

export default connect(mapStateToProps, { getPatient, addPatient })(
  PatientForm
);