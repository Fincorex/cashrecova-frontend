import React from 'react';

const VisitsBySource = () => {
    const sources = [
        {
            name: 'Direct Marketing',
            value: '2,067',
            change: '2.6%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m3.7 11.287l3.623-3.624q.293-.292.671-.413t.783-.04l1.415.294Q9.073 8.873 8.366 9.98t-1.414 2.688zm4.125 1.62q.652-1.51 1.563-2.89q.91-1.378 2.08-2.548q1.873-1.873 4.073-2.806t4.746-.797q.136 2.546-.795 4.746t-2.803 4.073q-1.164 1.163-2.548 2.07t-2.897 1.559zm6.17-2.768q.44.44 1.066.44t1.066-.44t.44-1.057t-.44-1.057t-1.066-.44t-1.067.44t-.44 1.057t.44 1.056m-1.161 10.314L11.444 17.2q1.581-.706 2.691-1.423q1.111-.717 2.48-1.836l.289 1.415q.08.404-.031.785q-.111.382-.404.675zm-7.687-4.306q.587-.586 1.423-.58t1.423.594q.587.586.587 1.423t-.587 1.423q-.51.51-1.635.873t-2.605.502q.138-1.479.511-2.602t.883-1.633" />
                </svg>
            )
        },
        {
            name: 'Social Media Marketing',
            value: '7,895',
            change: '4.8%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13.75 2a.75.75 0 0 0-1.5 0v12.536A4.75 4.75 0 1 0 13.75 18V6.243A6.74 6.74 0 0 0 19 8.75a.75.75 0 0 0 0-1.5A5.25 5.25 0 0 1 13.75 2" />
                </svg>
            )
        },
        {
            name: 'Email Marketing',
            value: '45,150',
            change: '6.5%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M3.172 5.172C2 6.343 2 8.229 2 12s0 5.657 1.172 6.828S6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12s0-5.657-1.172-6.828S17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172M18.576 7.52a.75.75 0 0 1-.096 1.056l-2.196 1.83c-.887.74-1.605 1.338-2.24 1.746c-.66.425-1.303.693-2.044.693s-1.384-.269-2.045-.693c-.634-.408-1.352-1.007-2.239-1.745L5.52 8.577a.75.75 0 0 1 .96-1.153l2.16 1.799c.933.777 1.58 1.315 2.128 1.667c.529.34.888.455 1.233.455s.704-.114 1.233-.455c.547-.352 1.195-.89 2.128-1.667l2.159-1.8a.75.75 0 0 1 1.056.097" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: 'Referrals',
            value: '1,478',
            change: '0.8%',
            changeType: 'danger',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21.775 14.118Q22 13.092 22 12a10 10 0 0 0-.525-3.206l-.527-.038h-.011l-.051-.003a10 10 0 0 0-1.096.043a13.4 13.4 0 0 0-3.047.67c-.263.09-.563.252-.958.485l-.248.148c-.322.192-.69.413-1.088.62c-1.03.539-2.323 1.031-4.012 1.031c-2.418 0-4.407-.804-5.78-1.596a12.4 12.4 0 0 1-1.6-1.096a9 9 0 0 1-.48-.415a10.1 10.1 0 0 0-.498 4.628l.385-.02h.011l.027-.001a9 9 0 0 1 .45-.006c.303.002.733.014 1.253.054c1.037.082 2.447.278 3.923.742c.45.142.899.374 1.327.606l.299.163c.346.19.697.383 1.087.57c.98.47 2.144.871 3.668.871c1.383 0 2.662-.344 3.802-.766c.571-.21 1.099-.438 1.591-.65l.018-.007c.475-.204.937-.403 1.343-.538z" />
                </svg>
            )
        },
        {
            name: 'Digital Marketing',
            value: '25,058',
            change: '2.02%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m17.498 18.485l3.13-9.391c.791-2.373 1.331-3.994 1.37-5.115c.013-.377-.414-.503-.68-.236l-14.46 14.46c-.233.233-.177.626.14.716q.047.013.095.024c.5.123 1.153.034 2.46-.143l.07-.01c.369-.05.553-.075.73-.064c.32.02.63.124.898.303c.147.098.279.23.541.492l.252.252c1.51 1.51 2.265 2.265 3.066 2.226c.22-.011.438-.062.64-.151c.734-.324 1.072-1.337 1.747-3.363M14.906 3.372l-9.331 3.11c-2.082.694-3.123 1.041-3.439 1.804q-.112.271-.133.564c-.059.824.717 1.6 2.269 3.151l.283.283c.254.255.382.382.478.524c.19.28.297.606.31.944c.008.171-.019.35-.072.705c-.196 1.304-.294 1.956-.179 2.458l.013.052c.081.325.48.387.717.15L20.257 2.683c.267-.267.141-.694-.236-.68c-1.121.038-2.742.578-5.115 1.369" />
                </svg>
            )
        },
        {
            name: 'Networing Marketing',
            value: '9,985',
            change: '3.08%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 21c4.418 0 8-3.356 8-7.496c0-3.741-2.035-6.666-3.438-8.06c-.26-.258-.694-.144-.84.189c-.748 1.69-2.304 4.123-4.293 4.123c-1.232.165-3.112-.888-1.594-6.107c.137-.47-.365-.848-.749-.534C6.905 4.905 4 8.511 4 13.504C4 17.644 7.582 21 12 21" />
                </svg>
            )
        },
        {
            name: 'Other',
            value: '6,124',
            change: '8.4%',
            changeType: 'success',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 21c4.418 0 8-3.356 8-7.496c0-3.741-2.035-6.666-3.438-8.06c-.26-.258-.694-.144-.84.189c-.748 1.69-2.304 4.123-4.293 4.123c-1.232.165-3.112-.888-1.594-6.107c.137-.47-.365-.848-.749-.534C6.905 4.905 4 8.511 4 13.504C4 17.644 7.582 21 12 21" />
                </svg>
            )
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Visits by Source</h5>
                </div>
            </div>

            <div className="card-body">
                <ul className="list-group list-group-flush list-group-no-gutters">
                    {sources.map((source, index) => (
                        <li key={index} className={`list-group-item px-0 ${index === 0 ? 'pt-0' : ''} ${index === sources.length - 1 ? 'pb-0 mb-0' : ''}`}>
                            <div className="d-flex align-items-center gap-3">
                                <div className="flex-shrink-0">
                                    <div className="align-content-center text-center rounded-3">
                                        <span className="avatar rounded-3 avatar-sm bg-light text-muted d-flex align-items-center justify-content-center">
                                            {React.cloneElement(source.icon, { fill: "currentColor" })}
                                        </span>
                                    </div>
                                </div>

                                <div className="align-content-center">
                                    <h6 className="mb-0 fs-14">{source.name}</h6>
                                </div>

                                <div className="ms-auto align-content-center">
                                    <span className="fw-medium fs-14 me-3">{source.value}</span>
                                    <span className={`badge bg-${source.changeType}-subtle text-${source.changeType} fs-12 p-1`}>
                                        <i className={`mdi mdi-arrow-${source.changeType === 'success' ? 'up' : 'down'} text-${source.changeType} align-middle fs-14`}></i> {source.change}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VisitsBySource;
