import React, { useEffect, useState } from 'react';
import { items } from './items';

const FilterSearch = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [search, setSearch] = useState('');
  const filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

  const handleFilter = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      const updatedFilters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(updatedFilters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      const tempItems = selectedFilters.map((select) => {
        const temp = items.filter((item) => item.category === select);
        return temp;
      });

      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...items]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  return (
    <>
      <div className='inputbox'>
        <input type="search" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className='button-container'>
        {filters.map((category, index) => (
          <button
            key={index}
            className={`button ${
              selectedFilters?.includes(category) ? 'active' : ''
            }`}
            onClick={() => handleFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='item-container'>
        {filteredItems
          .filter((data) =>
            search.toLowerCase() === ''
              ? data
              : data.name.toLowerCase().includes(search)
          )
          .map((item, index) => (
            <div className='item' key={index}>
              <p>{item.name}</p>
              <p className='category'>{item.category}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FilterSearch;
