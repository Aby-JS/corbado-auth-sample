import { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { dashboardColumns } from "../../utils/Dashboard/constants";
import { getWithAuth } from "../../utils/HttpCLient";
import { useSession } from "../../contexts/SessionContext";

const DataTable = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => dashboardColumns,
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const { logout,token } = useSession();

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      if (error?.message === "Failed to authenticate token.") {
        logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (filters = {}, sortBy = []) => {
    const response = await getWithAuth(token, `data?filter=${JSON.stringify(filters)}&sortBy=${JSON.stringify(sortBy)}&page=${pageIndex + 1}&pageSize=${pageSize}`);
    const data = response?.data;
    setData(data);
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default DataTable;
