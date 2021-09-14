import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
import NotificationIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = () => {
    return (
        <div className="flex shadow-sm bg-gray-50  p-4 justify-between  ">
            <div className="flex space-x-3  ">

            </div>
            <div className="flex space-x-4 text-gray-400 mr-3">

                <NotificationsIcon />
                <ExitToAppIcon />
                <p className="text-blue-400 font-semibold">Connect Wallet</p>
            </div>
        </div>
    )
}

export default Header
