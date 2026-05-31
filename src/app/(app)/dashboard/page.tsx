import { BriefcaseIcon, PiggyBankIcon, ReceiptIcon, WalletIcon } from 'lucide-react'
import Chart01 from './_components/statistics/chart-card'
import Chart02 from './_components/statistics/pie-chart-card'
import StatisticsCard, { StatisticsCardProps } from './_components/statistics/statistics-card'

const statisticsData: StatisticsCardProps[] = [
  {
    title: 'Net Profit',
    value: '$38,200',
    status: 'within',
    range: '$30k - $50k',
    icon: <BriefcaseIcon />
  },
  {
    title: 'Operating Expenses',
    value: '$21,750',
    status: 'exceed',
    range: 'Target: $18k',
    icon: <ReceiptIcon />
  },
  {
    title: 'Cash Reserves',
    value: '$94,500',
    status: 'observe',
    range: '$80k - $120k',
    icon: <PiggyBankIcon />
  },
  {
    title: 'Budget Utilisation',
    value: '78%',
    status: 'unknown',
    range: 'Q4 Review Pending',
    icon: <WalletIcon />
  }
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="px-4 sm:px-6 lg:px-6 text-3xl font-extrabold tracking-tight text-balance">
        Dashboard
      </h1>
      <div className="space-y-4">
        <div className='mx-auto grid max-w-[90dvw] gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-6 xl:grid-cols-4'>
          {statisticsData.map((card, index) => (
            <StatisticsCard key={index} {...card} />
          ))}
        </div>
        <div className='mx-auto grid max-w-[90dvw] gap-4 px-4 sm:grid-cols-1 sm:px-6 lg:px-6 xl:grid-cols-4 '>
          <Chart01 className='col-span-3'/>
          <Chart02 />
        </div>
      </div>
    </div>
  )
}