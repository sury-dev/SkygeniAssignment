// Importing necessary libraries and components from React and Material-UI
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

// Importing custom CSS for styling the component
import './XL.css';

// XL component accepts props: 
// isAcv (boolean) - whether to display values as monetary (ACV - Annual Contract Value),
// maxValue (number) - maximum value for scaling (not used in this snippet),
// data (array) - list of rows containing data for each stage
function XL({ isAcv = false, maxValue = 0, data = [] }) {
    return (
        // Container for the table with Material-UI Paper styling and custom border/margin
        <TableContainer component={Paper} className="stage-table-container" sx={{border:'1px solid #ccc', margin: '0px 40px', width: '100%'}}>
            <Table className="stage-table">
                
                {/* Table header with column labels */}
                <TableHead>
                    <TableRow>
                        <TableCell>Stage</TableCell>
                        <TableCell align="center">Came to Stage</TableCell>
                        <TableCell align="center" className="lost-header">Lost / Disqualified</TableCell>
                        <TableCell align="center" className="next-header">Moved to Next Stage</TableCell>
                        <TableCell align="center">Win Rate %</TableCell>
                    </TableRow>
                </TableHead>

                {/* Table body which maps through the data prop and displays rows */}
                <TableBody>
                    {data.map((row, index) => {
                        // Flag to check if the current row is for "Won"
                        const isWon = row.label === 'Won';
                        // Flag to check if the current row is for "Total"
                        const isTotal = row.label === 'Total';
                        // Determine value based on isAcv flag - either 'acv' or 'count'
                        const value = isAcv ? row.acv : row.count;

                        return (
                            // Generate each row, with conditional class names:
                            // - 'won-row' for "Won"
                            // - 'total-row' for "Total"
                            // - 'alt-row' for alternate styling on odd rows
                            <TableRow
                                key={index}
                                className={isWon ? 'won-row' : isTotal ? 'total-row' : index % 2 === 1 ? 'alt-row' : ''}
                            >
                                {/* Stage label */}
                                <TableCell>{row.label}</TableCell>

                                {/* Value for 'Came to Stage' with currency prefix if isAcv is true */}
                                <TableCell align="center" className={`${isWon ? 'next-header' : ''}`}>
                                    {isAcv ? '$' : ''}{value}
                                </TableCell>

                                {/* Value for 'Lost / Disqualified' (skip for 'Won' if isAcv) */}
                                <TableCell align="center">
                                    {isAcv ? isWon ? '' : '$' : ''}{row.lost}
                                </TableCell>

                                {/* Value for 'Moved to Next Stage' (skip for 'Won' if isAcv) */}
                                <TableCell align="center">
                                    {isAcv ? isWon ? '' : '$' : ''}{row.qualified}
                                </TableCell>

                                {/* Win rate percentage - omit '%' symbol for 'Total' row */}
                                <TableCell align="center">
                                    {row.winPercent}{isTotal ? '' : '%'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Exporting the XL component as default
export default XL
