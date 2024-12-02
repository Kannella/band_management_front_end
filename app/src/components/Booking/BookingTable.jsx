import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Box, Accordion, AccordionSummary, AccordionDetails,
  Typography, MenuItem, Menu, FormControl, Select, TextField, Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEllipsisVertical, faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { ReactComponent as FilterIcon } from '../../assets/images/icon-filter.svg';
import { ReactComponent as TrashIcon } from '../../assets/images/icon_trash.svg';

import './booking_components.css';
import useBookingTable from '../../hooks/useBookingTable';
import PopUpCreateBooking from './BookingCreatePopup';

const BookingTable = ({ bookings }) => {
  const {
    rows,
    selectedColumn,
    setSelectedColumn,
    handleDelete,
    handleBulkDelete,
    handleSelect,
    isSelected,
    filteredRows,
    getStatusColor,
    textFilter,
    setTextFilter,
    setActiveFilter,
    selectedRows,
  } = useBookingTable(bookings);

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

  const handleClose = () => setIsPopupOpen(false);
  const navigate = useNavigate();

  const handleGoTo = async (id) => {
    if (!id) {
      alert('Invalid booking ID.');
      return;
    }
    try {
      console.log('Navigating to booking with ID:', id);
      navigate(`/bookings/${id}`);
    } catch (error) {
      console.error('Error navigating to booking:', error);
      alert('Failed to navigate to booking. Please try again.');
    }
  }

  return (
    <TableContainer component={Paper} className="table-container">
      {/* Actions */}
      <Box
        className="box-actions"
        sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '20px' }}
      >
        <Button onClick={toggleFilter}>
          <FilterIcon className="icon-filter" />
          <span className="filters-text">Filters</span>
        </Button>
        <Button onClick={handleBulkDelete} disabled={selectedRows.size === 0}>
          <TrashIcon className="icon-trash" />
        </Button>
        <PopUpCreateBooking isOpen={isPopupOpen} onClose={handleClose} />
      </Box>

      {/* Filters */}
      {isFilterOpen && (
        <Box className="filter-section">
          <FormControl>
            <Select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              <MenuItem value="">Select Column</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="bandName">Band</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={selectedColumn}
            variant="outlined"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
          <Button onClick={() => setActiveFilter(textFilter)}>
            <FontAwesomeIcon className="icon-search" icon={faSearch} />
          </Button>
        </Box>
      )}

      {/* Desktop Table */}
      <Table className="table" sx={{ display: { xs: 'none', sm: 'table' } }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell className="table-cell-header">Name</TableCell>
            <TableCell className="table-cell-header">Band</TableCell>
            <TableCell className="table-cell-header">Date</TableCell>
            <TableCell className="table-cell-header">Status</TableCell>
            <TableCell className="table-cell-header">Venue</TableCell>
            <TableCell className="table-cell-header">Agent</TableCell>
            <TableCell padding="checkbox"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((booking) => {
            const { id, name, status, bandName, showStartTime, venueName, agentName } = booking;
            return (
              <TableRow key={id} selected={isSelected(id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(id)} 
                    onChange={() => handleSelect(id)}
                  />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{bandName}</TableCell>
                <TableCell>{format(new Date(showStartTime), 'dd/MM/yyyy')}</TableCell>
                <TableCell style={{ color: getStatusColor(status) }}>
                  <FontAwesomeIcon icon={faCircle} />
                </TableCell>
                <TableCell>{venueName}</TableCell>
                <TableCell>{agentName}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    className="ellipsis-icon"
                    icon={faEllipsisVertical}
                    onClick={(e) => handleMenuClick(e, booking)}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                   <MenuItem onClick={() => handleGoTo(booking.id)}>
                      Go to Booking
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(id)}>
                      Delete Booking
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Mobile Accordion */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {filteredRows.map((booking) => {
          const { id, name, status, bandName, showStartTime, venueName } = booking;
          return (
            <Accordion key={id}>
              <AccordionSummary>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Checkbox
                    checked={isSelected(id)}
                    onChange={() => handleSelect(id)}
                  />
                  <Typography className="accordion-text">{name}</Typography>
                  <Typography
                    className="accordion-text"
                    style={{ color: getStatusColor(status), marginLeft: 'auto' }}
                  >
                    <FontAwesomeIcon icon={faCircle} />
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Band: {bandName}
                  <br />
                  Venue: {venueName}
                  <br />
                  Date: {format(new Date(showStartTime), 'dd/MM/yyyy')}
                </Typography>
                <Button onClick={() => handleDelete(id)}>Delete Booking</Button>
                <Button onClick={() => handleGoTo(booking.id)}>Go To</Button>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </TableContainer>
  );
};

export default BookingTable;

