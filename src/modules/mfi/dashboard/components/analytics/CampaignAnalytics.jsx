import React, { useState } from 'react';

const CampaignAnalytics = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const campaigns = [
        {
            website: 'Google',
            ctr: '9.21%',
            ctrColor: 'primary',
            impressions: '124.89K',
            amountSpent: '$2.876K',
            clicks: '1.15K',
            costPerClick: '$0.267'
        },
        {
            website: 'Facebook',
            ctr: '5.65%',
            ctrColor: 'danger',
            impressions: '185.32K',
            amountSpent: '$4.983K',
            clicks: '2.55K',
            costPerClick: '$1.754'
        },
        {
            website: 'Instagram',
            ctr: '12.23%',
            ctrColor: 'warning',
            impressions: '125.56K',
            amountSpent: '$7.436K',
            clicks: '3.8K',
            costPerClick: '$1.956'
        },
        {
            website: 'Twitter',
            ctr: '18.16%',
            ctrColor: 'success',
            impressions: '165.41K',
            amountSpent: '$2.543K',
            clicks: '6.21K',
            costPerClick: '$2.154'
        },
        {
            website: 'Affiliate',
            ctr: '8.15%',
            ctrColor: 'secondary',
            impressions: '163.56K',
            amountSpent: '$8.650K',
            clicks: '8.15K',
            costPerClick: '$3.652'
        },
        {
            website: 'YouTube',
            ctr: '6.85%',
            ctrColor: 'dark',
            impressions: '123.58K',
            amountSpent: '$7.650K',
            clicks: '6.63K',
            costPerClick: '$4.104'
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Campaign Analytics</h5>
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive table-centered mt-0">
                    <table className="table table-centered table-nowrap table-hover table-stock mb-0">
                        <thead>
                            <tr>
                                <th scope="col" className="cursor-pointer">Website</th>
                                <th scope="col" className="cursor-pointer">CTR</th>
                                <th scope="col" className="cursor-pointer">Impressions</th>
                                <th scope="col" className="cursor-pointer">Amount Spent</th>
                                <th scope="col" className="cursor-pointer">Clicks</th>
                                <th scope="col" className="cursor-pointer">Cost Per Click</th>
                                <th scope="col" className="cursor-pointer desc">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href="javascript:void(0);" className="fw-semibold">{campaign.website}</a>
                                    </td>
                                    <td className="text-muted">
                                        <span className={`badge bg-${campaign.ctrColor}-subtle text-${campaign.ctrColor}`}>{campaign.ctr}</span>
                                    </td>
                                    <td className="text-muted">{campaign.impressions}</td>
                                    <td className="text-muted">{campaign.amountSpent}</td>
                                    <td className="text-muted">{campaign.clicks}</td>
                                    <td className="text-muted">{campaign.costPerClick}</td>
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

            <div className="card-footer py-0 border-top">
                <div className="row align-items-center">
                    <div className="col-sm">
                        <div className="text-block text-center text-sm-start">
                            <span className="fw-medium"> Showing 6 Entries </span>
                        </div>
                    </div>
                    <div className="col-sm-auto mt-3 mt-sm-0">
                        <div className="pagination gap-2 justify-content-center py-3 ps-0 pe-0">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link me-2 rounded-2" href="javascript:void(0);" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                                        Prev
                                    </a>
                                </li>
                                <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                                    <a className="page-link rounded-2 me-2" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>1</a>
                                </li>
                                <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                                    <a className="page-link me-2 rounded-2" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(2); }}>2</a>
                                </li>
                                <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                                    <a className="page-link text-primary rounded-2" href="javascript:void(0);" onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}>
                                        next
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignAnalytics;
