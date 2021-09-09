import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import MapHeader from '../components/map/components/header/MapHeader';
import List from '../components/map/components/list/List';
import Map from '../components/map/components/map/Map';
import PlaceDetails from '../components/map/components/placeDetails/PlaceDetails';

function TestingMap() {
    return (
        <>
        <CssBaseline />
        <MapHeader />
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item cs={12} md={4}>
                <List/>
            </Grid>
            <Grid item cs={12} md={8}>
                <Map />
            </Grid>
        </Grid>
        </>
    )
}

export default TestingMap;
