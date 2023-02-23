import React, { useEffect, useState, useRef } from 'react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import {
  Grid,
  useTheme,
  Typography,
  useMediaQuery,
  TextField,
  InputAdornment,
  Autocomplete,
  IconButton,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  Alert,
  Button,
  Slide,
  MenuItem,
  Radio,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';

import uuid from 'react-uuid';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import mapboxgl from 'mapbox-gl';

import Header from '../src/reusable/header';
import countriesData from '../src/data/countries.json';
resetServerContext();

mapboxgl.accessToken = publicRuntimeConfig.MAPBOX_ACCESS_TOKEN;

const sampleCustomers = [
  {
    id: 1,
    firstName: 'Muhammad',
    lastName: 'Sami',
    phone: '000-000-0000',
    ext: '123',
    email: 's.m.sami125@gmail.com',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    phone: '000-000-0000',
    ext: '123',
    email: 's.m.sami125@gmail.com',
  },
];

const rateTypeOptions = [
  {
    label: 'Contract-Primary',
    value: 'Contract-Primary',
  },
];
const equipmentOptions = [
  {
    type: 'Van',
    values: [
      {
        label: 'VN53',
        value: 'VN53',
      },
      {
        label: 'VN54',
        value: 'VN54',
      },
      {
        label: 'VN55',
        value: 'VN55',
      },
      {
        label: 'VN56',
        value: 'VN56',
      },
      {
        label: 'VN57',
        value: 'VN57',
      },
      {
        label: 'VN58',
        value: 'VN58',
      },
    ],
  },
  {
    type: 'Reefer',
    values: [
      {
        label: 'RF53',
        value: 'RF53',
      },
      {
        label: 'RF54',
        value: 'RF54',
      },
      {
        label: 'RF55',
        value: 'RF55',
      },
      {
        label: 'RF56',
        value: 'RF56',
      },
      {
        label: 'RF57',
        value: 'RF57',
      },
      {
        label: 'RF58',
        value: 'RF58',
      },
    ],
  },
  {
    type: 'Hazmat',
    values: [
      {
        label: 'HZ53',
        value: 'HZ53',
      },
      {
        label: 'HZ54',
        value: 'HZ54',
      },
      {
        label: 'HZ55',
        value: 'HZ55',
      },
      {
        label: 'HZ56',
        value: 'HZ56',
      },
      {
        label: 'HZ57',
        value: 'HZ57',
      },
      {
        label: 'HZ58',
        value: 'HZ58',
      },
    ],
  },
];

const slOptions = [
  {
    label: 'Solo',
    value: 'Solo',
  },
];
const statusOptions = [
  {
    label: 'Planned',
    value: 'Planned',
  },
];

const billToOptions = [
  {
    label: 'Customer',
    value: 'Customer',
  },
];

