import React from 'react';
import { Outlet } from 'react-router-dom';

const Customers = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className="page-title">Customer Management</h4>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Customers;
