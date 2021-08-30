import React from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LayersIcon from '@material-ui/icons/Layers';
import LockIcon from '@material-ui/icons/Lock';
import EcoIcon from '@material-ui/icons/Eco';

const Sidebar = () => {
    return (
        <div className="md:w-3/12 w-6/12 h-screen shadow-2xl">
            <div className=" border-b py-3 mt-1 flex justify-around ">
                <p className="text-blue-500 semibold-text-lg">Element</p>


            </div>
            <div className="p-4 space-y-14">
                <div className="space-y-4" >

                    <div className="">
                        <div className="flex p-3 text-blue-400  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <DonutLargeIcon className=" text-blue-400" />
                            <p className=" " >Overview</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <ClearAllIcon className="text-blue-400" />
                            <p className="text-blue-400  ">Proposals</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex p-3 text-blue-400  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <ArrowUpwardIcon className="text-blue-400" />
                            <p className="text-blue-400  " >Leaderboard</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex p-3 text-blue-400  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <ArrowDownwardIcon className="text-blue-400" />
                            <p className="text-blue-400  " >Delegate</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <SyncAltIcon className="text-blue-400" />
                            <p className="text-blue-400  " >Forum</p>
                        </div>
                    </div>


                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <EcoIcon className="text-blue-400" />
                            <p className="text-blue-400  " >Resources</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                            <LockIcon className="text-blue-400" />
                            <p className="text-blue-400  " >Rewards</p>
                        </div>
                    </div>

                </div>
                <div className="space-y-6" >

                    </div>

            </div>

        </div>
    )
}

export default Sidebar
