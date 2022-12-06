import React, { useState, useEffect } from 'react';
import { IconButton, Button, TextField } from '@material-ui/core';
import { AccountCircle, Edit } from '@material-ui/icons';
import Dropzone from 'react-dropzone';

import Layout from '../../components/Layout';
import Spinner from '../../components/Common/Spinner';
// import { getProfile, updateProfile } from '../../apis/profile.api';
import './style.scss';
import { useSelector } from 'react-redux';
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from 'uuid';

const ProfilePage = () => {
    const [data, setData] = useState({});
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    const profile = async () => {
        if (!bkdDriver || !bkdDriver.headers)
            return;
        setIsLoading(true);
        const res = await bkdDriver.getProfile();
        setAvatar(res.image);
        setData(res);
        setIsLoading(false);
    }
    useEffect(() => {
       profile();
    }, [bkdDriver]);

    

    const changeAvatar = (files) => {
        setIsLoading(true);
        let file = files[0];
        // let newFileName = files[0].name.replace(/\..+$/, "");
        let newFileName = uuidv4();
        const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,      
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
        };
        console.log('config', config);
        const ReactS3Client = new S3(config);
        try {
        
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
            console.log(data);
            if (data.status === 204) {
                console.log("success");
                setAvatar(data.location);

            } else {
            console.log("fail");
            }
            setIsLoading(false);
        }).catch(error => {
            console.log('error1', error);
            setIsLoading(false);
        });
        } catch(error) {
            console.log('error2', error);
            setIsLoading(false);
        }

    };

    useEffect(() => {
        if (isEditingMode && data) {
            setName(data.name);
            setShippingAddress(data.shippingAddress);
            setExternalLink(data.externalLink);
        }
    }, [data?.externalLink, data?.name, data?.shippingAddress, isEditingMode]);

    const update = async () => {
        if (!bkdDriver || !bkdDriver.headers)
            return;

        setIsLoading(true);

        const data = { name, shippingAddress, externalLink, image: avatar};
        console.log(data);
        const updateResult = await bkdDriver.updateProfile(data);
        console.log('updateProfile', updateResult);
        setAvatar(updateResult.image);
        setData(updateResult);
        setIsLoading(false);
        setIsEditingMode(false);
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
                                    <img src={avatar} alt="" />
                                ) : (
                                    <Button className="choose-btn">
                                        Choose Image
                                    </Button>
                                )}
                            </Dropzone>
                        ) : (
                            <>{avatar ? 
                                    <img className='user_image' src={avatar} alt="" />
                                 : <AccountCircle />}
                            </>
                            
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
                            <span>{data?.name}</span>
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
                        <p>{data?.shippingAddress}</p>
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
                        <a href={data?.externalLink}>{data?.externalLink}</a>
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
