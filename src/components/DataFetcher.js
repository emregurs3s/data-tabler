import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DataFetcher = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = Object.keys(data)
      .filter(key => {
        const item = data[key];
        return key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            typeof value === 'number' && value.toString().includes(searchTerm)
          );
      })
      .reduce((res, key) => ({ ...res, [key]: data[key] }), {});
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(Object.keys(filteredData).length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableItems = Object.keys(filteredData).map(key => ({
      key,
      ...filteredData[key]
    }));

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  };

  if (!data || Object.keys(data).length === 0) {
    return <div>Veri mevcut değil</div>;
  }

  const updateDate = data["Update_Date"];
  delete data["Update_Date"];

  const allKeys = Object.keys(filteredData);
  const exampleValue = filteredData[allKeys[0]] || {};
  const valueHeaders = Object.keys(exampleValue);
  if (allKeys.some(key => filteredData[key].hasOwnProperty("name")) && !valueHeaders.includes("name")) {
    valueHeaders.unshift("name");
  }

  const currentTableItems = sortedData().slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='container'>
      <div className="items-per-page">
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={Object.keys(filteredData).length}>All</option>
        </select>
      </div>
      <span className="total-items"> Total: {Object.keys(filteredData).length} item</span>

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="search-bar"
      />
      {updateDate && <h2>Güncelleme Tarihi: {updateDate}</h2>}

      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('key')} style={{ cursor: 'pointer' }}>
              Key
              {sortConfig.key === 'key' && (
                sortConfig.direction === 'ascending' ? <FaArrowDown /> : <FaArrowUp />
              )}
            </th>
            {valueHeaders.map((header, index) => (
              <th key={index} onClick={() => handleSort(header)} style={{ cursor: 'pointer' }}>
                {header}
                {sortConfig.key === header && (
                  sortConfig.direction === 'ascending' ? <FaArrowDown /> : <FaArrowUp />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableItems.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td>{item.key}</td>
              {valueHeaders.map((header, colIndex) => (
                <td key={colIndex}>
                  {header === "name" ? item["name"] || '' : item[header] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataFetcher;
