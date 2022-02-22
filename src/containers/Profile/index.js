import React, { useState, useEffect } from 'react';
import { IconButton, Button, TextField } from '@material-ui/core';
import { AccountCircle, Edit } from '@material-ui/icons';
import Dropzone from 'react-dropzone';

import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';
import { getProfile, updateProfile } from '../../apis/profile.api';
import './style.scss';

const ProfilePage = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        setIsLoading(true);
        getProfile()
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const [isEditingMode, setIsEditingMode] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changeAvatar = (value) => {
        setAvatar(value[0]);
    };

    useEffect(() => {
        if (isEditingMode) {
            setName(data.name);
            setShippingAddress(data.shippingAddress);
            setExternalLink(data.externalLink);
        }
    }, [data.externalLink, data.name, data.shippingAddress, isEditingMode]);

    const update = () => {
        setIsLoading(true);
        updateProfile({ name, shippingAddress, externalLink })
            .then((res) => {
                setData(res.data);
            })
            .finally(() => {
                setIsLoading(false);
                setIsEditingMode(false);
            });
    };

    return (
        <Layout title="Profile">
            <div className="profile-page">
                <div className="user-avatar">
                    <div className="photo">
                        {isEditingMode ? (
                            <Dropzone
                                name="file"
                                className="drop-zone"
                                multiple={false}
                                accept="image/*"
                                onDrop={changeAvatar}
                            >
                                {avatar ? (
                                    <img src={avatar.preview} alt="" />
                                ) : (
                                    <Button className="choose-btn">
                                        Choose Image
                                    </Button>
                                )}
                            </Dropzone>
                        ) : (
                            <AccountCircle />
                        )}
                    </div>

                    {isEditingMode ? (
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <div className="name">
                            <span>{data.name}</span>
                        </div>
                    )}
                </div>

                <div className="form-field">
                    <label>Address:</label>
                    {isEditingMode ? (
                        <TextField
                            variant="outlined"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    ) : (
                        <p>{data.shippingAddress}</p>
                    )}
                </div>

                <div className="form-field">
                    <label>Web Site Link:</label>
                    {isEditingMode ? (
                        <TextField
                            variant="outlined"
                            value={externalLink}
                            onChange={(e) => setExternalLink(e.target.value)}
                        />
                    ) : (
                        <a href={data.externalLink}>{data.externalLink}</a>
                    )}
                </div>

                {!isEditingMode ? (
                    <IconButton
                        onClick={() => setIsEditingMode(true)}
                        className="edit-btn"
                    >
                        <Edit />
                    </IconButton>
                ) : (
                    <div className="actions">
                        <Button
                            color="default"
                            variant="contained"
                            onClick={() => setIsEditingMode(false)}
                        >
                            Cancel
                        </Button>
                        <Button color="" variant="contained" onClick={update}>
                            Update
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="overlay">
                        <Spinner />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProfilePage;
