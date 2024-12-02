import { useState } from 'react';
import axios from 'axios';

function useBookingTable(bookings) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedColumn, setSelectedColumn] = useState('');
  const [rows, setRows] = useState(bookings);
  const [textFilter, setTextFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const handleSelect = (id) => {
    setSelectedRows((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const isSelected = (id) => selectedRows.has(id);

  const filteredRows = rows.filter((row) => {
    if (!activeFilter || !selectedColumn) return true; 
    const columnValue = row[selectedColumn]?.toString().toLowerCase();
    return columnValue?.includes(activeFilter.toLowerCase());
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/${id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        setSelectedRows((prevSelected) => {
          const updatedSelected = new Set(prevSelected);
          updatedSelected.delete(id);
          return updatedSelected;
        });
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking. Please try again.');
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedRows.size} booking(s)?`);
    if (confirmDelete) {
      try {
        const deletePromises = Array.from(selectedRows).map(id => 
          axios.delete(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/${id}`)
        );
        await Promise.all(deletePromises);
        setRows((prevRows) => prevRows.filter((row) => !selectedRows.has(row.id)));
        setSelectedRows(new Set());
      } catch (error) {
        console.error('Error deleting bookings:', error);
        alert('Failed to delete some or all bookings. Please try again.');
      }
    }
  };

  const getStatusColor = (stage) => {
    switch (stage) {
      case 1:
        return '#037847'; 
      case 2:
        return '#364254';   
      case 3:
        return '#780303';  
      default:
        return 'black';
    }
  };
  
  return {
    selectedRows,
    selectedColumn,
    rows,
    setSelectedRows,
    setSelectedColumn,
    handleSelect,
    isSelected,
    filteredRows,
    handleDelete,
    handleBulkDelete,
    getStatusColor,
    textFilter,
    setTextFilter,
    activeFilter,
    setActiveFilter,
  };
}

export default useBookingTable;

