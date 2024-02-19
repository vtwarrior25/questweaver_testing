import { Button } from 'react-bootstrap';

function ItemCreationForm() {
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
        <Button type="button">Create Item</Button>
      </form>
    </div>
  );
}

export default ItemCreationForm;