const sampleLocations = [
  {
    id: 1,
    name: 'US Airline',
    streetOne: '1234',
    streetTwo: 'Adress Lane',
    city: 'Jacksonville',
    state: 'FL',
    postalCode: '32203',
    country: 'US',
  },
  {
    id: 2,
    name: 'Karachi Airline',
    streetOne: '1234',
    streetTwo: 'Adress Lane',
    city: 'Karachi',
    state: 'Sindh',
    postalCode: '32203',
    country: 'Pakistan',
  },
  {
    id: 3,
    name: 'France Airline',
    streetOne: '1234',
    streetTwo: 'Adress Lane',
    city: 'Paris',
    state: 'FL',
    postalCode: '32203',
    country: 'France',
  },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddOrUpdateCustomerModal = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({
    id: uuid(),
    firstName: '',
    lastName: '',
    phone: '',
    ext: '',
    email: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.edit) {
      setData(props.customer);
    }
  }, []);

  const submitHandler = () => {
    setError('');
    if (
      data.firstName.trim() === '' ||
      data.lastName.trim() === '' ||
      data.phone.trim() === '' ||
      data.ext.trim() === '' ||
      data.email.trim() === ''
    ) {
      setError('Fill all field to Continue');
      return;
    }
    props.submitHandler(data, (err) => {
      setError(err);
    });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Add Contact
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* firstName lastname  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* firstname */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="First Name"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      firstName: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* lastName */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Last Name"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      lastName: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* phone ext email  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* phone ext */}
              <Grid item xs={6}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  {/* phone */}
                  <Grid item xs={8}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Phone"
                      placeholder="Phone"
                      value={data.phone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  {/* ext */}
                  <Grid item xs={4}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Ext."
                      placeholder="Ext."
                      value={data.ext}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ext: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* email */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {error !== '' && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error}</Alert>
            </Grid>
          )}
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const SelectEquipmentDialog = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(props.value ? props.value : '');

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Select Equipment Type
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* radios  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid
              container
              wrap="nowrap"
              spacing={4}
              alignItems="center"
              justifyContent="space-between"
            >
              {/* options */}
              {props?.equipments?.map((eq, i) => (
                <Grid item key={i}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h5"
                        style={{
                          fontWeight: 600,
                          color:
                            theme.palette.mode === 'dark' ? theme.palette.light.main : '#505050',
                        }}
                      >
                        {eq.type}
                      </Typography>
                    </Grid>
                    {eq.values.map((v, ind) => (
                      <Grid
                        item
                        style={{ marginTop: ind === 0 ? '15px' : '1px' }}
                        key={`${i}-${ind}`}
                      >
                        {' '}
                        <FormControlLabel
                          control={
                            <Radio
                              value={v.value}
                              checked={value === v.value}
                              onChange={() => setValue(v.value)}
                              name="equipment"
                            />
                          }
                          label={v.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={() => props.submitHandler(value)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const DeleteModal = (props) => {
  const theme = useTheme();

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? theme.palette.light.main : 'red',
                  }}
                >
                  Delete {props.title}
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* description */}
          <Grid item style={{ width: '100%', marginTop: '20px' }}>
            <Typography variant="subtitle1">
              You are about to delete "{props.element}", are you sure?
            </Typography>
          </Grid>
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* delete */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    boxShadow: 'none',
                    minWidth: '60px',
                    background: theme.palette.mode === 'dark' ? theme.palette.light.main : 'red',
                  }}
                  primary
                  onClick={props.submitHandler}
                >
                  Delete
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const EditCommodityDialog = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({
    commodityName: '',
    pieces: '',
    weight: '',
    pallets: '',
    cube: '',
    volume: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, []);

  const submitHandler = () => {
    setError('');
    if (
      data.commodityName.trim() === '' ||
      data.pieces.trim() === '' ||
      data.weight.trim() === '' ||
      data.pallets.trim() === '' ||
      data.cube.trim() === '' ||
      data.volume.trim() === ''
    ) {
      setError('Fill all field to Continue');
      return;
    }
    props.submitHandler(data, (err) => {
      setError(err);
    });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Edit Commodity
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* commodityName Pieces  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* commodityName */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Commodity Name"
                  placeholder="Commodity Name"
                  value={data.commodityName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      commodityName: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Pieces */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Pieces"
                  placeholder="Pieces"
                  value={data.pieces}
                  onChange={(e) =>
                    setData({
                      ...data,
                      pieces: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Weight pallets  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* commodityName */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Weight"
                  placeholder="Weight"
                  value={data.weight}
                  onChange={(e) =>
                    setData({
                      ...data,
                      weight: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* pallets */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Pallets"
                  placeholder="Pallets"
                  value={data.pallets}
                  onChange={(e) =>
                    setData({
                      ...data,
                      pallets: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          {/* cube volume  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* cube */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Cube"
                  placeholder="Cube"
                  value={data.cube}
                  onChange={(e) =>
                    setData({
                      ...data,
                      cube: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* volume */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Volume"
                  placeholder="Volume"
                  value={data.volume}
                  onChange={(e) =>
                    setData({
                      ...data,
                      volume: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {error !== '' && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error}</Alert>
            </Grid>
          )}
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const EditChargeDialog = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({
    billTo: '',
    chargeCode: '',
    description: '',
    quantity: '',
    rate: '',
    amount: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, []);

  const submitHandler = () => {
    setError('');
    if (
      data.billTo.trim() === '' ||
      data.chargeCode.trim() === '' ||
      data.description.trim() === '' ||
      data.quantity.trim() === '' ||
      data.rate.trim() === '' ||
      data.amount.trim() === ''
    ) {
      setError('Fill all field to Continue');
      return;
    }
    props.submitHandler(data, (err) => {
      setError(err);
    });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Edit Charge
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* billTo chargeCode  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* billTo */}
              <Grid item xs={6}>
                <TextField
                  select
                  variant="standard"
                  fullWidth
                  label="Bill To"
                  placeholder="Bill To"
                  value={data.billTo}
                  onChange={(e) =>
                    setData({
                      ...data,
                      billTo: e.target.value,
                    })
                  }
                >
                  {billToOptions.map((item, i) => (
                    <MenuItem value={item.value} key={i}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* chargeCode */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Charge Code"
                  placeholder="Charge Code"
                  value={data.chargeCode}
                  onChange={(e) =>
                    setData({
                      ...data,
                      chargeCode: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* description quantity  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* description */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Description"
                  placeholder="Description"
                  value={data.description}
                  onChange={(e) =>
                    setData({
                      ...data,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* quantity */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Quantity"
                  placeholder="Quantity"
                  value={data.quantity}
                  onChange={(e) =>
                    setData({
                      ...data,
                      quantity: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          {/* rate amount  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* rate */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Rate"
                  placeholder="Rate"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={data.rate}
                  onChange={(e) =>
                    setData({
                      ...data,
                      rate: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Amount */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Amount"
                  placeholder="Amount"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={data.amount}
                  onChange={(e) =>
                    setData({
                      ...data,
                      amount: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {error !== '' && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error}</Alert>
            </Grid>
          )}
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const AddLocationDialog = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({
    id: uuid(),
    name: '',
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, []);

  const submitHandler = () => {
    setError('');
    if (
      data.name.trim() === '' ||
      data.streetOne.trim() === '' ||
      data.streetTwo.trim() === '' ||
      data.city.trim() === '' ||
      data.state.trim() === '' ||
      data.postalCode.trim() === '' ||
      data.country.trim() === ''
    ) {
      setError('Fill all field to Continue');
      return;
    }
    props.submitHandler(data, (err) => {
      setError(err);
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Save Location
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* name */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <TextField
              variant="standard"
              fullWidth
              label="Location Name"
              placeholder="Location name"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
            />
          </Grid>
          {/* Street One */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <TextField
              variant="standard"
              fullWidth
              label="Street One"
              placeholder="Street One"
              value={data.streetOne}
              onChange={(e) =>
                setData({
                  ...data,
                  streetOne: e.target.value,
                })
              }
            />
          </Grid>
          {/* Street Two */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <TextField
              variant="standard"
              fullWidth
              label="Street Two"
              placeholder="Street Two"
              value={data.streetTwo}
              onChange={(e) =>
                setData({
                  ...data,
                  streetTwo: e.target.value,
                })
              }
            />
          </Grid>
          {/* Country State  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* Country */}
              <Grid item xs={6}>
                <TextField
                  select
                  variant="standard"
                  fullWidth
                  label="Country"
                  placeholder="Country"
                  value={data.country}
                  onChange={(e) =>
                    setData({
                      ...data,
                      state: '',
                      country: e.target.value,
                    })
                  }
                >
                  {countriesData.map((item, i) => (
                    <MenuItem key={i} value={item.country}>
                      {item.country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* State */}
              <Grid item xs={6}>
                <TextField
                  select
                  variant="standard"
                  fullWidth
                  label="State"
                  placeholder="State"
                  value={data.state}
                  onChange={(e) =>
                    setData({
                      ...data,
                      state: e.target.value,
                    })
                  }
                >
                  {countriesData
                    .find((x) => x.country === data.country)
                    ?.states.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* City PostalCode  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* City */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="City"
                  placeholder="City"
                  value={data.city}
                  onChange={(e) =>
                    setData({
                      ...data,
                      city: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* Postal code */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Postal Code"
                  placeholder="Postal Code"
                  value={data.postalCode}
                  onChange={(e) =>
                    setData({
                      ...data,
                      postalCode: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {error !== '' && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error}</Alert>
            </Grid>
          )}
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const SearchLocationDialog = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(props.value);

  const [changeLocationInput, setChangeLocationInput] = React.useState('');

  useEffect(() => {
    if (props.value) {
      //setValue(`${props.value}`);
      let c = props.locations.find((loc) => loc.id == props.value);
      setChangeLocationInput(
        `${c.streetOne ? c.streetOne : ''} ${c.streetTwo ? c.streetTwo : ''} ${c.state} ${c.city} ${
          c.postalCode
        } ${c.country}`
      );
    } else {
      setValue('');
      setChangeLocationInput('');
    }
  }, [props.value]);
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Save Location
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                props.onChange(newValue.id);
              }}
              inputValue={changeLocationInput}
              onInputChange={(event, newInputValue) => {
                setChangeLocationInput(newInputValue);
              }}
              id="locationInput1"
              disableClearable
              options={props.locations.map((c) => {
                return {
                  label: `${c.streetOne ? c.streetOne : ''} ${c.streetTwo ? c.streetTwo : ''} ${
                    c.state
                  } ${c.city} ${c.postalCode} ${c.country}`,
                  id: c.id,
                };
              })}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,

                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  placeholder="Search Location"
                  // sx={textfieldSx}
                />
              )}
            />
          </Grid>
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.onClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const EditStopDialog = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({
    contact: '',
    contactInput: '',
    pickup: '',
    startZone: '',
    phone: '',
    ext: '',
    startDate: '',
    endDate: '',
  });
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, []);

  const submitHandler = () => {
    setError('');
    if (
      data.contact.trim() === '' ||
      data.phone.trim() === '' ||
      data.ext.trim() === '' ||
      data.pickup.trim() === '' ||
      data.startZone.trim() === '' ||
      data.startDate.trim() === '' ||
      data.endDate.trim() === ''
    ) {
      setError('Fill all field to Continue');
      return;
    }
    props.submitHandler(data, (err) => {
      setError(err);
    });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Grid container direction={'column'}>
          {/* title close*/}
          <Grid item style={{ width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Edit Stop
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: '-10px' }}>
                <IconButton style={{ padding: 0 }} onClick={props.handleClose}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* contact phone  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* contact */}
              <Grid item xs={6}>
                <Autocomplete
                  value={data.contact}
                  onChange={(event, newValue) => {
                    let newCus = props.customers.find((cs) => cs.id === newValue.id);
                    setData({
                      ...data,
                      contact: newCus ? newCus : null,
                    });
                  }}
                  inputValue={data.contactInput}
                  onInputChange={(event, newInputValue) => {
                    setData({
                      ...data,
                      contactInput: newInputValue,
                    });
                  }}
                  id="contactInput2"
                  disableClearable
                  options={props.customers.map((c) => {
                    return {
                      label: c.firstName + ' ' + c.lastName,
                      id: c.id,
                    };
                  })}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      fullWidth
                      // sx={textfieldSx}
                      label="Contact"
                    />
                  )}
                />
              </Grid>
              {/* phone */}
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* phone */}
                  <Grid item style={{ flex: 1 }}>
                    <TextField
                      variant="standard"
                      label="Phone"
                      placeholder="0000-000-0000"
                      fullWidth
                      value={data.phone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  {/* ext */}
                  <Grid item style={{ width: '35%' }}>
                    <TextField
                      variant="standard"
                      label="Ext."
                      fullWidth
                      // sx={textfieldSx}

                      value={data.ext}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ext: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* pickup  startZone  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* pickup */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Pick Up"
                  placeholder="Pick Up"
                  value={data.pickup}
                  onChange={(e) =>
                    setData({
                      ...data,
                      pickup: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* startZone */}
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Start Zone"
                  placeholder="00000"
                  value={data.startZone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      startZone: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          {/* startDate endDate  */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={4} alignItems="center" justifyContent="space-between">
              {/* startDate */}
              <Grid item xs={6}>
                <DateTimePicker
                  value={data.startDate}
                  onChange={(newValue) =>
                    setData({
                      ...data,
                      startDate: newValue,
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Start Date"
                      placeholder="Start Date"
                      fullWidth
                      //sx={textfieldSx}
                      error={false}
                    />
                  )}
                />
              </Grid>
              {/* endDate */}
              <Grid item xs={6}>
                <DateTimePicker
                  value={data.endDate}
                  onChange={(newValue) =>
                    setData({
                      ...data,
                      endDate: newValue,
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="End Date"
                      placeholder="End Date"
                      fullWidth
                      //sx={textfieldSx}
                      error={false}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          {error !== '' && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error}</Alert>
            </Grid>
          )}
          {/* submit */}
          <Grid item style={{ width: '100%', marginTop: '40px' }}>
            <Grid container spacing={2} justifyContent={'flex-end'}>
              {/* save */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ boxShadow: 'none', minWidth: '60px' }}
                  primary
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </Grid>
              {/* cancel */}
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: '#92949C', boxShadow: 'none', minWidth: '60px' }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const Map = (props) => {
  const lng = props.lon || -84.294389;
  const lat = props.lat || 37.748815;

  const mapContainerRef = useRef(null);

  useEffect(() => {
    //map initialize
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 9,
    });

    //marker initialize
    var marker = new mapboxgl.Marker({
      color: '#EA4335',
    })
      .setLngLat([lng, lat])
      .addTo(map);

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const con = document.querySelector('.mapboxgl-control-container');
    if (con) {
      con.remove();
    }
  }, []);
  return (
    <>
      <div style={{ top: 0, left: 0, width: '100%', height: '100%' }} ref={mapContainerRef} />
    </>
  );
};

export default function Index() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));

  const matches1400 = useMediaQuery(theme.breakpoints.down('1400'));

  const [customers, setCustomers] = useState([...sampleCustomers]);
  const [customer, setCustomer] = useState({
    refNo: '',
    contact: null,
    phone: '',
    ext: '',
    mileage: '',
    man: false,
    address: '1234 Address Lane Jacksonville, FL 32203, US',
    team: '',
    am: '',
  });
  const [contactInputValue, setContactInputValue] = React.useState('');
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState({
    active: false,
    customer: null,
  });

  const [equipments, setEquipments] = useState(equipmentOptions);
  const [loadEntry, setLoadEntry] = useState({
    rateType: '',
    sl: '',
    equipment: '',
    status: '',
  });
  const [equipmentInputValue, setEquipmentInputValue] = React.useState('');
  const [selectEquipmentModal, setSelectEquipmentModal] = useState({
    active: false,
    value: '',
  });

  const [rateAmount, setRateAmount] = useState({
    contractAmount: '',
    margin: '',
    declValue: '',
    actualAmount: '',
    actualMargin: '',
  });

  const [expanded, setExpanded] = React.useState('panel1');

  const [locations, setLocations] = useState(sampleLocations);
  const [showAddLocationDialog, setAddLocationDialog] = useState(false);

  const [stops, setStops] = React.useState([
    {
      contact: '',
      contactInput: '',
      pickup: '',
      startZone: '',
      phone: '',
      ext: '',
      startDate: '',
      endDate: '',
      location: null,
      locationInput: '',
    },
  ]);
  const [changeLocationDialog, setChangeLocationDialog] = React.useState({
    active: false,
    index: -1,
    location: null,
  });
  const [deleteStopModal, setDeleteStopModal] = React.useState({
    active: false,
    index: -1,
    name: '',
  });
  const [editStopModal, setEditStopModal] = React.useState({
    active: false,
    index: -1,
    data: null,
  });

  const [carrier, setCarrier] = useState(null);
  const [carrierInput, setCarrierInput] = useState('');
  const [changeCarrierDialog, setChangeCarrierDialog] = React.useState({
    active: false,
    carrier: null,
  });
  const [commodities, setCommodities] = React.useState([
    {
      commodityName: '',
      pieces: '',
      weight: '',
      pallets: '',
      cube: '',
      volume: '',
    },
  ]);
  const [deleteCommodityModal, setDeleteCommodityModal] = React.useState({
    active: false,
    index: -1,
    name: '',
  });
  const [editCommodityModal, setEditCommodityModal] = React.useState({
    active: false,
    index: -1,
    data: null,
  });
  const [charges, setCharges] = React.useState([
    {
      billTo: '',
      chargeCode: '',
      description: '',
      quantity: '',
      rate: '',
      amount: '',
    },
  ]);
  const [deleteChargeModal, setDeleteChargeModal] = React.useState({
    active: false,
    index: -1,
    name: '',
  });
  const [editChargeModal, setEditChargeModal] = React.useState({
    active: false,
    index: -1,
    data: null,
  });

  const addCustomerHandler = (data, callback) => {
    //use callback(err) to set Error
    setCustomers([...customers, data]);
    setOpenAddCustomerModal({
      active: false,
      customer: null,
    });
  };
  const updateCustomerHandler = (data, callback) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === openAddCustomerModal.customer?.id) {
          return data;
        }
        return c;
      })
    );
    setCustomer({
      ...customer,
      contact: data,
    });
    setContactInputValue(`${data.firstName} ${data.lastName}`);
    setOpenAddCustomerModal({
      active: false,
      customer: null,
    });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    // const newIds = [];

    // result.forEach((item, i) => {
    //   newIds.push(item.id + '-' + (i + 1));

    //   // newIds.push({position: i+1,id: item.id})
    // });
    //reOrderApi(newIds);
    return result;
  };

  const commoditiesDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(commodities, result.source.index, result.destination.index);
    setCommodities(items);
  };
  const chargesDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(charges, result.source.index, result.destination.index);
    setCharges(items);
  };
  const stopsDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(stops, result.source.index, result.destination.index);
    setStops(items);
  };
  const cardStyleSx = {
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0px 1px 3px rgb(16 24 40 / 10%), 0px 1px 2px rgb(16 24 40 / 6%)'
        : 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
    padding: '20px',
    borderRadius: '6px',
  };
  const textfieldSx = {
    '.MuiInputAdornment-root p': {
      //fontSize: '13px',
      paddingRight: '10px',
      fontWeight: 600,
      color: theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
    },
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    margin: `0 0 8px 0`,
    //marginTop: '2em',
    // change background colour if dragging
    background: 'inherit',
    overflow: 'hidden',
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const selectedCustomer = customers.find((c) => c.id === customer.contact);

  return (
    <Grid container direction="column">
      <AddOrUpdateCustomerModal
        open={openAddCustomerModal.active}
        handleClose={() => {
          setOpenAddCustomerModal({
            active: false,
            customer: null,
          });
        }}
        edit={openAddCustomerModal.customer !== null}
        customer={openAddCustomerModal.customer}
        submitHandler={
          openAddCustomerModal.customer !== null ? updateCustomerHandler : addCustomerHandler
        }
      />
      <SelectEquipmentDialog
        open={selectEquipmentModal.active}
        handleClose={() => {
          setSelectEquipmentModal({
            active: false,
            value: '',
          });
        }}
        equipments={equipments}
        submitHandler={(value) => {
          setLoadEntry({
            ...loadEntry,
            equipment: value,
          });
          setSelectEquipmentModal({
            active: false,
            value: '',
          });
        }}
      />

      <DeleteModal
        open={deleteCommodityModal.active}
        handleClose={() => {
          setDeleteCommodityModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
        title="Commodity"
        element={deleteCommodityModal.name}
        submitHandler={() => {
          setCommodities(commodities.filter((c, i) => i !== deleteCommodityModal.index));
          setDeleteCommodityModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
      />

      <EditCommodityDialog
        open={editCommodityModal.active}
        handleClose={() => {
          setEditCommodityModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
        data={editCommodityModal.data}
        submitHandler={(data, callback) => {
          setCommodities(
            commodities.map((c, i) => {
              if (i === editCommodityModal.index) {
                return data;
              }
              return c;
            })
          );

          setEditCommodityModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
      />

      <DeleteModal
        open={deleteChargeModal.active}
        handleClose={() => {
          setDeleteChargeModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
        title="Charge"
        element={deleteChargeModal.name}
        submitHandler={() => {
          setCharges(charges.filter((c, i) => i !== deleteChargeModal.index));
          setDeleteChargeModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
      />

      <EditChargeDialog
        open={editChargeModal.active}
        handleClose={() => {
          setEditChargeModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
        data={editChargeModal.data}
        submitHandler={(data, callback) => {
          setCharges(
            charges.map((c, i) => {
              if (i === editChargeModal.index) {
                return data;
              }
              return c;
            })
          );

          setEditChargeModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
      />

      <AddLocationDialog
        open={showAddLocationDialog}
        handleClose={() => {
          setAddLocationDialog(false);
        }}
        submitHandler={(data, callback) => {
          setLocations((loc) => [...loc, data]);
          setAddLocationDialog(false);
        }}
      />

      <SearchLocationDialog
        open={changeLocationDialog.active}
        handleClose={() => {
          setChangeLocationDialog({
            active: false,
            index: -1,
            location: null,
          });
        }}
        value={changeLocationDialog.location?.id}
        onChange={(val) => {
          setStops((c) =>
            c.map((x, ind) => {
              if (changeLocationDialog.index === ind) {
                let newLoc = locations.find((lo) => lo.id === val);
                x.location = newLoc ? newLoc : null;
                setChangeLocationDialog({
                  ...changeLocationDialog,
                  location: newLoc ? newLoc : null,
                });
              }
              return x;
            })
          );
        }}
        locations={locations}
        onClear={() => {
          setStops((c) =>
            c.map((x, ind) => {
              if (changeLocationDialog.index === ind) {
                x.location = null;
                x.locationInput = '';
              }
              return x;
            })
          );
          setChangeLocationDialog({
            ...changeLocationDialog,
            location: null,
          });
        }}
      />

      <DeleteModal
        open={deleteStopModal.active}
        handleClose={() => {
          setDeleteStopModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
        title="Stop"
        element={deleteStopModal.name}
        submitHandler={() => {
          setStops(stops.filter((c, i) => i !== deleteStopModal.index));
          setDeleteStopModal({
            active: false,
            index: -1,
            name: '',
          });
        }}
      />

      <EditStopDialog
        customers={customers}
        open={editStopModal.active}
        handleClose={() => {
          setEditStopModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
        data={editStopModal.data}
        submitHandler={(data, callback) => {
          setStops(
            stops.map((c, i) => {
              if (i === editStopModal.index) {
                return data;
              }
              return c;
            })
          );

          setEditStopModal({
            active: false,
            index: -1,
            data: null,
          });
        }}
      />

      <SearchLocationDialog
        open={changeCarrierDialog.active}
        handleClose={() => {
          setChangeCarrierDialog({
            active: false,
            carrier: null,
          });
        }}
        value={changeCarrierDialog.carrier?.id}
        onChange={(val) => {
          let newLoc = locations.find((lo) => lo.id === val);
          setCarrier(newLoc ? newLoc : null);
          setChangeCarrierDialog({
            ...changeCarrierDialog,
            carrier: newLoc ? newLoc : null,
          });
        }}
        locations={locations}
        onClear={() => {
          setCarrier(null);
          setCarrierInput('');

          setChangeCarrierDialog({
            ...changeLocationDialog,
            carrier: null,
          });
        }}
      />
      {/* header */}
      <Grid item style={{ width: '100%' }}>
        <Header />
      </Grid>
      {/* 4 cards */}
      <Grid item className="container" style={{ width: '100%', marginTop: '30px' }}>
        <Grid container spacing={2}>
          {/* customer */}
          <Grid item style={{ display: 'flex', width: matches1400 ? '100%' : '33%' }}>
            <Grid container direction="column" sx={cardStyleSx}>
              {/* heading */}
              <Grid item style={{ width: '100%' }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Customer
                </Typography>
              </Grid>
              {/* inputs */}
              <Grid item style={{ width: '100%' }}>
                <Grid container spacing={4}>
                  {/* left side */}
                  <Grid item xs>
                    <Grid container direction="column">
                      {/* customer ref no */}
                      <Grid item style={{ marginTop: '20px', width: '100%' }}>
                        <TextField
                          variant="standard"
                          fullWidth
                          sx={textfieldSx}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">Customer c#</InputAdornment>
                            ),
                          }}
                          value={customer.refNo}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              refNo: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      {/* contact */}
                      <Grid style={{ marginTop: '20px', width: '100%' }}>
                        <Grid container spacing={1} alignItems="center">
                          {/* contact input */}
                          <Grid item style={{ flex: 1 }}>
                            <Autocomplete
                              value={customer?.contact?.id}
                              onChange={(event, newValue) => {
                                const newCus = customers.find((c) => c.id === newValue.id);
                                setCustomer({
                                  ...customer,
                                  contact: newCus ? newCus : null,
                                });
                              }}
                              inputValue={contactInputValue}
                              onInputChange={(event, newInputValue) => {
                                setContactInputValue(newInputValue);
                              }}
                              id="contactInput"
                              disableClearable
                              options={customers.map((c) => {
                                return {
                                  label: c.firstName + ' ' + c.lastName,
                                  id: c.id,
                                };
                              })}
                              freeSolo
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  fullWidth
                                  sx={textfieldSx}
                                  InputProps={{
                                    ...params.InputProps,

                                    startAdornment: (
                                      <InputAdornment position="start">Contact</InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          {/* add Icon */}
                          <Grid item>
                            <IconButton
                              style={{ padding: 0 }}
                              onClick={() => {
                                setOpenAddCustomerModal({
                                  active: true,
                                  customer: null,
                                });
                              }}
                              disableRipple
                            >
                              <PersonAddAlt1Icon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* phone  ext*/}
                      <Grid item style={{ marginTop: '20px', width: '100%' }}>
                        <Grid container spacing={2}>
                          {/* phone */}
                          <Grid item style={{ flex: 1 }}>
                            <TextField
                              variant="standard"
                              placeholder="0000-000-0000"
                              fullWidth
                              sx={textfieldSx}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">Phone</InputAdornment>
                                ),
                              }}
                              value={customer.phone}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </Grid>
                          {/* ext */}
                          <Grid item style={{ width: '35%' }}>
                            <TextField
                              variant="standard"
                              placeholder="0000"
                              fullWidth
                              sx={textfieldSx}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">Ext. </InputAdornment>
                                ),
                              }}
                              value={customer.ext}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  ext: e.target.value,
                                })
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* mileage */}
                      <Grid item style={{ marginTop: '20px', width: '100%' }}>
                        <Grid container spacing={2}>
                          {/* mileage */}
                          <Grid item style={{ flex: 1 }}>
                            <TextField
                              variant="standard"
                              placeholder="0000"
                              fullWidth
                              sx={textfieldSx}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">Mileage</InputAdornment>
                                ),
                              }}
                              value={customer.mileage}
                              onChange={(e) =>
                                setCustomer({
                                  ...customer,
                                  mileage: e.target.value,
                                })
                              }
                            />
                          </Grid>
                          <Grid item>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={customer.man}
                                  onChange={(e) =>
                                    setCustomer({
                                      ...customer,
                                      man: e.target.checked,
                                    })
                                  }
                                />
                              }
                              label="Man"
                              style={{
                                color:
                                  theme.palette.mode === 'dark'
                                    ? theme.palette.light.main
                                    : '#777777',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* right side */}
                  <Grid item xs>
                    <Grid container direction="column">
                      {/* customer name address */}
                      <Grid item style={{ marginTop: '20px', width: '100%' }}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          {selectedCustomer?.firstName ? selectedCustomer.firstName : ''}
                          {selectedCustomer?.lastName ? selectedCustomer.lastName : 'Customer Name'}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            //width: matches1400 ? '90%' : '45%',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                          sx={{
                            width: (theme) =>
                              useMediaQuery(theme.breakpoints.down(1450)) ? '80%' : '45%',
                          }}
                        >
                          {customer.address}
                        </Typography>
                      </Grid>
                      {/* team */}
                      <Grid item style={{ marginTop: '25px', width: '100%' }}>
                        <TextField
                          variant="standard"
                          fullWidth
                          placeholder="JAX00"
                          sx={textfieldSx}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Team</InputAdornment>,
                          }}
                          value={customer.team}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              team: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      {/* am */}
                      <Grid item style={{ marginTop: '20px', width: '100%' }}>
                        <TextField
                          variant="standard"
                          fullWidth
                          placeholder="JAX00"
                          sx={textfieldSx}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Am</InputAdornment>,
                          }}
                          value={customer.am}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              am: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* load entry */}
          <Grid item style={{ display: 'flex', width: matches1400 ? '100%' : '17%' }}>
            <Grid container direction="column" sx={cardStyleSx}>
              {/* heading */}
              <Grid item style={{ width: '100%' }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Load Entry
                </Typography>
              </Grid>
              {/* inputs */}
              <Grid item style={{ width: '100%' }}>
                <Grid container direction="column">
                  {/* Rate Type */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <TextField
                      select
                      variant="standard"
                      fullWidth
                      sx={textfieldSx}
                      SelectProps={
                        {
                          //native: true,
                        }
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Rate Type</InputAdornment>,
                      }}
                      value={loadEntry.rateType}
                      onChange={(e) =>
                        setLoadEntry({
                          ...loadEntry,
                          rateType: e.target.value,
                        })
                      }
                    >
                      {rateTypeOptions.map((item, i) => (
                        <MenuItem value={item.value} key={i}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {/* sl */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <TextField
                      select
                      variant="standard"
                      fullWidth
                      sx={textfieldSx}
                      SelectProps={
                        {
                          //native: true,
                        }
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="start">SL</InputAdornment>,
                      }}
                      value={loadEntry.sl}
                      onChange={(e) =>
                        setLoadEntry({
                          ...loadEntry,
                          sl: e.target.value,
                        })
                      }
                    >
                      {slOptions.map((item, i) => (
                        <MenuItem value={item.value} key={i}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {/* contact */}
                  <Grid style={{ marginTop: '20px', width: '100%' }}>
                    <Grid container spacing={1} alignItems="center">
                      {/* contact input */}
                      <Grid item style={{ flex: 1 }}>
                        <Autocomplete
                          value={loadEntry.equipment}
                          onChange={(event, newValue) => {
                            setLoadEntry({
                              ...loadEntry,
                              equipment: newValue,
                            });
                          }}
                          inputValue={equipmentInputValue}
                          onInputChange={(event, newInputValue) => {
                            setEquipmentInputValue(newInputValue);
                          }}
                          id="equipmentInput"
                          disableClearable
                          options={equipments.flatMap((c) => {
                            return c.values.map((v) => {
                              return {
                                label: v.label,
                                id: v.value,
                              };
                            });
                          })}
                          freeSolo
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              fullWidth
                              sx={textfieldSx}
                              InputProps={{
                                ...params.InputProps,

                                startAdornment: (
                                  <InputAdornment position="start">Equipment</InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment>
                                    <IconButton
                                      style={{ padding: 0 }}
                                      onClick={() =>
                                        setSelectEquipmentModal({
                                          active: true,
                                          value: loadEntry.equipment,
                                        })
                                      }
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* status */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <TextField
                      select
                      variant="standard"
                      fullWidth
                      sx={textfieldSx}
                      SelectProps={
                        {
                          // native: true,
                        }
                      }
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Status</InputAdornment>,
                      }}
                      value={loadEntry.status}
                      onChange={(e) =>
                        setLoadEntry({
                          ...loadEntry,
                          status: e.target.value,
                        })
                      }
                    >
                      {statusOptions.map((item, i) => (
                        <MenuItem value={item.value} key={i}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Trace numbers */}
          <Grid item style={{ display: 'flex', width: matches1400 ? '100%' : '25%' }}>
            <Grid container direction="column" sx={cardStyleSx}>
              {/* heading */}
              <Grid item style={{ width: '100%' }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Trace Numbers
                </Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid container direction="column" alignItems={'flex-start'}>
                  {/* trace number and type */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 600,
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#505050',
                          }}
                        >
                          Trace Number
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 600,
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#505050',
                          }}
                        >
                          Type
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* divider */}
                  <Grid item style={{ marginTop: '5px', width: '100%' }}>
                    <Divider style={{ borderWidth: '1px' }} />
                  </Grid>
                  {/* EDI shipment ID */}
                  <Grid item style={{ marginTop: '10px', width: '100%' }}>
                    <Grid container spacing={1}>
                      {/* value */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          A000000000
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          EDI Shipment ID
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Bill of Landing */}
                  <Grid item style={{ marginTop: '10px', width: '100%' }}>
                    <Grid container spacing={1}>
                      {/* value */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          ABC000000
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          Bill of Landing
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* ProBill */}
                  <Grid item style={{ marginTop: '10px', width: '100%' }}>
                    <Grid container spacing={1}>
                      {/* value */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          A0000000000
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          ProBill
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* purchase order */}
                  <Grid item style={{ marginTop: '10px', width: '100%' }}>
                    <Grid container spacing={1}>
                      {/* value */}
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: '13px',
                            lineHeight: '20px',
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.light.main : '#777777',
                          }}
                        >
                          0000
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid
                          container
                          style={{ gap: '4px' }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{
                                fontSize: '13px',
                                lineHeight: '20px',
                                color:
                                  theme.palette.mode === 'dark'
                                    ? theme.palette.light.main
                                    : '#777777',
                              }}
                            >
                              Purchase Order
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton
                              style={{ padding: 0 }}
                              // onClick={() => {
                              //   setOpenAddCustomerModal({
                              //     active: true,
                              //     customer: null,
                              //   });
                              // }}
                              disableRipple
                            >
                              <AddCircleIcon
                                style={{
                                  color:
                                    theme.palette.mode === 'dark'
                                      ? theme.palette.light.main
                                      : theme.palette.primary.main,
                                }}
                                fontSize="small"
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Rate Amount */}
          <Grid item style={{ display: 'flex', width: matches1400 ? '100%' : '25%' }}>
            <Grid container direction="column" sx={cardStyleSx}>
              {/* heading */}
              <Grid item style={{ width: '100%' }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.light.main
                        : theme.palette.primary.main,
                  }}
                >
                  Rate Amount
                </Typography>
              </Grid>
              {/* inputs */}
              <Grid item style={{ width: '100%' }}>
                <Grid container direction="column" alignItems={'flex-start'}>
                  {/* contract amount, Margin, Decl value */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                      {/* contractAmount */}
                      <Grid item xs={4}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Contract Amount"
                          placeholder=""
                          InputProps={{
                            startAdornment: '$',
                          }}
                          value={rateAmount.contractAmount}
                          onChange={(e) =>
                            setRateAmount({
                              ...rateAmount,
                              contractAmount: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      {/* margin */}
                      <Grid item xs={4}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Margin"
                          placeholder=""
                          InputProps={{
                            startAdornment: ' ',
                            endAdornment: '%',
                          }}
                          value={rateAmount.margin}
                          onChange={(e) =>
                            setRateAmount({
                              ...rateAmount,
                              margin: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      {/* declValue */}
                      <Grid item xs={4}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Decl. Value"
                          placeholder=""
                          InputProps={{
                            startAdornment: '$',
                          }}
                          value={rateAmount.declValue}
                          onChange={(e) =>
                            setRateAmount({
                              ...rateAmount,
                              declValue: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* actualAmtount actualMargin */}
                  <Grid item style={{ marginTop: '20px', width: '100%' }}>
                    <Grid container spacing={4} alignItems="center">
                      {/* actualAmount */}
                      <Grid item xs={4}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Actual Covered Amt."
                          placeholder=""
                          InputProps={{
                            startAdornment: '$',
                          }}
                          value={rateAmount.actualAmount}
                          onChange={(e) =>
                            setRateAmount({
                              ...rateAmount,
                              actualAmount: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      {/*Actual margin */}
                      <Grid item xs={4}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Actual Margin"
                          placeholder=""
                          InputProps={{
                            startAdornment: ' ',
                            endAdornment: '%',
                          }}
                          value={rateAmount.actualMargin}
                          onChange={(e) =>
                            setRateAmount({
                              ...rateAmount,
                              actualMargin: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Stops */}
      <Grid item className="container" style={{ width: '100%', marginTop: '30px' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={(event, newExpanded) => {
            setExpanded(newExpanded ? 'panel1' : false);
          }}
          sx={cardStyleSx}
          style={{ padding: '10px 25px', borderRadius: '15px' }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            {/* heading and add icon */}
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <AccordionSummary
                    style={{ padding: 0 }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        flexGrow: 1,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    >
                      Stops
                    </Typography>
                  </AccordionSummary>
                </Grid>
                <Grid item>
                  <IconButton
                    style={{ padding: 0 }}
                    // onClick={() => {
                    //   setOpenAddCustomerModal({
                    //     active: true,
                    //     customer: null,
                    //   });
                    // }}
                    disableRipple
                  >
                    <AddCircleIcon
                      style={{
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {/* info and Arrow */}
            <Grid item>
              <Grid container alignItems="center" spacing={matchesMD ? 2 : 5}>
                {/* Origin */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Origin: City,State
                  </Typography>
                </Grid>
                {/* Destination */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Destination: City,State
                  </Typography>
                </Grid>
                {/* mileage */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Total Mileage: 000.00
                  </Typography>
                </Grid>
                {/* Arrow */}
                <Grid item>
                  {expanded === 'panel1' ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AccordionDetails style={{ padding: 0, paddingBottom: '40px' }}>
            <Grid container spacing={4}>
              {/* left drag inputs */}
              <Grid item xs={12} lg={8}>
                <Grid container direction="column">
                  <DragDropContext onDragEnd={stopsDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided, snapshot) => (
                        <div
                          className="characters"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {stops.map((item, i) => (
                            <Grid item key={i} style={{ marginTop: i === 0 ? 0 : '15px' }}>
                              <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <div
                                      style={{
                                        width: '100%',
                                        padding: '30px 30px',
                                        border: '1px solid #E0E1E3',
                                        borderRadius: '15px',
                                      }}
                                    >
                                      {/* locationName inputs buttons*/}
                                      <Grid container spacing={5} justifyContent="space-between">
                                        {/* locationName */}
                                        <Grid item md={3} xs={12}>
                                          <Grid
                                            container
                                            spacing={1}
                                            justifyContent="space-between"
                                          >
                                            {/* locationName */}
                                            {item.location !== null ? (
                                              <Grid item style={{ flex: 1 }}>
                                                <Typography
                                                  variant="body2"
                                                  style={{
                                                    fontSize: '13px',
                                                    fontWeight: 500,
                                                    color:
                                                      theme.palette.mode === 'dark'
                                                        ? theme.palette.light.main
                                                        : theme.palette.primary.main,
                                                  }}
                                                >
                                                  {item?.location?.name}
                                                </Typography>
                                                <Typography
                                                  variant="body2"
                                                  style={{
                                                    fontSize: '13px',
                                                    marginTop: '4px',
                                                  }}
                                                >
                                                  {item.location.streetOne} <br />
                                                  {item.location.streetTwo}
                                                  <br />
                                                  {item.location?.state}, {item.location?.city}
                                                  <br />
                                                  {item.location?.postalCode},{' '}
                                                  {item.location?.country}
                                                </Typography>
                                              </Grid>
                                            ) : (
                                              <Grid item style={{ flex: 1 }}>
                                                <Autocomplete
                                                  value={item.location?.id}
                                                  onChange={(event, newValue) => {
                                                    setStops((c) =>
                                                      c.map((x, ind) => {
                                                        if (i === ind) {
                                                          let newLoc = locations.find(
                                                            (lo) => lo.id === newValue.id
                                                          );
                                                          x.location = newLoc ? newLoc : null;
                                                        }
                                                        return x;
                                                      })
                                                    );
                                                  }}
                                                  inputValue={item.locationInput}
                                                  onInputChange={(event, newInputValue) => {
                                                    setStops((c) =>
                                                      c.map((x, ind) => {
                                                        if (i === ind) {
                                                          x.locationInput = newInputValue;
                                                        }
                                                        return x;
                                                      })
                                                    );
                                                  }}
                                                  id="locationInput"
                                                  disableClearable
                                                  options={locations.map((c) => {
                                                    return {
                                                      label: `${c.streetOne ? c.streetOne : ''} ${
                                                        c.streetTwo ? c.streetTwo : ''
                                                      } ${c.state} ${c.city} ${c.postalCode} ${
                                                        c.country
                                                      }`,
                                                      id: c.id,
                                                    };
                                                  })}
                                                  freeSolo
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      variant="standard"
                                                      InputProps={{
                                                        ...params.InputProps,

                                                        endAdornment: (
                                                          <InputAdornment position="end">
                                                            <IconButton
                                                              style={{ padding: 0 }}
                                                              onClick={() =>
                                                                setAddLocationDialog(true)
                                                              }
                                                            >
                                                              <AddCircleIcon />
                                                            </IconButton>
                                                          </InputAdornment>
                                                        ),
                                                      }}
                                                      fullWidth
                                                      placeholder="Stop Search"
                                                      sx={textfieldSx}
                                                    />
                                                  )}
                                                />
                                              </Grid>
                                            )}
                                            {/* search */}
                                            {item.location !== null && (
                                              <Grid item>
                                                <IconButton
                                                  style={{ padding: 0 }}
                                                  onClick={() => {
                                                    setChangeLocationDialog({
                                                      active: true,
                                                      index: i,
                                                      location: item.location,
                                                    });
                                                  }}
                                                >
                                                  <SearchIcon />
                                                </IconButton>
                                              </Grid>
                                            )}
                                          </Grid>
                                        </Grid>
                                        {/* inputs button */}
                                        <Grid item md={9} xs={12}>
                                          <Grid container spacing={5}>
                                            {/* inputs */}
                                            <Grid item style={{ flex: 1 }}>
                                              <Grid
                                                container
                                                spacing={5}
                                                direction={!matchesSM ? 'row' : 'column'}
                                              >
                                                {/* contact */}
                                                <Grid item md={4} xs={12}>
                                                  <Grid container spacing={1} alignItems="center">
                                                    {/* contact input */}
                                                    <Grid item style={{ flex: 1 }}>
                                                      <Autocomplete
                                                        value={item.contact}
                                                        onChange={(event, newValue) => {
                                                          setStops((c) =>
                                                            c.map((x, ind) => {
                                                              if (i === ind) {
                                                                let newCus = customers.find(
                                                                  (cs) => cs.id === newValue.id
                                                                );
                                                                x.contact = newCus ? newCus : null;
                                                              }
                                                              return x;
                                                            })
                                                          );
                                                        }}
                                                        inputValue={item.contactInput}
                                                        onInputChange={(event, newInputValue) => {
                                                          setStops((c) =>
                                                            c.map((x, ind) => {
                                                              if (i === ind) {
                                                                x.contactInput = newInputValue;
                                                              }
                                                              return x;
                                                            })
                                                          );
                                                        }}
                                                        id="contactInput1"
                                                        disableClearable
                                                        options={customers.map((c) => {
                                                          return {
                                                            label: c.firstName + ' ' + c.lastName,
                                                            id: c.id,
                                                          };
                                                        })}
                                                        freeSolo
                                                        renderInput={(params) => (
                                                          <TextField
                                                            {...params}
                                                            variant="standard"
                                                            fullWidth
                                                            sx={textfieldSx}
                                                            InputProps={{
                                                              ...params.InputProps,

                                                              startAdornment: (
                                                                <InputAdornment position="start">
                                                                  Contact
                                                                </InputAdornment>
                                                              ),
                                                            }}
                                                          />
                                                        )}
                                                      />
                                                    </Grid>
                                                    {/* add Icon */}
                                                    <Grid item>
                                                      <IconButton
                                                        style={{ padding: 0 }}
                                                        onClick={() => {
                                                          setOpenAddCustomerModal({
                                                            active: true,
                                                            customer: null,
                                                          });
                                                        }}
                                                        disableRipple
                                                      >
                                                        <PersonAddAlt1Icon fontSize="small" />
                                                      </IconButton>
                                                    </Grid>
                                                  </Grid>
                                                </Grid>
                                                {/* pickup */}
                                                <Grid item md={4} xs={12}>
                                                  <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    sx={textfieldSx}
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          Pick Up
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    value={item.pickup}
                                                    onChange={(e) =>
                                                      setStops((c) =>
                                                        c.map((x, ind) => {
                                                          if (i === ind) {
                                                            x.pickup = e.target.value;
                                                          }
                                                          return x;
                                                        })
                                                      )
                                                    }
                                                  />
                                                </Grid>
                                                {/* startZone */}
                                                <Grid item md={4} xs={12}>
                                                  <TextField
                                                    variant="standard"
                                                    placeholder="00000"
                                                    fullWidth
                                                    sx={textfieldSx}
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          Start Zone
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    value={item.startZone}
                                                    onChange={(e) =>
                                                      setStops((c) =>
                                                        c.map((x, ind) => {
                                                          if (i === ind) {
                                                            x.startZone = e.target.value;
                                                          }
                                                          return x;
                                                        })
                                                      )
                                                    }
                                                  />
                                                </Grid>
                                                {/* phone ext */}
                                                <Grid item md={4} xs={12}>
                                                  <Grid container spacing={2}>
                                                    {/* phone */}
                                                    <Grid item style={{ flex: 1 }}>
                                                      <TextField
                                                        variant="standard"
                                                        placeholder="0000-000-0000"
                                                        fullWidth
                                                        sx={textfieldSx}
                                                        InputProps={{
                                                          startAdornment: (
                                                            <InputAdornment position="start">
                                                              Phone
                                                            </InputAdornment>
                                                          ),
                                                        }}
                                                        value={item.phone}
                                                        onChange={(e) =>
                                                          setStops((c) =>
                                                            c.map((x, ind) => {
                                                              if (i === ind) {
                                                                x.phone = e.target.value;
                                                              }
                                                              return x;
                                                            })
                                                          )
                                                        }
                                                      />
                                                    </Grid>
                                                    {/* ext */}
                                                    <Grid item style={{ width: '35%' }}>
                                                      <TextField
                                                        variant="standard"
                                                        placeholder="0000"
                                                        fullWidth
                                                        sx={textfieldSx}
                                                        InputProps={{
                                                          startAdornment: (
                                                            <InputAdornment position="start">
                                                              Ext.{' '}
                                                            </InputAdornment>
                                                          ),
                                                        }}
                                                        value={item.ext}
                                                        onChange={(e) =>
                                                          setStops((c) =>
                                                            c.map((x, ind) => {
                                                              if (i === ind) {
                                                                x.ext = e.target.value;
                                                              }
                                                              return x;
                                                            })
                                                          )
                                                        }
                                                      />
                                                    </Grid>
                                                  </Grid>
                                                </Grid>

                                                {/* start date */}
                                                <Grid item md={4} xs={12}>
                                                  <DateTimePicker
                                                    value={item.startDate}
                                                    onChange={(newValue) =>
                                                      setStops((c) =>
                                                        c.map((x, ind) => {
                                                          if (i === ind) {
                                                            x.startDate = newValue;
                                                          }
                                                          return x;
                                                        })
                                                      )
                                                    }
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        variant="standard"
                                                        placeholder="Start Date"
                                                        fullWidth
                                                        sx={textfieldSx}
                                                        error={false}
                                                        InputProps={{
                                                          ...params.InputProps,
                                                          startAdornment: (
                                                            <InputAdornment position="start">
                                                              Start Date
                                                            </InputAdornment>
                                                          ),
                                                        }}
                                                      />
                                                    )}
                                                  />
                                                </Grid>
                                                {/* End date */}
                                                <Grid item md={4} xs={12}>
                                                  <DateTimePicker
                                                    value={item.endDate}
                                                    onChange={(newValue) =>
                                                      setStops((c) =>
                                                        c.map((x, ind) => {
                                                          if (i === ind) {
                                                            x.endDate = newValue;
                                                          }
                                                          return x;
                                                        })
                                                      )
                                                    }
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        variant="standard"
                                                        fullWidth
                                                        sx={textfieldSx}
                                                        error={false}
                                                        InputProps={{
                                                          ...params.InputProps,
                                                          startAdornment: (
                                                            <InputAdornment position="start">
                                                              End Date
                                                            </InputAdornment>
                                                          ),
                                                        }}
                                                      />
                                                    )}
                                                  />
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            {/* button */}
                                            <Grid item>
                                              <Grid
                                                container
                                                spacing={2}
                                                direction={matchesSM ? 'row' : 'column'}
                                              >
                                                {/* button1 */}
                                                <Grid item>
                                                  <IconButton
                                                    style={{ padding: 0 }}
                                                    {...provided.dragHandleProps}
                                                  >
                                                    <MenuIcon fontSize="small" />
                                                  </IconButton>
                                                </Grid>
                                                {/* button2 */}
                                                <Grid item>
                                                  <IconButton
                                                    style={{ padding: 0 }}
                                                    onClick={() => {
                                                      setEditStopModal({
                                                        active: true,
                                                        index: i,
                                                        data: item,
                                                      });
                                                    }}
                                                  >
                                                    <EditIcon fontSize="small" />
                                                  </IconButton>
                                                </Grid>
                                                {/* delete */}
                                                <Grid item>
                                                  <IconButton
                                                    style={{ padding: 0 }}
                                                    onClick={() => {
                                                      setDeleteStopModal({
                                                        active: true,
                                                        index: i,
                                                        name: item.location?.name,
                                                      });
                                                    }}
                                                  >
                                                    <DeleteIcon fontSize="small" />
                                                  </IconButton>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            </Grid>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Grid>
              </Grid>
              {/* right map carrier */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={4}>
                  {/* map */}
                  <Grid item style={{ marginTop: '2em' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '199.981px',
                        height: '164.362px',
                        overflow: 'hidden',
                        borderRadius: '15px',
                      }}
                    >
                      <Map />
                    </div>
                  </Grid>
                  {/* carrier customer search Carrier */}
                  <Grid item style={{ flex: 1 }}>
                    {(carrier !== null || customer?.contact !== null) && (
                      <div
                        style={{
                          width: '100%',
                          padding: '30px 30px',
                          border: '1px solid #E0E1E3',
                          borderRadius: '15px',
                        }}
                      >
                        <Grid container spacing={3}>
                          {/* carrier */}
                          {carrier !== null && (
                            <Grid item md={6} xs={12}>
                              <Grid container spacing={1} justifyContent="space-between">
                                {/* carrier Name */}
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                      fontWeight: 500,
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? theme.palette.light.main
                                          : theme.palette.primary.main,
                                    }}
                                  >
                                    {carrier?.name}
                                  </Typography>
                                </Grid>
                                {/* search */}
                                <Grid item>
                                  <IconButton
                                    style={{ padding: 0 }}
                                    onClick={() => {
                                      setChangeCarrierDialog({
                                        active: true,
                                        carrier: carrier,
                                      });
                                    }}
                                  >
                                    <SearchIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                              {/* location */}
                              <Typography
                                variant="body2"
                                style={{
                                  fontSize: '13px',
                                  marginTop: '4px',
                                }}
                              >
                                {carrier?.streetOne} <br />
                                {carrier?.streetTwo}
                                <br />
                                {carrier?.state}, {carrier?.city}
                                <br />
                                {carrier?.postalCode}, {carrier?.country}
                              </Typography>
                              {/* DOT MC */}
                              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                                {/* DOT */}
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                    }}
                                  >
                                    DOT
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                      marginTop: '4px',
                                    }}
                                  >
                                    00000000
                                  </Typography>
                                </Grid>
                                {/* MC */}
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                    }}
                                  >
                                    MC
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                      marginTop: '4px',
                                    }}
                                  >
                                    00000000
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/* customer */}
                          {customer?.contact !== null && (
                            <Grid item md={6} xs={12}>
                              {/* customer name Edit*/}
                              <Grid container spacing={1} justifyContent="space-between">
                                {/* customer Name */}
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      fontSize: '13px',
                                      fontWeight: 500,
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? theme.palette.light.main
                                          : theme.palette.primary.main,
                                    }}
                                  >
                                    {customer?.contact?.firstName
                                      ? customer?.contact?.firstName
                                      : ''}
                                    {customer?.contact?.lastName
                                      ? ' ' + customer?.contact?.lastName
                                      : ''}
                                  </Typography>
                                </Grid>
                                {/* edit */}
                                <Grid item>
                                  <IconButton
                                    style={{ padding: 0 }}
                                    onClick={() => {
                                      setOpenAddCustomerModal({
                                        active: true,
                                        customer: customer.contact,
                                      });
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                              {/* phone ext */}
                              <Grid container style={{ gap: '20px' }}>
                                {/* phone */}
                                <Typography
                                  variant="body2"
                                  style={{
                                    fontSize: '13px',
                                    marginTop: '4px',
                                  }}
                                >
                                  {customer?.contact?.phone}
                                </Typography>
                                {/* ext */}
                                <Typography
                                  variant="body2"
                                  style={{
                                    fontSize: '13px',
                                    marginTop: '4px',
                                  }}
                                >
                                  {customer?.contact?.ext}
                                </Typography>
                              </Grid>

                              {/* email */}
                              <Typography
                                variant="body2"
                                style={{
                                  fontSize: '13px',
                                  marginTop: '4px',
                                }}
                              >
                                {customer?.contact?.email}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </div>
                    )}
                    {/* search carrier */}
                    <div
                      style={{
                        width: '100%',
                        padding: '30px 30px',
                        border: '1px dotted #E0E1E3',
                        borderRadius: '15px',
                        marginTop: '10px',
                        minWidth: '300px',
                      }}
                    >
                      <Autocomplete
                        value={carrier?.id}
                        onChange={(event, newValue) => {
                          let newLoc = locations.find((lo) => lo.id === newValue.id);
                          setCarrier(newLoc ? newLoc : null);
                        }}
                        inputValue={carrierInput}
                        onInputChange={(event, newInputValue) => {
                          setCarrierInput(newInputValue);
                        }}
                        id="locationInput3"
                        disableClearable
                        options={locations.map((c) => {
                          return {
                            label: `${c.streetOne ? c.streetOne : ''} ${
                              c.streetTwo ? c.streetTwo : ''
                            } ${c.state} ${c.city} ${c.postalCode} ${c.country}`,
                            id: c.id,
                          };
                        })}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            InputProps={{
                              ...params.InputProps,

                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    style={{ padding: 0 }}
                                    onClick={() => setAddLocationDialog(true)}
                                  >
                                    <AddCircleIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                            placeholder="Carrier Search"
                            sx={textfieldSx}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* commadities */}
      <Grid item className="container" style={{ width: '100%', marginTop: '30px' }}>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={(event, newExpanded) => {
            setExpanded(newExpanded ? 'panel2' : false);
          }}
          sx={cardStyleSx}
          style={{ padding: '10px 25px', borderRadius: '15px' }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            {/* heading and add icon */}
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <AccordionSummary
                    style={{ padding: 0 }}
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        flexGrow: 1,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    >
                      Commodities
                    </Typography>
                  </AccordionSummary>
                </Grid>
                <Grid item>
                  <IconButton
                    style={{ padding: 0 }}
                    // onClick={() => {
                    //   setOpenAddCustomerModal({
                    //     active: true,
                    //     customer: null,
                    //   });
                    // }}
                    disableRipple
                  >
                    <AddCircleIcon
                      style={{
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {/* info and Arrow */}
            <Grid item>
              <Grid container alignItems="center" spacing={matchesMD ? 2 : 5}>
                {/* Commodity Name */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Commodity: Commodity Name
                  </Typography>
                </Grid>
                {/* Pieces */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Pieces: 000
                  </Typography>
                </Grid>
                {/* Weight */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Weight: 000
                  </Typography>
                </Grid>
                {/* Pallets */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Pallets: 000
                  </Typography>
                </Grid>
                {/* Cube */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Cube: 000
                  </Typography>
                </Grid>
                {/* Volume */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Volume: 000
                  </Typography>
                </Grid>
                {/* Arrow */}
                <Grid item>
                  {expanded === 'panel2' ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <AccordionDetails style={{ padding: 0, paddingBottom: '40px' }}>
            <Grid container direction="column">
              <DragDropContext onDragEnd={commoditiesDragEnd}>
                <Droppable droppableId="characters">
                  {(provided, snapshot) => (
                    <div
                      className="characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {commodities.map((item, i) => (
                        <Grid item key={i} style={{ marginTop: '15px' }}>
                          <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  style={{
                                    padding: '30px 30px',
                                    border: '1px solid #E0E1E3',
                                    borderRadius: '15px',
                                    gap: '40px',
                                  }}
                                  direction={matchesMD ? 'column' : 'row'}
                                >
                                  {/* commodityName */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="Commodity Name"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            Commodity
                                          </InputAdornment>
                                        ),
                                      }}
                                      value={item.commodityName}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.commodityName = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* Pieces */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="Code"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Pieces</InputAdornment>
                                        ),
                                      }}
                                      value={item.pieces}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.pieces = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* weight */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Weight</InputAdornment>
                                        ),
                                      }}
                                      value={item.weight}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.weight = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* pallets */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Pallets</InputAdornment>
                                        ),
                                      }}
                                      value={item.pallets}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.pallets = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* cube */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Cube</InputAdornment>
                                        ),
                                      }}
                                      value={item.cube}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.cube = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* volume */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Volume</InputAdornment>
                                        ),
                                      }}
                                      value={item.volume}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.volume = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* button */}
                                  <Grid item>
                                    <Grid
                                      container
                                      justifyContent={matchesMD ? 'flex-end' : 'flex-start'}
                                      style={{ gap: '20px' }}
                                    >
                                      {/* edit */}
                                      <Grid item>
                                        <IconButton
                                          style={{ padding: 0 }}
                                          onClick={() => {
                                            setEditCommodityModal({
                                              active: true,
                                              index: i,
                                              data: item,
                                            });
                                          }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                      {/* delete */}
                                      <Grid item>
                                        <IconButton
                                          style={{ padding: 0 }}
                                          onClick={() => {
                                            setDeleteCommodityModal({
                                              active: true,
                                              index: i,
                                              name: item.commodityName,
                                            });
                                          }}
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                      {/* Menu */}
                                      <Grid item>
                                        <IconButton
                                          style={{ padding: 0 }}
                                          {...provided.dragHandleProps}
                                        >
                                          <MenuIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </div>
                            )}
                          </Draggable>
                        </Grid>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* charges */}
      <Grid item className="container" style={{ width: '100%', marginTop: '30px' }}>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={(event, newExpanded) => {
            setExpanded(newExpanded ? 'panel3' : false);
          }}
          sx={cardStyleSx}
          style={{ padding: '10px 25px', borderRadius: '15px' }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            {/* heading and add icon */}
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <AccordionSummary
                    style={{ padding: 0 }}
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        flexGrow: 1,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    >
                      Charges
                    </Typography>
                  </AccordionSummary>
                </Grid>
                <Grid item>
                  <IconButton
                    style={{ padding: 0 }}
                    // onClick={() => {
                    //   setOpenAddCustomerModal({
                    //     active: true,
                    //     customer: null,
                    //   });
                    // }}
                    disableRipple
                  >
                    <AddCircleIcon
                      style={{
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.light.main
                            : theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {/* info and Arrow */}
            <Grid item>
              <Grid container alignItems="center" spacing={matchesMD ? 2 : 5}>
                {/* Carrier  */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Carrier: $000.00
                  </Typography>
                </Grid>
                {/* Customer */}
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      flexGrow: 1,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.light.main
                          : theme.palette.primary.main,
                    }}
                  >
                    Customer: $000.00
                  </Typography>
                </Grid>

                {/* Arrow */}
                <Grid item>
                  {expanded === 'panel3' ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <AccordionDetails style={{ padding: 0, paddingBottom: '40px' }}>
            <Grid container direction="column">
              <DragDropContext onDragEnd={chargesDragEnd}>
                <Droppable droppableId="characters">
                  {(provided, snapshot) => (
                    <div
                      className="characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {charges.map((item, i) => (
                        <Grid item key={i} style={{ marginTop: '15px' }}>
                          <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  style={{
                                    padding: '30px 30px',
                                    border: '1px solid #E0E1E3',
                                    borderRadius: '15px',
                                    gap: '40px',
                                  }}
                                  direction={matchesMD ? 'column' : 'row'}
                                >
                                  {/* billTo */}
                                  <Grid item xs>
                                    <TextField
                                      select
                                      variant="standard"
                                      placeholder="Bill To"
                                      fullWidth
                                      style={{ minWidth: '270px' }}
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Bill To</InputAdornment>
                                        ),
                                      }}
                                      value={item.billTo}
                                      onChange={(e) =>
                                        setCharges((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.billTo = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    >
                                      {billToOptions.map((item, i) => (
                                        <MenuItem value={item.value} key={i}>
                                          {item.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                  {/* chargeCode */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="Code"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            Charge Code
                                          </InputAdornment>
                                        ),
                                      }}
                                      value={item.chargeCode}
                                      onChange={(e) =>
                                        setCommodities((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.chargeCode = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* description */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="Charge Description"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            Description
                                          </InputAdornment>
                                        ),
                                      }}
                                      value={item.description}
                                      onChange={(e) =>
                                        setCharges((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.description = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* quantity */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">Quantity</InputAdornment>
                                        ),
                                      }}
                                      value={item.quantity}
                                      onChange={(e) =>
                                        setCharges((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.quantity = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* rate */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000.00"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <>
                                            <InputAdornment position="start">Rate</InputAdornment>$
                                          </>
                                        ),
                                      }}
                                      value={item.rate}
                                      onChange={(e) =>
                                        setCharges((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.rate = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* amount */}
                                  <Grid item xs>
                                    <TextField
                                      variant="standard"
                                      placeholder="000.00"
                                      fullWidth
                                      sx={textfieldSx}
                                      InputProps={{
                                        startAdornment: (
                                          <>
                                            <InputAdornment position="start">Amount</InputAdornment>
                                            $
                                          </>
                                        ),
                                      }}
                                      value={item.amount}
                                      onChange={(e) =>
                                        setCharges((c) =>
                                          c.map((x, ind) => {
                                            if (i === ind) {
                                              x.amount = e.target.value;
                                            }
                                            return x;
                                          })
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* button */}
                                  <Grid item>
                                    <Grid
                                      container
                                      justifyContent={matchesMD ? 'flex-end' : 'flex-start'}
                                      style={{ gap: '20px' }}
                                    >
                                      {/* edit */}
                                      <Grid item>
                                        <IconButton
                                          style={{ padding: 0 }}
                                          onClick={() => {
                                            setEditChargeModal({
                                              active: true,
                                              index: i,
                                              data: item,
                                            });
                                          }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                      {/* delete */}
                                      <Grid item>
                                        <IconButton
                                          style={{ padding: 0 }}
                                          onClick={() => {
                                            setDeleteChargeModal({
                                              active: true,
                                              index: i,
                                              name: item.chargeCode,
                                            });
                                          }}
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                      {/* Menu */}
                                      <Grid item>
                                        <IconButton
                                          {...provided.dragHandleProps}
                                          style={{ padding: 0 }}
                                        >
                                          <MenuIcon fontSize="small" />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </div>
                            )}
                          </Draggable>
                        </Grid>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
