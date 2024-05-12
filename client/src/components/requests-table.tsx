"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/table";

export function RequestsTable({ requests }: { requests: [] | string }) {
  const error = !Array.isArray(requests);
  return (
    <form className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[150px] text-white">ID</TableHead>
            <TableHead className="table-cell text-white">Amount</TableHead>
            <TableHead className="table-cell text-white">Currency</TableHead>
            <TableHead className="text-white hidden md:table-cell">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!error &&
            requests?.map((request: any) => (
              <RequestRow key={request.request_id} request={request} />
            ))}
        </TableBody>
      </Table>
      {error && (
        <h1 className="font-semibold text-lg text-white text-center py-4">
          {requests}
        </h1>
      )}
    </form>
  );
}

function RequestRow({ request }: { request: any }) {
  const { request_id, amount, currency, status } = request;
  return (
    <TableRow>
      <TableCell className="font-medium text-white">{request_id}</TableCell>
      <TableCell className="font-medium text-white">{amount}</TableCell>
      <TableCell className="font-medium text-white hidden md:table-cell">
        {currency}
      </TableCell>
      <TableCell className="font-medium text-white">{status}</TableCell>
    </TableRow>
  );
}
