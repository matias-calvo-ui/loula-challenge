"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/table";

export function WagesTable({ wages }: { wages: [] | string }) {
  const error = !Array.isArray(wages);
  return (
    <form className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[150px] text-white">ID</TableHead>
            <TableHead className="table-cell text-white">Amount</TableHead>
            <TableHead className="hidden md:table-cell text-white">
              Currency
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!error &&
            wages?.map((wage: any) => (
              <WageRow key={wage.wage_id} wage={wage} />
            ))}
        </TableBody>
      </Table>
      {error && (
        <h1 className="font-semibold text-lg text-white text-center py-4">
          {wages}
        </h1>
      )}
    </form>
  );
}

function WageRow({ wage }: { wage: any }) {
  const { wage_id, amount, currency } = wage;
  return (
    <TableRow>
      <TableCell className="font-medium text-white">{wage_id}</TableCell>
      <TableCell className="font-medium text-white">{amount}</TableCell>
      <TableCell className="font-medium text-white hidden md:table-cell">
        {currency}
      </TableCell>
    </TableRow>
  );
}
