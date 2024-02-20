/*
https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
*/
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function ItemCreationForm() {

  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formdata = new FormData(event.currentTarget);
      const response = await fetch('http://localhost:3000/api/additem?type=weapon', {
        method: 'POST',
        body: formdata,
      });
      if (!response.ok) {
        throw new Error('Failed to submit data.');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
    }
  }


  return ( 
    <div className="itemCreationForm">
      <form class="customItemCreationForm">
        <span>Custom Item Form</span>
        <div>
          <label htmlFor="nameInput">Name</label>
          <input name="nameInput" placeholder="Name"/>
        </div>
        <div class="valueWeightFields">
          <label htmlFor="value">Value</label>
          <input type="number" class="itemNumInput" name="value"/>
          <label htmlFor="weight">Weight</label>
          <input type="number" class="itemNumInput" name="weight"/>
        </div>
        <div class="customItemRarity">
          <label htmlFor="itemRarity">Rarity</label>
          <select name="itemRarity" id="itemRarity">
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="veryrare">Very Rare</option>
          </select>
        </div>
        <div class="customItemDescription">
          <label htmlFor="itemDescription">Description</label>
          <textarea name="itemDescription"></textarea>
        </div>
        <Button type="submit" disabled={isloading}>{isloading ? 'Loading' : 'Create Item'}</Button>
      </form>
    </div>
  );
}

export default ItemCreationForm;