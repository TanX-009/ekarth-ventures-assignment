"use client";

import React, { useEffect, useState } from "react";
import { TGame } from "@/types/game";
import useFetchGames from "@/hooks/fetchGames";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./styles.module.css";
import Editor from "./components/Editor";
import { TUser } from "@/types/user";
import { getLogin } from "@/app/actions/cookies";

export default function FootballTable() {
  const [games, setGames] = useState<TGame[]>([]);
  const [tick, updateTick] = useState(false);

  const [login, setLogin] = React.useState<TUser | null>(null);

  const columns: ColumnDef<TGame>[] = [
    { accessorKey: "home_team", header: "Home Team" },
    { accessorKey: "away_team", header: "Away Team" },
    {
      accessorKey: "home_score",
      header: "Home Score",
      cell: ({ row }) => (
        <Editor
          row={row}
          accessorKey={"home_score"}
          updateTick={updateTick}
          login={login}
        />
      ),
    },
    {
      accessorKey: "away_score",
      header: "Away Score",
      cell: ({ row }) => (
        <Editor
          row={row}
          accessorKey={"away_score"}
          updateTick={updateTick}
          login={login}
        />
      ),
    },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({
    data: games,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { isLoading, fetchGames } = useFetchGames(setGames);
  useEffect(() => {
    fetchGames();
  }, [fetchGames, tick]);

  useEffect(() => {
    (async function () {
      const userdata = await getLogin();
      if (userdata) setLogin(userdata);
    })();
  }, []);

  if (isLoading) return "Loading...";
  return (
    <div className={styles.tableContainer}>
      <p>Click on the scores to edit them and enter to save them!</p>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.th}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
