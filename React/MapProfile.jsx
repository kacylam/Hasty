import React from 'react';
import PropTypes from 'prop-types';
import { User } from 'react-feather';
import './formstyles.css';

function MapProfile(props) {
  const aProfile = props.profile;

  let moveDate = aProfile.moveInDate.slice(0, 10);
  let lateDate = aProfile.noLaterThanDate.slice(0, 10);

  return (
    <div className="col-md-4">
      <div className="card military-card">
        <div className="card-body text-center">
          {aProfile.user.avatarUrl &&
          (aProfile.user.avatarUrl.endsWith('.png') ||
            aProfile.user.avatarUrl.endsWith('.jpg') ||
            aProfile.user.avatarUrl.endsWith('.bmp')) ? (
            <img
              src={aProfile.user.avatarUrl}
              className="rounded-circle avatar-lg img-thumbnail military-image"
              alt="Profile"
            />
          ) : (
            <User size={95} />
          )}
          <h4 className="text-center">
            {aProfile.user.firstName} {aProfile.user.lastName}
          </h4>
          <div className="text-start mt-3">
            <p className="text-muted mb-2 font-13">
              <strong>Email :</strong> <span className="ms-2">{aProfile.email}</span>
            </p>
            <p className="text-muted mb-2 font-13">
              <strong> Unit :</strong> <span className="ms-2 "> {aProfile.unit} </span>
            </p>
            <p className="text-muted mb-2 font-13">
              <strong> Monthly Income :</strong>
              <span className="ms-2 "> {aProfile.monthlyIncome} </span>
            </p>
            <p className="text-muted mb-2 font-13">
              <strong>Branch :</strong>
              <span className="ms-2">{aProfile.branch.name} </span>
            </p>
            <p className="text-muted mb-2 font-13">
              <strong>Rank :</strong>
              <span className="ms-2">{aProfile.rank.name}</span>
            </p>
            <p className="text-muted mb-2 font-13">
              <strong>Move in date :</strong>
              <span className="ms-2 "> {moveDate} </span>
            </p>
            <p className="text-muted mb-1 font-13">
              <strong>No later than date :</strong>
              <span className="ms-2 ">{lateDate} </span>
            </p>
            <div className="row mt-2">
              <div className="col">
                <div className="text-muted mb-1 font-13">
                  {' '}
                  {aProfile.hasHousingAllowance ? 'Housing Allowance' : 'No Housing Allowance'}{' '}
                </div>
              </div>
              <div className="col">
                <div className="text-muted mb-1 font-13">
                  {' '}
                  {aProfile.isActiveDuty ? 'Active Duty' : 'Not Active Duty'}{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MapProfile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    email: PropTypes.string.isRequired,
    monthlyIncome: PropTypes.number.isRequired,
    moveInDate: PropTypes.string.isRequired,
    isActiveDuty: PropTypes.bool.isRequired,
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rank: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    hasHousingAllowance: PropTypes.bool.isRequired,
    unit: PropTypes.string.isRequired,
    noLaterThanDate: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
  }),
};

export default MapProfile;
