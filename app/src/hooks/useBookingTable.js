import { useState } from 'react';

function useBookingTable(initialRows) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filter, setFilter] = useState('');
  const [rows, setRows] = useState(initialRows);

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
    if (selectedColumn) {
      return row[selectedColumn]?.toString().toLowerCase().includes(filter.toLowerCase());
    }
    return Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setSelectedRows(new Set());  // Clear selection after deletion
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'final':
        return '#037847'; 
      case 'optional':
        return '#364254';   
      case 'canceled':
        return '#780303';  
      default:
        return 'black';
    }
  };

  return {
    selectedRows,
    selectedColumn,
    filter,
    rows,
    setSelectedRows,
    setSelectedColumn,
    setFilter,
    handleSelect,
    isSelected,
    filteredRows,
    handleDelete,
    getStageColor,
  };
}

export default useBookingTable;
