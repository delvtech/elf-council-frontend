import React from 'react'
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

                <NotificationIcon />
                <ExitToAppIcon />
                <p className="text-gray-600 font-semibold">Connect Wallet</p>
            </div>
        </div>
    )
}

export default Header
