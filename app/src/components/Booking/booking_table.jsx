import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Box, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, Menu, FormControl, InputLabel, Select, TextField} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import './booking_components.css';
import useBookingTable from '../../hooks/useBookingTable';

import PopUpCreateBooking from './popup_create_bookings';

const TableComponent = () => {
  const initialRows = [
    { id: 1, title: 'Booking Title 1', band: 'band one', date: new Date(2024, 10, 24), stages: 'final', venue: 'arena', agent: 'Martin' },
    { id: 2, title: 'Booking Title 2', band: 'band two', date: new Date(2024, 10, 26), stages: 'optional', venue: 'stadium', agent: 'Sarah' },
    { id: 3, title: 'Booking Title 3', band: 'band three', date: new Date(2024, 10, 27), stages: 'canceled', venue: 'arena', agent: 'Martin' },
  ];

  const {
    selectedColumn,
    filter,
    setSelectedColumn,
    setFilter,
    handleSelect,
    isSelected,
    filteredRows,
    handleDelete,
    getStageColor
  } = useBookingTable(initialRows);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleMenuClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigateToBookingPage = () => {
    alert(`Navigating to Booking Page of ID: ${selectedBooking.id}`);
    handleCloseMenu();
  };

  const handleEditBooking = () => {
    alert(`Editing Booking: ${selectedBooking.id}`);
    handleCloseMenu();
  };

  const handleClose = () => setIsPopupOpen(false);

  return (

    <TableContainer component={Paper} className="table-container">
      <Box sx={{ overflowX: 'auto', marginBottom: '20px', display: 'flex', justifyContent: 'start'}}>
        <FormControl sx={{ display: 'flex', width: '20%', marginRight: 2 }}>
          <InputLabel id="column-select-label">Select Column</InputLabel>
          <Select
            labelId="column-select-label"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <MenuItem value="">Select Column</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="band">Band</MenuItem>
            <MenuItem value="venue">Venue</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="stages">Stages</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filter by Title"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ 
            width: '20vw' }}
        />

        <PopUpCreateBooking  isOpen={isPopupOpen} onClose={handleClose}/>
      </Box>

      <Table className="table" sx={{ display: { xs: 'none', sm: 'table' } }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell className="table-cell-header">Title</TableCell>
            <TableCell className="table-cell-header">Band</TableCell>
            <TableCell className="table-cell-header">Date</TableCell>
            <TableCell className="table-cell-header">Stages</TableCell>
            <TableCell className="table-cell-header">Venue</TableCell>
            <TableCell className="table-cell-header">Agent</TableCell>
            <TableCell className="table-cell-header">Actions</TableCell>
            <TableCell padding="elipsis"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id} selected={isSelected(row.id)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(row.id)}
                  onChange={() => handleSelect(row.id)}
                  inputProps={{ 'aria-labelledby': `checkbox-${row.id}` }}
                />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.band}</TableCell>
              <TableCell>{format(row.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell style={{ color: getStageColor(row.stages) }}>
                <FontAwesomeIcon icon={faCircle} /> {row.stages}
              </TableCell>
              <TableCell>{row.venue}</TableCell>
              <TableCell>{row.agent}</TableCell>
              <TableCell>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={`trash-icon ${isSelected(row.id) ? 'visible' : ''}`}
                  onClick={() => isSelected(row.id) && handleDelete(row.id)}
                  style={{
                    fontSize: 20,
                    cursor: isSelected(row.id) ? 'pointer' : 'not-allowed',
                    color: isSelected(row.id) ? 'red' : 'gray',
                    transition: 'color 0.3s'
                  }}
                />
              </TableCell>

              <TableCell>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  onClick={(e) => handleMenuClick(e, row)}
                  style={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: 'gray',
                    transition: 'color 0.3s',
                  }}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleNavigateToBookingPage}>Go to Booking</MenuItem>
                  <MenuItem onClick={handleEditBooking}>Edit Booking</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: { xs: 'block', sm: 'none'} }}>
        {filteredRows.map((row) => (
          <Accordion key={row.id}>
            <AccordionSummary>
              <Typography className='accordion-text' style={{marginRight:'20px' }}>{row.title}</Typography>
              <Typography className='accordion-text' ><FontAwesomeIcon icon={faCircle} style={{ color: getStageColor(row.stages), marginLeft:'20px' }} /> {row.stages}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography><span style={{fontWeight:700}}>Band: </span>{row.band}</Typography>
                <Typography><span style={{fontWeight:700}}>Date:</span> {format(row.date, 'dd/MM/yyyy')}</Typography>

                <Typography >Venue: {row.venue}</Typography>
                <Typography >Agent: {row.agent}</Typography>
                
                <Box className= 'icon-box-accordion' sx={{ display: 'flex', gap: 5 }}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(row.id)}
                    style={{
                      fontSize: 20,
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={(e) => handleMenuClick(e, row)}
                    style={{
                      fontSize: 20,
                      cursor: 'pointer',
                      color: 'gray',
                    }}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={handleNavigateToBookingPage}>Go to Booking</MenuItem>
                    <MenuItem onClick={handleEditBooking}>Edit Booking</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

    </TableContainer>
  );
};

export default TableComponent;
