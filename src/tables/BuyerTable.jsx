import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const perPage = 10

const columnsTransactions = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'Total',
        selector: row => row.total,
    },
    {
        name: 'Tax',
        selector: row => row.tax,
    },
    {
        name: 'Created At',
        selector: row => new Intl.DateTimeFormat('en-US').format(new Date(row.createdAt).getTime())
    },
    {
        name: 'Updated At',
        selector: row => new Intl.DateTimeFormat('en-US').format(new Date(row.updatedAt).getTime())
    },
]
const events = {
    'purchase': 'Purchase',
    'return': 'Return',
    'visit': 'Visit',
    'data_query': 'Data Query',
    'data_update': 'Data Update',
    'invoice_download': 'Invoice Download'
}
const columnsEvents = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'Event',
        selector: row => events[row.name],
    },
    {
        name: 'Transaction ID',
        selector: row => row.buyerTransactionId,
    },
    {
        name: 'Created At',
        selector: row => new Intl.DateTimeFormat('en-US').format(new Date(row.createdAt).getTime())
    },
]



export default function BuyerTable() {
    const [buyer, setBuyer] = useState({});

	const [buyers, setBuyers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	
    const showDetailsBuyer = async (id) => {
        const response = await axios.get(`http://localhost:3000/api/buyer/${id}`);
        setBuyer(response.data);
    }

	const fetchBuyers = async page => {
		setLoading(true);

		const response = await axios.get(`http://localhost:3000/api/buyer?page=${page}&perPage=${perPage}`);

		setBuyers(response.data.rows);
		setTotalRows(response.data.count);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchBuyers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`http://localhost:3000/api/buyer?page=${page}&perPage=${perPage}`);

		setBuyers(response.data.rows);
		setTotalRows(response.data.count);
		setLoading(false);
	};

	useEffect(() => {
		fetchBuyers(1); 
		
	}, []);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
        },
        {
            name: 'Document',
            selector: row => row.document,
        },
        {
            name: 'Id Type',
            selector: row => row.idType,
        },
        {
            name: 'Created At',
            selector: row => new Intl.DateTimeFormat('en-US').format(new Date(row.createdAt).getTime())
            
        },
        {
            name: 'Updated At',
            selector: row => new Intl.DateTimeFormat('en-US').format(new Date(row.updatedAt).getTime())
        },
        {
            name: 'Actions',
            cell: row => <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showDetailsBuyer(row.id)}>Details</button>
        }
    ];

	return (<>
    {
        buyer.id && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {/* "X" Button for hide */}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setBuyer({})}>X</button>

                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Buyer Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and application.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buyer.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Last Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buyer.lastName}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Document
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buyer.document}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Id Type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buyer.idType}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Intl.DateTimeFormat('en-US').format(new Date(buyer.createdAt).getTime())}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Updated At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Intl.DateTimeFormat('en-US').format(new Date(buyer.updatedAt).getTime())}
                            </dd>
                        </div>
                        
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <DataTable
                                    title="Events"
                                    columns={columnsEvents}
                                    data={buyer.event}
                                    pagination
                                />
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <DataTable
                                    title="Purchases"
                                    columns={columnsTransactions}
                                    data={buyer.transaction}
                                    pagination
                                />
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>
        )
    }
		<DataTable
			title="Buyers"
			columns={columns}
			data={buyers}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
		/>
	</>);
}