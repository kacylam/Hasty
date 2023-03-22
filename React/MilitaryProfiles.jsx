import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination';
import toastr from 'toastr';
import { Formik, Field, Form } from 'formik';
import './formstyles.css';
import '../elements/elements.css';
import MapProfile from './MapProfile';
import militaryProfileService from '../../services/militaryProfileService';
import Header from '../elements/Header';

function MilitaryListings() {
    const [pageData, setPageData] = useState({
        profileData: { arrayOfProfiles: [], profilesComponents: [] },
        pageIndex: 0,
        pageSize: 6,
        totalCount: 0,
        query: '',
    });

    useEffect(() => {
        if (pageData.query) {
            militaryProfileService
                .searchPaginate(pageData.pageIndex, pageData.pageSize, pageData.query)
                .then(onSearchSuccess)
                .catch(onSearchError);
        } else {
            militaryProfileService
                .getLists(pageData.pageIndex, pageData.pageSize)
                .then(onListSuccess)
                .catch(onListError);
        }
    }, [pageData.pageIndex, pageData.query]);

    const mapProfiles = (profile) => {
        return <MapProfile profile={profile} key={profile.id} />;
    };

    const onListError = () => {
        toastr.error('Page failed to connect. Unable to show profiles.');
    };

    const onListSuccess = (data) => {
        const arrayProfilesTemp = data.item.pagedItems;

        setPageData((prevState) => {
            const newData = { ...prevState };
            newData.profileData.arrayOfProfiles = arrayProfilesTemp;
            newData.profileData.profileComponents = arrayProfilesTemp.map(mapProfiles);
            newData.totalCount = data.item.totalCount;
            return newData;
        });
    };

    const onSearchSuccess = (data) => {
        const arrayProfilesTemp = data.item.pagedItems;

        setPageData((prevState) => {
            const newData = { ...prevState };
            newData.profileData.arrayOfProfiles = arrayProfilesTemp;
            newData.profileData.profileComponents = arrayProfilesTemp.map(mapProfiles);
            newData.totalCount = data.item.totalCount;
            return newData;
        });
    };

    const onSearchError = () => {
        toastr.error('Unable to find profiles that match the search terms.');
    };

    const onChange = (page) => {
        setPageData((prevState) => {
            let newIndex = { ...prevState };
            newIndex.pageIndex = page - 1;
            return newIndex;
        });
    };

    const onSearchClicked = (value) => {
        setPageData((prevState) => {
            let newData = { ...prevState };
            newData.pageIndex = 0;
            newData.query = value.query;

            return newData;
        });
    };

    const crumbs = [
        {
            name: 'Dashboard',
            path: '/dashboard',
        },
    ];

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Header title="Military Profiles" crumbs={crumbs} />
                </Col>
            </Row>
            <Card>
                <Container className="mt-3">
                    <Row>
                        <Col>
                            <Pagination
                                onChange={onChange}
                                current={pageData.pageIndex + 1}
                                total={pageData.totalCount}
                                pageSize={pageData.pageSize}
                                locale={locale}
                                className="mt-2"
                            />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Formik enableReinitialize={true} initialValues={pageData} onSubmit={onSearchClicked}>
                                <Form md={{ span: 1 }}>
                                    <div className="military-profile-side-by-side mb-2">
                                        <Field type="text" name="query" className="form-control"></Field>
                                        <button className="btn military-profile-btn-color-font" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>
                    <Row>{pageData.profileData.profileComponents}</Row>
                </Container>{' '}
            </Card>
        </React.Fragment>
    );
}

export default MilitaryListings;
