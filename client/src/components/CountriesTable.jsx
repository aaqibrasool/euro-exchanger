import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CountriesTable = ({countries,amount}) => {
    return (
        <>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Population</TableCell>
                            <TableCell align="right">Currency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((country) => (
                            <TableRow
                            key={country.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {country.officialName}
                            </TableCell>
                            <TableCell align="right">{country.population}</TableCell>
                            <TableCell align="right">{amount * country.exchangeRate} {country.currency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>   
        </>
    )
}

export default CountriesTable
