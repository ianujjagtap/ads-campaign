"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaigns } from "@/services/campaigns";
import { type Campaign, type CampaignsResponse } from "@/types/campaign";
import { Skeleton } from "@/primitives/skeleton";
import { ScrollArea } from "@/primitives/scrollarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/primitives/input";
import { Button } from "@/primitives/button";
import { Eye, Search, ArrowUpDown, ChevronDown } from "lucide-react";
import { Badge } from "@/primitives/badge";
import { CampaignInsightsDialog } from "./campaign-insights-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/primitives/dropdown";
import { Checkbox } from "@/primitives/checkbox";

// --- Skeleton Component (Matched to CampaignDataTable) ---
const LocalTableSkeletonRows = ({ rows = 5, columns = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: columns }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export function CampaignInsightsSection() {
    // Table Logic
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Dialog State
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    const { data: campaignsData, isLoading: isLoadingCampaigns, isError } = useQuery<CampaignsResponse>({
        queryKey: ["campaigns"],
        queryFn: fetchCampaigns,
    });

    const handleViewInsights = (id: string) => {
        setSelectedId(id);
        setDialogOpen(true);
    };

    const columns: ColumnDef<Campaign>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
         {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 hover:bg-transparent"
                >
                    Campaign Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                );
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant={status === 'active' ? 'default' : 'secondary'} className="capitalize">
                        {status}
                    </Badge>
                )
            },
        },
        {
          accessorKey: "budget",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="p-0 hover:bg-transparent"
            >
              Budget
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("budget"));
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount);
            return <div className="font-medium">{formatted}</div>;
          },
        },
         {
          accessorKey: "platforms",
          header: "Platforms",
          cell: ({ row }) => {
              const platforms: string[] = row.getValue("platforms");
              return (
                  <div className="flex flex-wrap gap-1">
                      {platforms.map(p => (
                          <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                      ))}
                  </div>
              )
          }
        },
         {
          accessorKey: "created_at",
          header: "Created At",
          cell: ({ row }) => {
              const date = new Date(row.getValue("created_at"));
              return <div className="text-muted-foreground">{date.toLocaleDateString()}</div>
          }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleViewInsights(row.original.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Insights
                        </Button>
                    </div>
                )
            }
        }
    ];

    const table = useReactTable({
        data: campaignsData?.campaigns || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isError) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed p-4 text-center">
            <div className="space-y-1">
                <p className="font-medium text-destructive">Error Loading Campaigns</p>
                <p className="text-sm text-muted-foreground">Please try again later.</p>
            </div>
         </div>
      )
    }

  return (
    <div className="space-y-4">
        <CampaignInsightsDialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen} 
            campaignId={selectedId} 
        />
        
        {/* Insights Table */}
        <div className="space-y-4">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter campaigns..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="pl-8"
                        />
                    </div>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)] w-[86vw] rounded-md border lg:w-auto">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                );
                                })}
                            </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {isLoadingCampaigns ? (
                                <LocalTableSkeletonRows rows={10} columns={columns.length} />
                            ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="whitespace-nowrap">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                                >
                                No results.
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </ScrollArea>
             <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
