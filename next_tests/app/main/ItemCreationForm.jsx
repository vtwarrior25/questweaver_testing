/*
https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
*/
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { createItem } from '@/app/lib/itemcreation';
import { PlayerCharacterContext } from './Contexts';

function ItemCreationForm() {
  const playercharacterid = useContext(PlayerCharacterContext);
  const createItemWithPlayerID = createItem.bind(playercharacterid, null);
/*
  async function onSubmit(data) {
    const connection = {
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      database: process.env.DB,
      user: process.env.DBUSER,
      password: process.env.DBPWD,
    };

    const db = pgp(connection);
    const formdata = Object.fromEntries(data.entries);
    console.log(formdata);
    const itemaddquery = new PQ({
      text:`
        INSERT INTO item (name, value, weight, description, rarity) VALUES
        ($1, $2, $3, $4, (SELECT rarityid FROM rarity WHERE name = $5));
      `
    });
    //db.none(itemaddquery, [formData.])

  }
*/

  return ( 
    <div className="itemCreationForm">
      <form class="customItemCreationForm" action={createItemWithPlayerID}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" placeholder="Name"/>
        </div>
        <div class="valueWeightFields">
          <label htmlFor="value">Value</label>
          <input type="number" class="itemNumInput" name="value"/>
          <label htmlFor="weight">Weight</label>
          <input type="number" class="itemNumInput" name="weight"/>
        </div>
        <div class="customItemRarity">
          <label htmlFor="rarity">Rarity</label>
          <select name="rarity" id="itemRarity">
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Very Rare">Very Rare</option>
            <option value="Legendary">Legendary</option>
            <option value="Artifact">Artifact</option>
          </select>
        </div>
        <div class="customItemDescription">
          <label htmlFor="description">Description</label>
          <textarea name="description"></textarea>
        </div>
        <Button type="submit">{'Create Item'}</Button>
      </form>
    </div>
  );
}

export default ItemCreationForm;