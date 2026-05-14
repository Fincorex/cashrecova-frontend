import React from 'react';

const SalesByCountries = () => {
    const countries = [
        {
            name: 'United states',
            products: '8,567',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <path fill="#bd3d44" d="M0 0h640v480H0" />
                    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
                    <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
                    <marker id="flagUs4x30" markerHeight="30" markerWidth="30">
                        <path fill="#fff" d="m14 0l9 27L0 10h28L5 27z" />
                    </marker>
                    <path fill="none" markerMid="url(#flagUs4x30)" d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z" />
                </svg>
            )
        },
        {
            name: 'New Zealand',
            products: '3,978',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <defs>
                        <g id="flagNz4x30">
                            <g id="flagNz4x31">
                                <path d="M0-.3v.5l1-.5z" />
                                <path d="M.2.3L0-.1l1-.2z" />
                            </g>
                            <use href="#flagNz4x31" transform="scale(-1 1)" />
                            <use href="#flagNz4x31" transform="rotate(72 0 0)" />
                            <use href="#flagNz4x31" transform="rotate(-72 0 0)" />
                            <use href="#flagNz4x31" transform="scale(-1 1)rotate(72)" />
                        </g>
                    </defs>
                    <path fill="#00247d" fillRule="evenodd" d="M0 0h640v480H0z" />
                    <g transform="translate(-111 36.1)scale(.66825)">
                        <use width="100%" height="100%" fill="#fff" href="#flagNz4x30" transform="translate(900 120)scale(45.4)" />
                        <use width="100%" height="100%" fill="#cc142b" href="#flagNz4x30" transform="matrix(30 0 0 30 900 120)" />
                    </g>
                    <path fill="#012169" d="M0 0h320v240H0z" />
                    <path fill="#fff" d="m37.5 0l122 90.5L281 0h39v31l-120 89.5l120 89V240h-40l-120-89.5L40.5 240H0v-30l119.5-89L0 32V0z" />
                    <path fill="#c8102e" d="M212 140.5L320 220v20l-135.5-99.5zm-92 10l3 17.5l-96 72H0zM320 0v1.5l-124.5 94l1-22L295 0zM0 0l119.5 88h-30L0 21z" />
                    <path fill="#fff" d="M120.5 0v240h80V0zM0 80v80h320V80z" />
                    <path fill="#c8102e" d="M0 96.5v48h320v-48zM136.5 0v240h48V0z" />
                </svg>
            )
        },
        {
            name: 'Australia',
            products: '3,985',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 256 171">
                    <path fill="#00008b" d="M0 0h640v480H0z" />
                    <path fill="#fff" d="m37.5 0l122 90.5L281 0h39v31l-120 89.5l120 89V240h-40l-120-89.5L40.5 240H0v-30l119.5-89L0 32V0z" />
                    <path fill="#f00" d="M212 140.5L320 220v20l-135.5-99.5zm-92 10l3 17.5l-96 72H0zM320 0v1.5l-124.5 94l1-22L295 0zM0 0l119.5 88h-30L0 21z" />
                    <path fill="#fff" d="M120.5 0v240h80V0zM0 80v80h320V80z" />
                    <path fill="#f00" d="M0 96.5v48h320v-48zM136.5 0v240h48V0z" />
                    <path fill="#fff" d="m527 396.7l-20.5 2.6l2.2 20.5l-14.8-14.4l-14.7 14.5l2-20.5l-20.5-2.4l17.3-11.2l-10.9-17.5l19.6 6.5l6.9-19.5l7.1 19.4l19.5-6.7l-10.7 17.6z" />
                </svg>
            )
        },
        {
            name: 'India',
            products: '9,874',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <path fill="#f93" d="M0 0h640v160H0z" />
                    <path fill="#fff" d="M0 160h640v160H0z" />
                    <path fill="#128807" d="M0 320h640v160H0z" />
                    <g transform="matrix(3.2 0 0 3.2 320 240)">
                        <circle r="20" fill="#008" />
                        <circle r="17.5" fill="#fff" />
                        <circle r="3.5" fill="#008" />
                    </g>
                </svg>
            )
        },
        {
            name: 'Canada',
            products: '7,897',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <path fill="#fff" d="M150.1 0h339.7v480H150z" />
                    <path fill="#d52b1e" d="M-19.7 0h169.8v480H-19.7zm509.5 0h169.8v480H489.9z" />
                    <path fill="#d52b1e" d="M201 232l-13.3 4.4l61.4 54c4.7 13.7-1.6 17.8-5.6 25l66.6-8.4l-1.6 67l13.9-.3l-3.1-66.6l66.7 8c-4.1-8.7-7.8-13.3-4-27.2l61.3-51l-10.7-4c-8.8-6.8 3.8-32.6 5.6-48.9c0 0-35.7 12.3-38 5.8l-9.2-17.5l-32.6 35.8c-3.5.9-5-.5-5.9-3.5l15-74.8l-23.8 13.4c-2 .9-4 .1-5.2-2.2l-23-46l-23.6 47.8c-1.8 1.7-3.6 1.9-5 .7L264 130.8l13.7 74.1c-1.1 3-3.7 3.8-6.7 2.2l-31.2-35.3c-4 6.5-6.8 17.1-12.2 19.5c-5.4 2.3-23.5-4.5-35.6-7c4.2 14.8 17 39.6 9 47.7" />
                </svg>
            )
        },
        {
            name: 'France',
            products: '2,578',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path fill="#000091" d="M0 0h213.3v480H0z" />
                    <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
                </svg>
            )
        },
        {
            name: 'Germany',
            products: '1,456',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <path fill="#fc0" d="M0 320h640v160H0z" />
                    <path fill="#000001" d="M0 0h640v160H0z" />
                    <path fill="#f00" d="M0 160h640v160H0z" />
                </svg>
            )
        },
        {
            name: 'Brazil',
            products: '5,569',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 640 480">
                    <g strokeWidth="1">
                        <path fill="#229e45" fillRule="evenodd" d="M0 0h640v480H0z" />
                        <path fill="#f8e509" fillRule="evenodd" d="m321.4 436l301.5-195.7L319.6 44L17.1 240.7z" />
                        <path fill="#2b49a3" fillRule="evenodd" d="M452.8 240c0 70.3-57.1 127.3-127.6 127.3A127.4 127.4 0 1 1 452.8 240" />
                    </g>
                </svg>
            )
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Sales by Countries</h5>
                </div>
            </div>

            <div className="card-body">
                <div className="row">
                    {countries.map((country, index) => (
                        <div key={index} className="col col-md-6">
                            <div className="p-2 border rounded-2 mb-2">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="avatar avatar-sm flex-shrink-0 me-2 d-flex align-items-center justify-content-center">
                                        {country.flag}
                                    </div>
                                    <small className="fw-medium text-truncate fs-14">{country.name}</small>
                                </div>

                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <h6 className="mb-0 me-1 fs-14 fw-semibold me-2">{country.products}</h6>
                                        <small className="text-muted">Product</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesByCountries;
