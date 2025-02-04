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

export default function FootballTable() {
  const [games, setGames] = useState<TGame[]>([]);
  console.log(games);

  const columns: ColumnDef<TGame>[] = [
    { accessorKey: "fixture_id", header: "Fixture ID" },
    { accessorKey: "league_name", header: "League" },
    { accessorKey: "league_season", header: "Season" },
    { accessorKey: "home_team", header: "Home Team" },
    { accessorKey: "away_team", header: "Away Team" },
    { accessorKey: "halftime_home_score", header: "HT Home" },
    { accessorKey: "halftime_away_score", header: "HT Away" },
    { accessorKey: "home_score", header: "Fulltime Home" },
    { accessorKey: "away_score", header: "Fulltime Away" },
    //{
    //  accessorKey: "game_date",
    //  header: "Date",
    //  cell: ({ getValue }) =>
    //    moment(getValue() as string).format("YYYY-MM-DD HH:mm"),
    //},
    { accessorKey: "venue_name", header: "Venue" },
    { accessorKey: "venue_city", header: "City" },
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
  }, [fetchGames]);

  if (isLoading) return "Loading...";
  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
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
          <tr key={row.id} className={styles.tablerow}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.data}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
