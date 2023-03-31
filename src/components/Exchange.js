import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

function generateDummyHistoricalData(currencyPair) {
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date();
  const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const data = [];

  // Generate dummy data for each day
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = currentDate.toISOString().substring(0, 10);
    let rate;
    switch (currencyPair) {
      case "usdEur":
        rate = (Math.random() * (0.95 - 0.85) + 0.85).toFixed(4);
        break;
      case "usdInr":
        rate = (Math.random() * (80 - 70) + 70).toFixed(4);
        break;
      case "usdAud":
        rate = (Math.random() * (1.3 - 1.1) + 1.1).toFixed(4);
        break;
      default:
        rate = 0;
    }
    data.push({ date: dateStr, rate });
  }

  return data;
}

const currencyPairs = ["usdEur", "usdInr", "usdAud"];

const Exchange = () => {
  const [selectedPair, setSelectedPair] = useState(currencyPairs[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [historicalRates, setHistoricalRates] = useState([]);

  const handlePairChange = (event) => {
    setSelectedPair(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleViewRates = () => {
    const data = generateDummyHistoricalData(selectedPair);
    const filteredData = data.filter(
      (d) =>
        (!startDate || d.date >= startDate) && (!endDate || d.date <= endDate)
    );
    setHistoricalRates(filteredData);
  };

  const handleClearData = () => {
    setHistoricalRates([]);
  };

  useEffect(() => {
    // Check if data are stored in localStorage else generate dummy data
    const storedRates = localStorage.getItem("historicalRates");
    if (storedRates) {
      setHistoricalRates(JSON.parse(storedRates));
    } else {
      const dummyData = generateDummyHistoricalData(selectedPair);
      setHistoricalRates(dummyData);
    }
  }, [selectedPair]);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("historicalRates", JSON.stringify(historicalRates));
  }, [historicalRates]);

  return (
    <>
      <Grid container spacing={2.5} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <Paper elevation={2} style={{ padding: "16px" }}>
              <FormControl fullWidth>
                <InputLabel id="currencyPair">Select Currency Pair</InputLabel>
                <Select
                  labelId="currencyPairLabel"
                  id="currencyPair"
                  value={selectedPair}
                  onChange={handlePairChange}
                  sx={{ mt: 1, mb: 2 }}
                >
                  <MenuItem value="usdEur">USD/EUR</MenuItem>
                  <MenuItem value="usdInr">USD/GBP</MenuItem>
                  <MenuItem value="usdAud">USD/JPY</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewRates}
              >
                View Rates
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearData}
              >
                Clear Data
              </Button>
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <Paper elevation={2} style={{ padding: "16px" }}>
              {historicalRates.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historicalRates.map((row) => (
                      <TableRow key={row.date}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No Exchange Rates Available</p>
              )}
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Exchange;
