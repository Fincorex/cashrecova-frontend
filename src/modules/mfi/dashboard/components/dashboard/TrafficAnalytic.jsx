import React from 'react';

const TrafficAnalytic = () => {
    const platforms = [
        { name: 'Website', views: '220K', width: 'w-100', icon: 'google' },
        { name: 'Instagram', views: '124K', width: 'w-50', icon: 'instagram' },
        { name: 'Meta', views: '64K', width: 'w-75', icon: 'meta' },
        { name: 'Linkedin', views: '64K', width: 'w-50', icon: 'linkedin' }
    ];

    const icons = {
        google: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                <path fill="#46B277" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
            </svg>
        ),
        instagram: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                <g fill="none">
                    <rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60" />
                    <rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60" />
                    <path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" />
                    <defs>
                        <radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fd5" />
                            <stop offset=".1" stopColor="#fd5" />
                            <stop offset=".5" stopColor="#ff543e" />
                            <stop offset="1" stopColor="#c837ab" />
                        </radialGradient>
                        <radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3771c8" />
                            <stop offset=".128" stopColor="#3771c8" />
                            <stop offset="1" stopColor="#60f" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </g>
            </svg>
        ),
        meta: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 171">
                <defs>
                    <linearGradient id="logosMetaIcon0" x1="13.878%" x2="89.144%" y1="55.934%" y2="58.694%">
                        <stop offset="0%" stopColor="#0064e1" />
                        <stop offset="40%" stopColor="#0064e1" />
                        <stop offset="83%" stopColor="#0073ee" />
                        <stop offset="100%" stopColor="#0082fb" />
                    </linearGradient>
                    <linearGradient id="logosMetaIcon1" x1="54.315%" x2="54.315%" y1="82.782%" y2="39.307%">
                        <stop offset="0%" stopColor="#0082fb" />
                        <stop offset="100%" stopColor="#0064e0" />
                    </linearGradient>
                </defs>
                <path fill="#0081fb" d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82c3.677 5.947 9.16 8.466 14.751 8.466c7.211 0 13.808-1.79 26.52-19.372c10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946c-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927c0-23.52-5.484-49.623-17.564-68.273c-8.574-13.23-19.684-21.313-31.907-21.313c-13.22 0-23.859 9.97-35.815 27.75c-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07c-14.2 18.91-26.324 26.076-42.287 26.076c-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148z" />
                <path fill="url(#logosMetaIcon0)" d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0C85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49c6.802 8.243 11.565 10.7 17.752 10.7c15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946c-5.591 9.686-16.488 19.363-34.818 19.363c-11.395 0-21.49-2.475-32.654-13.007c-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428c-10.923 0-20.2 7.666-27.963 19.39z" />
                <path fill="url(#logosMetaIcon1)" d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39c-10.976 16.568-17.698 41.245-17.698 64.944c0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148C0 83.772 7.514 55.24 21.802 33.206C34.48 13.666 52.774 0 73.757 0z" />
            </svg>
        ),
        linkedin: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                <g fill="none">
                    <rect width="256" height="256" fill="#fff" rx="60" />
                    <rect width="256" height="256" fill="#0a66c2" rx="60" />
                    <path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" />
                </g>
            </svg>
        )
    };

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Traffic Analytic</h5>

                    <div className="ms-auto">
                        <button className="btn btn-sm bg-primary-subtle border dropdown-toggle fw-medium text-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            View All<i className="mdi mdi-chevron-down ms-1 fs-14"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">Today</a>
                            <a className="dropdown-item" href="#">This Week</a>
                            <a className="dropdown-item" href="#">This Year</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <h3 className="fs-24 mb-0 fw-medium me-3">298,475</h3>
                    <span className="badge badge-custom-second fw-semibold text-success rounded-2 fs-14">
                        <i className="mdi mdi-arrow-up"></i> 17%
                    </span>
                </div>

                <p className="text-muted fs-14 mb-3">Total Views from 4 platforms</p>

                {platforms.map((platform, idx) => (
                    <div key={idx} className="d-flex align-items-center justify-content-between mb-2">
                        <div className={`py-2 px-3 rounded-2 bg-primary-subtle ${platform.width} me-3`}>
                            <div className="d-flex align-items-center gap-2">
                                <span className="avatar rounded-circle avatar-xs bg-white d-flex align-items-center justify-content-center">
                                    {icons[platform.icon]}
                                </span>
                                <span className="fs-16">{platform.name}</span>
                            </div>
                        </div>
                        <span className="text-muted fs-15 fw-medium">{platform.views}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrafficAnalytic;
