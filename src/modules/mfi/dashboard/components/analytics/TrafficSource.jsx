import React from 'react';

const TrafficSource = () => {
    const browsers = [
        {
            name: 'Google',
            sessions: '45,379',
            traffic: 78,
            trend: 'up',
            color: 'primary',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                    <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                    <path fill="#46B277" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                    <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                </svg>
            )
        },
        {
            name: 'Safari',
            sessions: '78,379',
            traffic: 32,
            trend: 'up',
            color: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128">
                    <path fill="#1e64f0" d="M64 1.5C29.5 1.5 1.5 29.5 1.5 64s28 62.5 62.5 62.5s62.5-28 62.5-62.5S98.5 1.5 64 1.5m56 57.9l-5 .4l-.1-1l5-.4zm0 3.6v1h-9v-1zm-.6-8.4l-9.1 1.6l-.2-1l9.1-1.6z" />
                </svg>
            )
        },
        {
            name: 'Edge',
            sessions: '12,457',
            traffic: 21,
            trend: 'down',
            color: 'warning',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                    <path fill="url(#logosMicrosoftEdge4)" d="M231 190.5c-3.4 1.8-6.9 3.4-10.5 4.7c-11.5 4.3-23.6 6.5-35.9 6.5c-47.3 0-88.5-32.5-88.5-74.3c.1-11.4 6.4-21.9 16.4-27.3c-42.8 1.8-53.8 46.4-53.8 72.5c0 73.9 68.1 81.4 82.8 81.4c7.9 0 19.8-2.3 27-4.6l1.3-.4c27.6-9.5 51-28.1 66.6-52.8c1.2-1.9.6-4.3-1.2-5.5c-1.3-.8-2.9-.9-4.2-.2" />
                </svg>
            )
        },
        {
            name: 'Opera',
            sessions: '6,570',
            traffic: 25,
            trend: 'up',
            color: 'danger',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128">
                    <path fill="url(#deviconOpera0)" d="M63.996.008C28.652.008 0 28.66 0 64.008c0 34.32 27.02 62.332 60.949 63.922q1.517.072 3.047.074a63.77 63.77 0 0 0 42.652-16.285c-7.5 4.973-16.273 7.836-25.645 7.836c-15.242 0-28.891-7.562-38.07-19.484c-7.078-8.352-11.66-20.699-11.973-34.559V62.5c.313-13.859 4.895-26.207 11.973-34.559C52.113 16.016 65.762 8.457 81 8.457c9.375 0 18.148 2.863 25.652 7.84C95.383 6.219 80.531.07 64.238.008zm0 0" />
                </svg>
            )
        },
        {
            name: 'Firefox',
            sessions: '6,568',
            traffic: 45,
            trend: 'down',
            color: 'info',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="19.33" height="20" viewBox="0 0 256 265">
                    <path fill="#ff9d12" d="M248.033 88.713c-5.569-13.399-16.864-27.866-25.71-32.439a133.2 133.2 0 0 1 12.979 38.9l.023.215c-14.49-36.126-39.062-50.692-59.13-82.41a155 155 0 0 1-3.019-4.907" />
                </svg>
            )
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Traffic Source</h5>
                </div>
            </div>

            <div className="card-body mt-0 p-0">
                <div className="table-responsive table-card">
                    <table className="table table-borderless table-centered align-middle table-nowrap table-hover table-stock mb-0">
                        <thead>
                            <tr>
                                <th>Browser</th>
                                <th>Sessions</th>
                                <th>Traffic</th>
                            </tr>
                        </thead>
                        <tbody>
                            {browsers.map((browser, index) => (
                                <tr key={index}>
                                    <td className="ps-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className={`avatar rounded-2 avatar-sm bg-${browser.color}-subtle d-flex align-items-center justify-content-center`}>
                                                {browser.icon}
                                            </span>
                                            <h6 className="mb-0 fs-14">{browser.name}</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="fs-14">
                                            <i className={`mdi mdi-arrow-${browser.trend} me-1 text-${browser.trend === 'up' ? 'success' : 'danger'} align-middle fs-16`}></i>
                                            {browser.sessions}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="progress progress-sm mt-0">
                                            <div className={`progress-bar bg-${browser.color}`} role="progressbar" style={{ width: `${browser.traffic}%` }} aria-valuenow={browser.traffic} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
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

export default TrafficSource;
