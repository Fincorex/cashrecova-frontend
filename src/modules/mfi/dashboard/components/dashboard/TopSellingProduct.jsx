import React from 'react';

const TopSellingProduct = () => {
    const products = [
        {
            id: 1,
            name: "FuelCell Men's Running Shoes",
            code: '#ADC098',
            image: '/src/assets/images/products/p-6.png',
            sales: '12,457 Sales',
            status: 'Available',
            stock: '132 stocks'
        },
        {
            id: 2,
            name: 'Jacket Utilitas',
            code: '#ADC099',
            image: '/src/assets/images/products/leather-jacket.png',
            sales: '13,021 Sales',
            status: 'Available',
            stock: '95 stocks'
        },
        {
            id: 3,
            name: "605's Black Shirt Limited Edition",
            code: '#ADC110',
            image: '/src/assets/images/products/p-1.png',
            sales: '10,547 Sales',
            status: 'Available',
            stock: '73 stocks'
        },
        {
            id: 4,
            name: 'Green Velvet Sofa',
            code: '#ADC115',
            image: '/src/assets/images/products/p-3.png',
            sales: '18,547 Sales',
            status: 'Available',
            stock: '86 stocks'
        },
        {
            id: 5,
            name: 'Puma Limited Shoes',
            code: '#ADC120',
            image: '/src/assets/images/products/p-10.png',
            sales: '16,784 Sales',
            status: 'Available',
            stock: '95 stocks'
        }
    ];

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Top Selling Product</h5>
                </div>
            </div>

            <div className="card-body p-0">
                <ul className="list-group list-group-flush list-group-no-gutters">
                    {products.map((product) => (
                        <li key={product.id} className="list-group-item">
                            <div className="d-flex">
                                <div className="flex-shrink-0 align-self-center">
                                    <div className="align-content-center text-center border rounded-2 p-1">
                                        <img src={product.image} className="avatar avatar-sm rounded-circle" alt={product.name} />
                                    </div>
                                </div>

                                <div className="flex-grow-1 ms-3 align-content-center">
                                    <div className="row">
                                        <div className="col-6 col-md-8">
                                            <h6 className="mb-1 fs-15">{product.name}</h6>
                                            <span className="fs-14 text-muted">{product.sales}</span>
                                        </div>

                                        <div className="col-6 col-md-4 text-end mt-2 mt-md-0">
                                            <h6 className="mb-1 text-success fs-14">
                                                <i className="mdi mdi-circle-medium text-success me-1"></i>
                                                {product.status}
                                            </h6>
                                            <span className="fs-13 text-muted">{product.stock}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TopSellingProduct;
