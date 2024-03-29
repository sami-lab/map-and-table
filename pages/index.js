import { Grid, Paper } from '@mui/material'
import React from 'react'

import TableComponent from '../src/components/table'
import Map from '../src/components/map'
export default function index() {
  return (
    <Grid container direction="column" style={{padding: "50px"}}>
        <Grid item style={{width: "100%"}}>
          <Grid container component={Paper} style={{borderRadius:"25px",overflow: "hidden"}}>
            <Map/>
          </Grid>
        </Grid>
        {/* table */}
        <Grid item style={{width: "100%",marginTop: "20px"}}>
            <TableComponent/>
        </Grid>
    </Grid>
  )
}
