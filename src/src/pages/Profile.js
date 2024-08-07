import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import './css/Profile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getUserDocument, updateUserPhone, updateUserAddress, updateUserImgUrl, upload_image_ava } from '../server/data-handle';
import { getCurrentUserUID } from '../server/auth';
import { checkAuthState } from '../server/auth';
import CustomerController from '../controller/Customer';
import noavatar from "../components/assets/noavatar.png"

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const [imageFile, setImageFile] = useState(null); // State for selected image file

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authState = await checkAuthState();
                if (authState && authState.user) {
                    const uid = authState.user.uid;
                    const fetchedUserData = await getUserDocument(uid);
                    if (fetchedUserData) {
                        setUserData(fetchedUserData);
                        setTempData(fetchedUserData); // Initialize tempData with fetched user data
                    } else {
                        console.error('No user data found');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const handleEditChange = (e) => {
        setTempData({ ...tempData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Update state with selected file
    };

    const handleSave = async () => {
        try {
            const uid = getCurrentUserUID();
            const updates = [];

            if (tempData.phone !== userData.phone) {
                updates.push(CustomerController.updateUserPhone(uid, tempData.phone));
            }
            if (tempData.address !== userData.address) {
                updates.push(CustomerController.updateUserAddress(uid, tempData.address));
            }
            if (imageFile) {
                // Upload image and get the URL
                const imageUrl = await CustomerController.upload_image_ava(imageFile, uid);
                if (tempData.imageUrl !== imageUrl) {
                    updates.push(CustomerController.updateUserImgUrl(uid, imageUrl));
                    setTempData({ ...tempData, imageUrl }); // Update tempData with new image URL
                }
            } else if (tempData.imageUrl !== userData.imageUrl) {
                updates.push(CustomerController.updateUserImgUrl(uid, tempData.imageUrl));
            }

            await Promise.all(updates);
            setUserData(tempData); // Update state with new data
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleCancel = () => {
        setTempData(userData); // Revert to original data
        setEditMode(false); // Exit edit mode
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Profile">
            <section className="vh-100" style={{ backgroundColor: '#f6edd9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MDBContainer className="h-100" style={{ maxWidth: '90%', maxHeight: '1800px' }}>
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol lg="8" className="mb-0"> 
                            <MDBCard className="mb-0" style={{ borderRadius: '.5rem', width: '100%' }}> 
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <div className="image-container">
                                            <MDBCardImage
                                                src={tempData.imageUrl || noavatar}
                                                alt="Avatar"
                                                className="my-5 circular-image"
                                                fluid
                                            />
                                        </div>
                                        {editMode ? (
                                            <>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="custom-file-input"
                                                    onChange={handleFileChange}
                                                />
                                                <label htmlFor="fileInput" className="custom-file-label">
                                                    Chọn tệp
                                                </label>
                                            </>
                                        ) : (
                                            <MDBTypography tag="h5" style={{ color: 'black', fontsize: '4rem', fontWeight: 'bold' }}>
                                                {userData.fullname || 'Full Name'}
                                            </MDBTypography>
                                        )}
                                        {editMode ? (
                                            <div className="button-group">
                                                <button onClick={handleSave} className="save-button">
                                                    <FontAwesomeIcon icon={faSave} />
                                                </button>
                                                <button onClick={handleCancel} className="cancel-button">
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setEditMode(true)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        )}
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6" className="custom-title">Thông tin tài khoản</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6" className="custom-title">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.email || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6" className="custom-title">Số điện thoại</MDBTypography>
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            value={tempData.phone || ''}
                                                            onChange={handleEditChange}
                                                            placeholder="Phone Number"
                                                            style={{ width: '100%' }}
                                                        />
                                                    ) : (
                                                        <MDBCardText className="text-muted">{userData.phone || 'N/A'}</MDBCardText>
                                                    )}
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className="pt-2">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6" className="custom-title">Giới tính</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.gender || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size='6' className='mb-3'>
                                                    <MDBTypography tag="h6" className="custom-title">Ngày sinh</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.dob || 'N/A'}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className="pt-2">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6" className="custom-title">Địa chỉ</MDBTypography>
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={tempData.address || ''}
                                                            onChange={handleEditChange}
                                                            placeholder="Address"
                                                            style={{ width: '100%' }}
                                                        />
                                                    ) : (
                                                        <MDBCardText className="text-muted">{userData.address || 'N/A'}</MDBCardText>
                                                    )}
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className="pt-2">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6" className="custom-title">Vai trò</MDBTypography>
                                                    <MDBCardText className="text-muted">{userData.role || 'N/A'}</MDBCardText>
                                                </MDBCol>
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
