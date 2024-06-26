/*
https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations
*/
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { createItem } from '@/app/lib/itemactions';
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
      <form className="customItemCreationForm" action={createItemWithPlayerID}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" placeholder="Name"/>
        </div>
        <div className="valueWeightFields">
          <label htmlFor="value">Value</label>
          <input type="number" className="itemNumInput" name="value"/>
          <select name="currency">
            <option value='cp'>cp</option>
            <option value='sp'>sp</option>
            <option value='ep'>ep</option>
            <option value='gp'>gp</option>
            <option value='pp'>pp</option>
          </select>
          <label htmlFor="weight">Weight</label>
          <input type="number" className="itemNumInput" name="weight"/>
        </div>
        <div className="customItemRarity">
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
        <div className="customItemDescription">
          <label htmlFor="description">Description</label>
          <textarea name="description"></textarea>
        </div>
        <Button type="submit">{'Create Item'}</Button>
      </form>
    </div>
  );
}

export default ItemCreationForm;