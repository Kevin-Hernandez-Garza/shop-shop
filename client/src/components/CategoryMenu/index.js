import React, { useEffect } from 'react';
import { UPDATE_CURRENT_CATEGORY, UPDATE_CATEGORIES } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

function CategoryMenu() {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  // immediately call for the useStoreContext() hook to retrieve the current state from the global state object and the dispatch() method to update the state
  const [ state, dispatch ] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  // useEffect hook
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if(categoryData) {
    // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to  
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
    }
  }, [categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
