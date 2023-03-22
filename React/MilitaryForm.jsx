import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toastr from 'toastr';
import DatePicker from 'react-datepicker';
import lookUpService from '../../services/lookUpService';
import militaryProfileService from '../../services/militaryProfileService';
import { militaryProfileSchema } from '../../schemas/militaryProfileSchema';
import './formstyles.css';
import 'react-datepicker/dist/react-datepicker.css';

function MilitaryForm() {
    const onSubmit = (values) => {
        militaryProfileService.addProfile(values).then(submitSuccess).catch(submitError);
    };

    const formik = useFormik({
        initialValues: {
            monthlyIncome: '',
            moveInDate: '',
            noLaterThanDate: '',
            isActiveDuty: false,
            branchId: 0,
            rankId: 0,
            hasHousingAllowance: false,
            unit: '',
        },
        validationSchema: militaryProfileSchema,
        onSubmit: onSubmit,
    });

    const [rank, setRank] = useState([]);
    const [branch, setBranch] = useState([]);

    useEffect(() => {
        lookUpService.LookUp(['Branches', 'MilitaryRanks']).then(onSuccessLookUp).catch(onLookUpError);
    }, []);

    const mapBranches = branch.map((data) => (
        <option key={`id-${data.id}-${data.name}`} value={data.id}>
            {data.name}
        </option>
    ));

    const mapRanks = rank.map((data) => (
        <option key={`id-${data.id}-${data.name}`} value={data.id}>
            {data.name}
        </option>
    ));

    toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '5000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
    };

    const onSuccessLookUp = (data) => {
        setBranch(data.item.branches);
        setRank(data.item.militaryRanks);
    };

    const onLookUpError = () => {
        toastr.error('Page failed to connect');
    };

    const submitSuccess = () => {
        toastr.success('Military profile created succesfully!');
    };

    const submitError = () => {
        toastr.error('Something went wrong, please try again.');
    };

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <h5 className="mb-4 text-uppercase">
                    <i className="mdi mdi-account-circle me-1"></i>
                    Create Your Military Profile
                </h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="branchname" className="form-label">
                                Branch
                            </label>
                            <select
                                name="branchId"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.branchId}>
                                <option></option>
                                {mapBranches}
                            </select>
                            {formik.touched.branchId && formik.errors.branchId ? (
                                <div className="military-profile-error-form">{formik.errors.branchId}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="rankname" className="form-label">
                                Rank
                            </label>
                            <select
                                name="rankId"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.rankId}>
                                <option></option>
                                {mapRanks}
                            </select>
                            {formik.touched.rankId && formik.errors.rankId ? (
                                <div className="military-profile-error-form">{formik.errors.rankId}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">
                                Unit
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Unit"
                                id="unit"
                                name="unit"
                                onChange={formik.handleChange}
                                value={formik.values.unit}
                            />
                            {formik.touched.unit && formik.errors.unit ? (
                                <div className="military-profile-error-form">{formik.errors.unit}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Monthly Income</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Monthly Income"
                                id="monthlyIncome"
                                name="monthlyIncome"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.monthlyIncome}
                            />
                            {formik.touched.monthlyIncome && formik.errors.monthlyIncome ? (
                                <div className="military-profile-error-form">{formik.errors.monthlyIncome}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <div className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    name="hasHousingAllowance"
                                    id="hasHousingAllowance"
                                    className="form-check-input"
                                    onChange={formik.handleChange}
                                    value={formik.values.hasHousingAllowance}
                                />
                                {formik.touched.hasHousingAllowance && formik.errors.hasHousingAllowance ? (
                                    <div className="military-profile-error-form">
                                        {formik.errors.hasHousingAllowance}
                                    </div>
                                ) : null}
                                <label className="form-check-label">Housing Allowance</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <div className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    name="isActiveDuty"
                                    id="isActiveDuty"
                                    className="form-check-input"
                                    onChange={formik.handleChange}
                                    value={formik.values.isActiveDuty}
                                />
                                {formik.touched.isActiveDuty && formik.errors.isActiveDuty ? (
                                    <div className="military-profile-error-form">{formik.errors.isActiveDuty}</div>
                                ) : null}
                                <label className="form-check-label">Active Duty</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Move In Date </label>
                            <DatePicker
                                selected={new Date()}
                                onChange={(date) => {
                                    let dateString = date.toLocaleDateString('fr-CA');
                                    formik.setFieldValue('moveInDate', dateString);
                                }}
                                value={formik.values.moveInDate}
                                className="form-control"
                                type="date"
                                name="moveInDate"
                            />
                            {formik.touched.moveInDate && formik.errors.moveInDate ? (
                                <div className="military-profile-error-form">{formik.errors.moveInDate}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">No Later Than Date</label>
                            <DatePicker
                                selected={new Date()}
                                onChange={(date) => {
                                    let dateString = date.toLocaleDateString('fr-CA');
                                    formik.setFieldValue('noLaterThanDate', dateString);
                                }}
                                value={formik.values.noLaterThanDate}
                                className="form-control"
                                type="date"
                                name="noLaterThanDate"
                            />
                            {formik.touched.noLaterThanDate && formik.errors.noLaterThanDate ? (
                                <div className="military-profile-error-form">{formik.errors.noLaterThanDate}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-success mt-2 mb-3">
                        <i className="mdi mdi-content-save" /> Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MilitaryForm;
