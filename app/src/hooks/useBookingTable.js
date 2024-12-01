import { useState } from 'react';

function useBookingTable(bookings) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedColumn, setSelectedColumn] = useState('');
  const [rows, setRows] = useState(bookings);
  const [textFilter, setTextFilter] = useState(''); // Valor do input
  const [activeFilter, setActiveFilter] = useState(''); // Filtro aplicado ao apertar o botão


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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setSelectedRows(new Set());  // Clear selection after deletion
    }
  };

  const getStatusColor = (stage) => {
    switch (stage) {
      case 1 :
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
    getStatusColor,
    textFilter,
    setTextFilter,
    activeFilter,
    setActiveFilter,
  };
}

export default useBookingTable;
