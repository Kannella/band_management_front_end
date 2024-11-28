import { useState } from 'react';

function useBookingTable(initialRows) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedColumn, setSelectedColumn] = useState('');
  const [rows, setRows] = useState(initialRows);
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

  const filteredRows = initialRows.filter((row) => {
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
    rows,
    setSelectedRows,
    setSelectedColumn,
    handleSelect,
    isSelected,
    filteredRows,
    handleDelete,
    getStageColor,
    textFilter,
    setTextFilter,
    activeFilter,
    setActiveFilter,
  };
}

export default useBookingTable;
