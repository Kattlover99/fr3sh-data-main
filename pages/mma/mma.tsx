import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from 'clsx';
import Box from '@mui/material/Box';
import styles from "../../styles/Home.module.css";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TABLE_COLUMNS: GridColDef[] = [
  { field: "event", headerName: "event", width: 200 },
  { field: "fighter", headerName: "Fighter", width: 200 },
  { field: "betonlineag", headerName: "betonlineag", width: 50 },
  { field: "pinnacle", headerName: "pinnacle", width: 50 },
  { field: "williamhill_us", headerName: "williamhill", width: 50 },
  { field: "sugarhouse", headerName: "sugarhouse", width: 50 },
  { field: "twinspires", headerName: "twinspires", width: 50 },
  { field: "betrivers", headerName: "betrivers", width: 50 },
  { field: "sport888", headerName: "sport888", width: 50 },
  { field: "lowvig", headerName: "lowvig", width: 50 },
  { field: "barstool", headerName: "barstool", width: 50 },
  { field: "betus", headerName: "betus", width: 50 },
  { field: "unibet_us", headerName: "unibet", width: 50 },
  { field: "fanduel", headerName: "fanduel", width: 50 },
  { field: "draftkings", headerName: "draftkings", width: 50 },
  { field: "betclic", headerName: "betclic", width: 50 },
  { field: "superbook", headerName: "superbook", width: 50 },
  { field: "betfair", headerName: "betfair", width: 50 },
  { field: "betmgm", headerName: "betmgm", width: 50 },
  { field: "marathonbet", headerName: "marathonbet", width: 50 },
  { field: "bovada", headerName: "bovada", width: 50 },


];

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [topValues, setTopValues] = useState([])
  const highestValues = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const res = await fetch("/api/mma/mma_ml").then((o) => o.json());
        const res = await fetch("https://prophub.ca/api/mma/mma_ml").then((o) => o.json());
        setData(res.data)
        // Group the array by event
        const _group_array = res.data.reduce((result, currentValue) => {
          const event = currentValue.event;
          // Create a new group array for the current event if one doesn't already exist
          if (!result[event]) {
            result[event] = [];
          }
          // Add the current object to the group array for the current event
          result[event].push(currentValue);
          return result;
        }, {});
        setGroupedData(_group_array);

        let newArray = res.data.map(obj => {
          let { index, event, fighter, ...rest } = obj;
          return rest;
        });
        newArray.map((element: {}) => {
          let values_arr: unknown[] = Object.values(element).filter((value: number) => {
            return typeof value === "number";
          });
          const values: number[] = values_arr as number[];
          const highestValue: number = Math.max(...values);
          highestValues.push(highestValue);
        });
        setTopValues(highestValues)

      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Fight Odds</h1>
        {loading && "Loading"}
        {
          !loading && Object.keys(groupedData).map((item, index) => {
            return (
              <>
                <h2>{item}</h2>
                <TableContainer component={Paper} key={index}>
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell>fighter</TableCell>
                        <TableCell align="right">barstool</TableCell>
                        <TableCell align="right">betclic</TableCell>
                        <TableCell align="right">betfair</TableCell>
                        <TableCell align="right">betmgm</TableCell>
                        <TableCell align="right">betonlineag</TableCell>
                        <TableCell align="right">betrivers</TableCell>
                        <TableCell align="right">betus</TableCell>
                        <TableCell align="right">bovada</TableCell>
                        <TableCell align="right">draftkings</TableCell>
                        <TableCell align="right">fanduel</TableCell>
                        <TableCell align="right">lowvig</TableCell>
                        <TableCell align="right">marathonbet</TableCell>
                        <TableCell align="right">pinnacle</TableCell>
                        <TableCell align="right">sport888</TableCell>
                        <TableCell align="right">sugarhouse</TableCell>
                        <TableCell align="right">superbook</TableCell>
                        <TableCell align="right">twinspires</TableCell>
                        <TableCell align="right">unibet_eu</TableCell>
                        <TableCell align="right">unibet_us</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topValues && topValues.length > 0 && groupedData[item].map((row) => {
                        return (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.fighter}
                            </TableCell>
                            <TableCell align="right" className={row.barstool === topValues[parseInt(row.index) - 1] && styles.active}>{row.barstool}</TableCell>
                            <TableCell align="right" className={row.betclic === topValues[parseInt(row.index) - 1] && styles.active}>{row.betclic}</TableCell>
                            <TableCell align="right" className={parseInt(row.betfair) === topValues[parseInt(row.index) - 1] && styles.active}>{row.betfair}</TableCell>
                            <TableCell align="right" className={row.betmgm === topValues[parseInt(row.index) - 1] && styles.active}>{row.betmgm}</TableCell>
                            <TableCell align="right" className={row.betonlineag === topValues[parseInt(row.index) - 1] && styles.active}>{row.betonlineag}</TableCell>
                            <TableCell align="right" className={row.betrivers === topValues[parseInt(row.index) - 1] && styles.active}>{row.betrivers}</TableCell>
                            <TableCell align="right" className={row.betus === topValues[parseInt(row.index) - 1] && styles.active}>{row.betus}</TableCell>
                            <TableCell align="right" className={row.bovada === topValues[parseInt(row.index) - 1] && styles.active}>{row.bovada}</TableCell>
                            <TableCell align="right" className={row.draftkings === topValues[parseInt(row.index) - 1] && styles.active}>{row.draftkings}</TableCell>
                            <TableCell align="right" className={row.fanduel === topValues[parseInt(row.index) - 1] && styles.active}>{row.fanduel}</TableCell>
                            <TableCell align="right" className={row.lowvig === topValues[parseInt(row.index) - 1] && styles.active}>{row.lowvig}</TableCell>
                            <TableCell align="right" className={row.marathonbet === topValues[parseInt(row.index) - 1] && styles.active}>{row.marathonbet}</TableCell>
                            <TableCell align="right" className={row.pinnacle === topValues[parseInt(row.index) - 1] && styles.active}>{row.pinnacle}</TableCell>
                            <TableCell align="right" className={row.sport888 === topValues[parseInt(row.index) - 1] && styles.active}>{row.sport888}</TableCell>
                            <TableCell align="right" className={row.sugarhouse === topValues[parseInt(row.index) - 1] && styles.active}>{row.sugarhouse}</TableCell>
                            <TableCell align="right" className={row.superbook === topValues[parseInt(row.index) - 1] && styles.active}>{row.superbook}</TableCell>

                            <TableCell align="right" className={row.twinspires === topValues[parseInt(row.index) - 1] && styles.active}>{row.twinspires}</TableCell>
                            <TableCell align="right" className={row.unibet_eu === topValues[parseInt(row.index) - 1] && styles.active}>{row.unibet_eu}</TableCell>
                            <TableCell align="right" className={row.unibet_us === topValues[parseInt(row.index) - 1] && styles.active}>{row.unibet_us}</TableCell>

                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>

                </TableContainer>
                <br />
                <br />
                <br />
                <br /></>
            )
          })
        }
        {/* {!loading && data && (
          <>

            <div className={styles.tableContainer}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  '& .super-app.negative': {
                    backgroundColor: '#FF0000',
                  },
                  '& .super-app.positive': {
                    backgroundColor: '#228C22',
                  },
                }}
              >
                <DataGrid
                  rows={data}
                  getRowId={(row) => row.index}
                  columns={TABLE_COLUMNS}
                />
              </Box>

            </div>
          </>
        )} */}
      </main>

      <footer className={styles.footer}>
        <a href="https://prophub.ca" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/prophub.jpg" alt="Rfr3sh" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};



export default Home;
