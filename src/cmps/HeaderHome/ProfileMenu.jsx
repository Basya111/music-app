import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';

export const ProfileMenu = ({ onLogout, goToProfile }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSetLogout = () => {
        handleClose()
        onLogout()
    }

    const onGoToProfile = () => {
        handleClose()
        goToProfile()
    }

    return (
        <div>
            <img className="profile-icon" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"
                src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="" />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onGoToProfile}>Profile</MenuItem>
                <MenuItem onClick={onSetLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
