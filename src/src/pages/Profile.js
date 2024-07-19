import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import './css/Profile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getUserDocument } from '../server/data-handle';
import { checkAuthState } from '../server/auth';
import coffee from './../components/assets/coffee_date.jpg';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authState = await checkAuthState();
                if (authState && authState.user) {
                    const uid = authState.user.uid;
                    const fetchedUserData = await getUserDocument(uid);
                    setUserData(fetchedUserData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    if (!userData) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="Profile" >
                <section className="vh-100" style={{ backgroundColor: '#f6edd9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MDBContainer className="h-100 " style={{ maxWidth: '1800px',maxHeight:'1800px' }}>
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol lg="6" className="mb-0"> 
                            <MDBCard className="mb-0" style={{ borderRadius: '.5rem' }}> 
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="my-5" style={{ width: '250px' }} fluid />
                                        <MDBTypography tag="h5" style={{ color: 'black',fontsize: '4rem',fontWeight: 'bold'}}>
                                            {userData.fullname || 'Full Name'}
                                        </MDBTypography>
                                        <button>
                                            <Link to='/ChangeProfile'>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                        </button>
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.email || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.phone || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className="pt-2">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Gender</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.gender || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size='6' className='mb-3'>
                                                    <MDBTypography tag="h6">Date of Birth</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.dob || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className="pt-2">
                                                <MDBTypography tag="h6">Address</MDBTypography>
                                                <MDBCardText className="text-muted">{userData.address || 'N/A'}</MDBCardText>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    );
}

export default Profile;
