import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";

import TableComponent from "../../pagesComponent/main/table";
import Map from "../../pagesComponent/main/map";

import sampleData from "../../data/sample_location.json";
export default function index() {
  const [data, setData] = useState(sampleData.locations);
  return (
    <Grid container direction='column' style={{ padding: "50px" }}>
      <Grid item style={{ width: "100%" }}>
        <Grid
          container
          component={Paper}
          style={{ borderRadius: "25px", overflow: "hidden" }}
        >
          <Map data={data} />
        </Grid>
      </Grid>
      {/* table */}
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        <TableComponent data={data} />
      </Grid>
    </Grid>
  );
}
