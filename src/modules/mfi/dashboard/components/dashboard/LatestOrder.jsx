import React from 'react';

const LatestOrder = () => {
    const orders = [
        {
            id: 1,
            product: 'Shirt Creme',
            code: '#ADC098',
            image: '/src/assets/images/users/avatar-2.png',
            date: 'February 14, 2025',
            time: '10:20 AM',
            status: 'Received',
            statusClass: 'bg-primary-subtle text-primary',
            price: '$130',
            customer: 'Jenny Wilson',
            category: 'Branding'
        },
        {
            id: 2,
            product: 'Asics Gel Nimbus',
            code: '#ADC099',
            image: '/src/assets/images/users/avatar-1.png',
            date: 'January 21, 2025',
            time: '11:20 AM',
            status: 'Shopping',
            statusClass: 'bg-warning-subtle text-warning',
            price: '$250',
            customer: 'Levi Ackerman',
            category: 'Branding'
        },
        {
            id: 3,
            product: 'Stainless Kettle',
            code: '#ADC108',
            image: '/src/assets/images/users/avatar-4.png',
            date: 'March 24, 2024',
            time: '09:20 AM',
            status: 'In Order',
            statusClass: 'bg-danger-subtle text-danger',
            price: '$150',
            customer: 'Historia Reiss',
            category: 'Branding'
        },
        {
            id: 4,
            product: 'Leather Wallet',
            code: '#ADC110',
            image: '/src/assets/images/users/avatar-6.png',
            date: 'April 15, 2024',
            time: '10:43 AM',
            status: 'Received',
            statusClass: 'bg-secondary-subtle text-secondary',
            price: '$178',
            customer: 'Charlie Baptista',
            category: 'Branding'
        },
        {
            id: 5,
            product: 'White Heels',
            code: '#ADC115',
            image: '/src/assets/images/users/avatar-4.png',
            date: 'May 13, 2024',
            time: '08:45 AM',
            status: 'Received',
            statusClass: 'bg-secondary-subtle text-secondary',
            price: '$125',
            customer: 'Ashlynn Stanton',
            category: 'Branding'
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Latest Order</h5>
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive table-centered mt-0">
                    <table className="table table-centered table-nowrap table-hover table-stock mb-0">
                        <thead>
                            <tr>
                                <th scope="col" className="cursor-pointer text-muted">User Name</th>
                                <th scope="col" className="cursor-pointer text-muted">Order Date</th>
                                <th scope="col" className="cursor-pointer text-muted">Status</th>
                                <th scope="col" className="cursor-pointer text-muted">Price</th>
                                <th scope="col" className="cursor-pointer px-3 text-muted">Customer</th>
                                <th scope="col" className="cursor-pointer text-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="ps-3">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <img src={order.image} className="avatar avatar-sm rounded-2 me-3" alt={order.product} />
                                            </div>
                                            <div>
                                                <h5 className="fw-normal fs-14 mb-1">{order.product}</h5>
                                                <p className="text-muted fw-normal fs-13 mb-0">{order.code}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <h5 className="fw-normal fs-14 mb-1">{order.date}</h5>
                                            <p className="text-muted fw-normal fs-13 mb-0">{order.time}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${order.statusClass} px-3 py-1 fw-medium fs-13 rounded-4`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.price}</td>
                                    <td>
                                        <div>
                                            <h5 className="fw-normal fs-14 mb-1">{order.customer}</h5>
                                            <p className="text-muted fw-normal fs-13 mb-0">{order.category}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <a aria-label="anchor" className="btn btn-icon btn-sm bg-primary-subtle me-1" data-bs-toggle="tooltip" data-bs-original-title="Edit">
                                            <i className="mdi mdi-pencil-outline text-primary fs-14"></i>
                                        </a>
                                        <a aria-label="anchor" className="btn btn-icon btn-sm bg-danger-subtle" data-bs-toggle="tooltip" data-bs-original-title="Delete">
                                            <i className="mdi mdi-delete text-danger fs-14"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LatestOrder;
