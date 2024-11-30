import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Box, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, Menu, FormControl, InputLabel, Select, TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle,faEllipsisVertical, faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { ReactComponent as FilterIcon } from '../../assets/images/icon-filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/images/icon_trash.svg';

import './booking_components.css';  // Importando o arquivo CSS
import useBookingTable from '../../hooks/useBookingTable';
import PopUpCreateBooking from './popup_create_bookings';

const TableComponent = () => {
  const initialRows = [
    { id: 1, title: 'Booking Title 1', band: 'band one', date: new Date(2024, 10, 24), stages: 'final', venue: 'arena', agent: 'Martin' },
    { id: 2, title: 'Booking Title 2', band: 'band two', date: new Date(2024, 10, 26), stages: 'optional', venue: 'stadium', agent: 'Sarah' },
    { id: 3, title: 'Booking Title 3', band: 'band three', date: new Date(2024, 10, 27), stages: 'canceled', venue: 'arena', agent: 'Martin' },
  ];

  const {
    rows,
    selectedColumn,
    setSelectedColumn,
    handleDelete,
    handleSelect,
    isSelected,
    filteredRows,
    getStageColor,
    textFilter,
    setTextFilter,
    setActiveFilter,
  } = useBookingTable(initialRows);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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
      <Box className='box-actions' sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap:'20px' }}>
      <Button  onClick={toggleFilter}>
          <FilterIcon className="icon-filter" /><span className="filters-text">Filters</span>
        </Button>
      <Button >
        <TrashIcon className="icon-trash"></TrashIcon>
        </Button>

        <PopUpCreateBooking isOpen={isPopupOpen} onClose={handleClose} />

      </Box>

      {isFilterOpen && (
        <Box className="filter-section">
          <FormControl >
            <Select
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
            label={selectedColumn}
            variant="outlined"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
          <Button onClick={() => setActiveFilter(textFilter)}>
            <FontAwesomeIcon className='icon-search' icon={faSearch} onClick={() => setActiveFilter(textFilter)}  />
          </Button>
        </Box>
      )}

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
            <TableCell padding="elipsis"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id} selected={isSelected(row.id)}>
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected(row.id)} onChange={() => handleSelect(row.id)} />
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
                  className="ellipsis-icon"
                  icon={faEllipsisVertical}
                  onClick={(e) => handleMenuClick(e, row)}
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

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {filteredRows.map((row) => (
          <Accordion key={row.id}>
            <AccordionSummary>
              <Typography className="accordion-text" style={{ marginRight: '20px' }}>
                {row.title}
              </Typography>
              <Typography className="accordion-text">
                <FontAwesomeIcon icon={faCircle} style={{ color: getStageColor(row.stages), marginLeft: '20px' }} /> {row.stages}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Band: {row.band}
                <br />
                Venue: {row.venue}
                <br />
                Date: {format(row.date, 'dd/MM/yyyy')}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </TableContainer>
  );
};

export default TableComponent;
