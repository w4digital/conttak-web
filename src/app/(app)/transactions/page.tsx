import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./_components/data-table";

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed530",
      amount: 200,
      status: "success",
      email: "j@example.com",
    },
    {
      id: "728ed531",
      amount: 150,
      status: "failed",
      email: "k@example.com",
    }
  ]
}

export default async function TransactionsPage() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="px-4 sm:px-6 lg:px-6 text-3xl font-extrabold tracking-tight text-balance">
        Transactions
      </h1>
      <div className="px-4 sm:px-6 lg:px-6">
        <div>
          <Toolbar />
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}