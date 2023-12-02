import { useEffect, useState } from 'react';
import SingleRollResult from './SingleRollResult';
import io from 'socket.io-client';


export default function RollResultsSection (rollresults) {
  /*
  const [rolllist, setRollList] = useState([
    {
      rolls: [ 8 ],
      rollstring: '8+2',
      rolltotal: 10,
      basestring: '1d20+2',
      name: 'Constitution',
      rolltype: 'Ability'
    },
    {
      rolls: [ 8 ],
      rollstring: '8+2',
      rolltotal: 10,
      basestring: '1d20+2',
      name: 'Constitution',
      rolltype: 'Ability'
    }
  ]);
  
  const [beans, setBeans] = useState('Beans brother');
  const socket = io.connect('http://localhost:4000');
  */

  /*useEffect(() => {
    socket.on('rolldiceresult', (data) => {
      
      setRollList(...rolllist, data);
      console.log(`Rolllist:  ${rolllist}`);
      
      setBeans('b');
  })});
  */
//{rolllist.map((roll) => <SingleRollResult name={roll.name} rolltype={roll.rolltype} rollstring={roll.rollstring} basestring={roll.basestring} rolltotal={roll.rolltotal}/>)}

  return (
      <div id="rollContainer">
        <SingleRollResult rollresults={rollresults}></SingleRollResult>
      </div> 
  )
}
