import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";

function Converter() {
  const currencies = [
    {
      value: "INR",
      label: "₹ INR",
    },
    {
      value: "USD",
      label: "$ USD",
    },
    {
      value: "EUR",
      label: "€ EUR",
    },
    {
      value: "AUD",
      label: "A$ AUD",
    },
  ];
  const [selectedSource, setSelectedSource] = useState("EUR");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [ans, setAns] = useState("");
  const [usdEur, setusdEur] = useState(1.05);
  const [usdInr, setusdInr] = useState(80.05);
  const [usdAud, setusdAud] = useState(0.67);
  const [error, setError] = useState({});

  const handleSourceSelect = (e) => {
    setSelectedSource(e.target.value);
  };
  const handleTargetSelect = (e) => {
    setSelectedTarget(e.target.value);
  };

  // calculate ex-rate for different pairs
  const calculateExchangeRate = () => {
    let exchangeRate;
    switch (selectedSource) {
      case "USD":
        switch (selectedTarget) {
          case "EUR":
            exchangeRate = usdEur;
            break;
          case "INR":
            exchangeRate = usdInr;
            break;
          case "AUD":
            exchangeRate = usdAud;
            break;
          default:
            exchangeRate = null;
        }
        break;
      case "EUR":
        switch (selectedTarget) {
          case "USD":
            exchangeRate = 1 / usdEur;
            break;
          case "INR":
            exchangeRate = 1 / (usdEur / usdInr);
            break;
          case "AUD":
            exchangeRate = 1 / (usdEur / usdAud);
            break;
          default:
            exchangeRate = null;
        }
        break;
      case "INR":
        switch (selectedTarget) {
          case "USD":
            exchangeRate = 1 / usdInr;
            break;
          case "EUR":
            exchangeRate = usdEur / usdInr;
            break;
          case "AUD":
            exchangeRate = (usdEur / usdAud) * (usdInr / usdEur);
            break;
          default:
            exchangeRate = null;
        }
        break;
      case "AUD":
        switch (selectedTarget) {
          case "USD":
            exchangeRate = 1 / usdAud;
            break;
          case "EUR":
            exchangeRate = usdEur / usdAud;
            break;
          case "INR":
            exchangeRate = (usdInr / usdEur) * (usdAud / usdInr);
            break;
          default:
            exchangeRate = null;
        }
        break;
      default:
        exchangeRate = null;
    }

    return exchangeRate;
  };

  //   To change value
  const changeValue = (val) => {
    const changePercentage = Math.random() * 0.06 - 0.03;
    const newValue = val * (1 + changePercentage);
    return newValue.toFixed(2);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setusdEur((val) => changeValue(val));
      setusdInr((val) => changeValue(val));
      setusdAud((val) => changeValue(val));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //   Validate form
  const validateForm = () => {
    if (selectedTarget === "") {
      setError({ ...error, selectedTarget: "Please select target currency" });
      return false;
    }
    if (amount === "") {
      setError({ ...error, amount: "Please enter amount" });
      return false;
    }
    setError({});
    return true;
  };
  const calculation = () => {
    let rate = calculateExchangeRate();
    if (rate !== null) {
      setAns((rate * amount).toFixed(2));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      calculation();
    }
  };
  return (
    <>
      <Grid sx={{ flexGrow: 1, mt: 10 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-evenly" spacing="12">
            <Grid item>
              <Paper
                sx={{
                  height: 400,
                  width: 450,
                  backgroundColor: "#0A0634",
                  "@media only screen and (max-width: 600px)": {
                    width: "100vw",
                    height: "100%",
                  },
                }}
              >
                <Grid container justifyContent="flex-start">
                  <Typography
                    variant="h5"
                    color="#ffffff"
                    b="true"
                    sx={{ mt: 1 }}
                  >
                    Markets
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  sx={{ textAlignLast: "center" }}
                >
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: 300,
                      mt: 4,
                      backgroundColor: "#828282",
                      mb: 2,
                    }}
                  >
                    <Table
                      sx={{ width: 220, mt: 2, ml: 2, mr: 2 }}
                      aria-label="simple table"
                    >
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            USD/EUR
                          </TableCell>
                          <TableCell align="right">{usdEur}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            USD/INR
                          </TableCell>

                          <TableCell align="right">{usdInr}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            USD/AUD
                          </TableCell>
                          <TableCell align="right">{usdAud}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: 400,
                  width: 450,
                  backgroundColor: "#CCCCCC",
                  "@media only screen and (max-width: 600px)": {
                    width: "100vw",
                  },
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  direction="column"
                  sx={{ ml: 2, mr: 2 }}
                >
                  <Grid item sx={{ textAlignLast: "center" }}>
                    <Typography variant="h5" b="true" sx={{ mt: 1 }}>
                      Currency Converter
                    </Typography>
                  </Grid>
                  <form>
                    <Grid item sx={{ mt: 2 }}>
                      <InputLabel>Source Currency</InputLabel>
                      <TextField
                        id="outlined-select-Currency"
                        select
                        value={selectedSource}
                        size="small"
                        sx={{ width: "90%" }}
                        onChange={(e) => handleSourceSelect(e)}
                      >
                        {currencies.map(
                          (option) =>
                            option.value !== selectedTarget && (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            )
                        )}
                      </TextField>
                      <InputLabel>Target Currency</InputLabel>
                      <TextField
                        id="outlined-select-Currency"
                        select
                        required
                        size="small"
                        value={selectedTarget}
                        error={error.selectedTarget}
                        helperText={error.selectedTarget}
                        onChange={(e) => handleTargetSelect(e)}
                        sx={{ width: "90%" }}
                      >
                        {currencies.map(
                          (option) =>
                            option.value !== selectedSource && (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            )
                        )}
                      </TextField>
                      <InputLabel>Amount</InputLabel>
                      <TextField
                        id="outlined-select-Currency"
                        size="small"
                        required
                        sx={{ width: "90%" }}
                        type="number"
                        error={error.amount}
                        helperText={error.amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Grid>
                    {ans ? (
                      <Grid item sx={{ textAlignLast: "center", mt: 2, mb: 2 }}>
                        <Paper
                          sx={{
                            width: "90%",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography style={{ textAlign: "center" }}>
                            Estimated converted amount:{" "}
                            <span style={{ color: "green" }}>{ans}</span>
                          </Typography>
                        </Paper>
                      </Grid>
                    ) : null}
                    <Grid item sx={{ textAlignLast: "center", mt: 2, mb: 2 }}>
                      <Button
                        variant="text"
                        type="submit"
                        sx={{
                          color: "#000000",
                          backgroundColor: "#D9D9D9",
                          textTransform: "none",
                        }}
                        size="large"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Exchange
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Converter;
