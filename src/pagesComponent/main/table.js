import React, { useMemo } from "react";

//MRT Imports
import MaterialReactTable from "material-react-table";

///Mock Data

const TableComponent = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
      },
      {
        accessorKey: "street",
        header: "Street",
      },
      {
        accessorKey: "city", //normal accessorKey
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
      {
        accessorKey: "zip",
        header: "Zip",
      },
      {
        accessorKey: "latitude",
        header: "Latitude",
      },
      {
        accessorKey: "longitude",
        header: "Longitude",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableSorting
      enableColumnActions={false}
      initialState={{ showColumnFilters: true }}
    />
  );
};

export default TableComponent;
