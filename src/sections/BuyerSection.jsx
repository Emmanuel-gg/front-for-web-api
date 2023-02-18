import BuyerTable from '../tables/BuyerTable'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function BuyerSection() {

	return (<>
					<BuyerTable />

		</>)
}
