import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PatientItem from './PatientItem';
import PatientForm from './PatientForm';
import { getPatients } from '../../actions/patient';

const Patients = ({ getPatients, patient: { patients } }) => {
  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <section className="container">
      <h1 className="large text-primary">Patients</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PatientForm />
      <div className="patients">
        {patients.map((patient) => (
          <PatientItem key={patient._id} patient={patient} />
        ))}
      </div>
    </section>
  );
};

Patients.propTypes = {
  getPatients: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  patient: state.patient
});

export default connect(mapStateToProps, { getPatients })(Patients);