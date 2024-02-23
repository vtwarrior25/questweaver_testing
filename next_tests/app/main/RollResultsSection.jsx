import { useEffect, useState } from 'react';
import SingleRollResult from './SingleRollResult';


export default function RollResultsSection (rollresults) {
  
  const [keeprolls] = useState(3);

  const [rollresultslist, setRollResultList] = useState([]);


  useEffect(() => {
    if (rollresults.rollresults) {
      let newrolllist = [...rollresultslist];
      if (newrolllist.length >= keeprolls) {
        newrolllist.shift();
      }
      newrolllist.push(rollresults.rollresults);
      setRollResultList(newrolllist);
      console.log("rollresults");
      console.log(rollresults.rollresults);
      console.log("Roll results list")
      console.log(rollresultslist);
    }
  }, [rollresults]
  ) 
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

const clearRollResults = (nametoremove, initiative) => {
  setRollResultList([]);
}

useEffect(() => {
  console.log("Testing user");
}, [rollresults]
)

  return (
      <div className="rollContainer">
        {rollresultslist.map((rollresult, index) =>
          <SingleRollResult key={index} rollresults={rollresult} last={index === (keeprolls - 1)} clearresults={() => clearRollResults}></SingleRollResult>
        )}
      </div> 
  )
}
