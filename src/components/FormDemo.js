import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState } from "react";
import Display from "./Display";
import Notifications, {notify} from 'react-notify-toast';

const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regFoMob = RegExp(/^[0-9]{10}$/);
export default function FormDemo() {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /*  const handleClick = () => {
    setOpen(true);
  };
 */

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    console.log(event.target.value);
    switch (name) {
      case "name":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 3)";
        setError({ ...error, name: f_error });
        break;

      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "phone":
        let ph_error = regFoMob.test(value)
          ? ""
          : "Must be of exact 10 digit number";
        setError({ ...error, phone: ph_error });
        break;
      default:
        break;
    }
  };

  const handleformSubmit = async () => {
    if (state.name === "" || state.email === "" || state.phone === "") {
      alert("enter valid details");
    } else {
      if (
        state.q1 === "" ||
        state.q2 === "" ||
        state.q3 === "" ||
        state.q4 === ""
      ) {
        alert("All fields are mandatory");
      } else {
        console.log(state);
        const a = state;
        if (localStorage.getItem("Feedback") !== null) {
          const arr = JSON.parse(localStorage.getItem("Feedback"));
          arr.push(a);
          localStorage.setItem("Feedback", JSON.stringify(arr));
        } else {
          console.log("bcd");
          localStorage.setItem("Feedback", JSON.stringify([a]));
        }

        setState({
          name: "",
          email: "",
          phone: "",
          q1: "",
          q2: "",
          q3: "",
          q4: "",
        });
        await setOpen(true);
        notify.show('Successfully Submitted feedback form','success',3000);
      }
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>

      {open && <Notifications />}

      <Box>
    <Grid style={{background:" linear-gradient(89.93deg, #F53803 21.68%, #F5D020 53.28%)"}} container>
      <Grid item md={4}></Grid>
      <Grid item md={4}>
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      style={{background:"transparent"}}
    >
      <Tab sx={{width:'50%' ,fontWeight:800}}  label="Feedback Form" />
      <Tab sx={{width:'50%',fontWeight:800}}  label="Feedback Details" />

    </Tabs>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
     
      <TabPanel value={value} index={0}>
      <Box style={{ background: "#FFFDD0", margin: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h3">Aromatic Bar</Typography>
        </div>
        <div style={{ textAlign: "center" }}>
          <Typography variant="caption">
            We Are committed to providing with the best dinning experience
            possible , so we welcome your comments.Please fill out this
            questionaries.Thank You
          </Typography>
        </div>
      </Box>
      <Box>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4">Provide Your Basic Details</Typography>
        </div>
      </Box>
      <Grid container>
        <Grid item md={3}></Grid>
        <Grid item md={6}>
          <Paper
            sx={{
              "& > :not(style)": { m: 1, width: "400px" },
              /* border: "2px solid gray", */
            }}
            autoComplete="off"
          >
            <Typography variant="h6">Customer Name</Typography>
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              autoComplete="off"
              /*   sx={{ width: "500px" }} */
              size="small"
              name="name"
              value={state.name}
              onChange={handler}
            />
            <div>
              {error?.name?.length > 0 && (
                <span style={{ color: "red" }}> {error.name} </span>
              )}
            </div>
            <Typography variant="h6">Email</Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              /*   sx={{ width: "500px" }} */
              autoComplete="off"
              size="small"
              name="email"
              value={state.email}
              onChange={handler}
            />
            <div>
              {error?.email?.length > 0 && (
                <span style={{ color: "red" }}> {error.email} </span>
              )}
            </div>
            <Typography variant="h6">Phone</Typography>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              autoComplete="off"
              /*    sx={{ width: "500px" }} */
              size="small"
              name="phone"
              value={state.phone}
              onChange={handler}
            />
            <div>
              {error?.phone?.length > 0 && (
                <span style={{ color: "red" }}> {error.phone} </span>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>

      <Grid container>
        <Grid item md={3}></Grid>
        <Grid item md={6}>
          <Paper
            sx={{ border: "1px solid gray", marginTop: "20px", padding: "5px" }}
          >
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                (Q1) Please Rate The Quality of service you received by host ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="q1"
                value={state.q1}
                onChange={handler}
              >
                <FormControlLabel
                  value="excellent"
                  control={<Radio />}
                  label="Excellent"
                  name="q1"
                />
                <FormControlLabel
                  value="good"
                  control={<Radio />}
                  label="Good"
                />
                <FormControlLabel
                  value="fair"
                  control={<Radio />}
                  label="Fair"
                />
                <FormControlLabel value="bad" control={<Radio />} label="Bad" />
              </RadioGroup>
              <Divider
                sx={{ width: "700px", padding: "2px", margin: "10px" }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">
                (Q2) Please Rate The Bevarage ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="q2"
                value={state.q2}
                onChange={handler}
              >
                <FormControlLabel
                  value="excellent"
                  control={<Radio />}
                  label="Excellent"
                  name="q2"
                />
                <FormControlLabel
                  value="good"
                  control={<Radio />}
                  label="Good"
                />
                <FormControlLabel
                  value="fair"
                  control={<Radio />}
                  label="Fair"
                />
                <FormControlLabel value="bad" control={<Radio />} label="Bad" />
              </RadioGroup>
              <Divider
                sx={{ width: "700px", padding: "2px", margin: "10px" }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">
                (Q3) Please Rate The Abcdefg ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="q3"
                value={state.q3}
                onChange={handler}
              >
                <FormControlLabel
                  value="excellent"
                  control={<Radio />}
                  label="Excellent"
                  name="q3"
                />
                <FormControlLabel
                  value="good"
                  control={<Radio />}
                  label="Good"
                />
                <FormControlLabel
                  value="fair"
                  control={<Radio />}
                  label="Fair"
                />
                <FormControlLabel value="bad" control={<Radio />} label="Bad" />
              </RadioGroup>
              <Divider
                sx={{ width: "700px", padding: "2px", margin: "10px" }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">
                (Q4) Please Rate The xyzxyz ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="q4"
                value={state.q4}
                onChange={handler}
              >
                <FormControlLabel
                  value="excellent"
                  control={<Radio />}
                  label="Excellent"
                  name="q4"
                />
                <FormControlLabel
                  value="good"
                  control={<Radio />}
                  label="Good"
                />
                <FormControlLabel
                  value="fair"
                  control={<Radio />}
                  label="Fair"
                />
                <FormControlLabel value="bad" control={<Radio />} label="Bad" />
              </RadioGroup>
              <div style={{ textAlign: "center" }}>
                <Button
                  sx={{ width: "300px", marginLeft: "5px" }}
                  size="large"
                  variant="contained"
                  onClick={handleformSubmit}
                >
                  Submit Form
                </Button>
              </div>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Display/>
      </TabPanel>
    </Box>
 
    </div>
  );
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "6px 15px 0 10px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
