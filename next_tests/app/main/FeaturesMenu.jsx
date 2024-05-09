import React, { useEffect, useState } from 'react';
import { getCharacterFeatures, getFeatures } from '../lib/getcharacterinfo';
import SequentialCheckboxes from './SequentialCheckboxes';

function FeaturesMenu() {

  /*
  const [featuressections, setFeaturesSections] = useState([
    {
      sectionname: "Class Features",
      sectionfeatures: [
        {
          featuretitle: "Rage",
          featuretext: "As a bonus action enter a rage for up to 1 minute (10 rounds). You gain advantage on STR checks and saving throws (not attacks), melee damage with STR weapons, resistance to bludgeoning, piercing, slashing damage. You can't cast or concentrate on spells while raging. \n Your rage ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage as a bonus action.",
        },
        {
          featuretitle: "Unarmored Defense",
          featuretext: "While not wearing armor, your AC equals 10 + DEX modifier + CON modifier + any shield bonus. ",
        },
      ],
    },
    {
      sectionname: "Race Features",
      sectionfeatures: [
        {
          featuretitle: "Darkvision",
          featuretext: "You can see in darkness (shades of gray) up to 60 ft.",
        },
        {
          featuretitle: "Keen Senses",
          featuretext: "You have proficiency in the Perception skill.",
        },
        {
          featuretitle: "Fleet of Foot",
          featuretext: "Your base walking speed increases to 35 feet.",
        },
      ],
    },
  ]);
  */

  const [classfeatures, setClassFeatures] = useState([
    {
      featuretitle: "Rage",
      featuretext: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. ;;While raging, you gain the following benefits if you aren''t wearing heavy armor: ;;You have advantage on Strength checks and Strength saving throws. ;;When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. ;;You have resistance to bludgeoning, piercing, and slashing damage. ;;If you are able to cast spells, you can''t cast them or concentrate on them while raging. ;;Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. ;;Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
    },
    {
      featuretitle: "Unarmored Defense",
      featuretext: "While not wearing armor, your AC equals 10 + DEX modifier + CON modifier + any shield bonus. ",
    },
  ]);

  const [racefeatures, setRaceFeatures] = useState([
    {
      featuretitle: "Darkvision",
      featuretext: "You can see in darkness (shades of gray) up to 60 ft.",
    },
    {
      featuretitle: "Keen Senses",
      featuretext: "You have proficiency in the Perception skill.",
    },
    {
      featuretitle: "Fleet of Foot",
      featuretext: "Your base walking speed increases to 35 feet.",
    },
  ]);

  useEffect(() => {
    /*
    getCharacterFeatures()
    .then((result) => {
      
    }).catch((error) => {

    })
    */
  }, [],
  );
  

  const renderFeature = (feature) => {
    let featuretexttoprint = [];
    let featurewithsubheadings = false;
    if (feature.featuretext.includes("////")) {
      featuretexttoprint = feature.featuretext.split(4).split(";;");
      featurewithsubheadings = true;
    } else {
      featuretexttoprint = feature.featuretext.split(";;");
      featurewithsubheadings = false;
    }

    if (feature.featuretype === 'Action') {
      
    } else if (feature.featuretype === 'Class Action' || feature.featuretype === 'Ability Action') {
      return (
        <div className="singleFeature">
          <span className="featureTitle">{feature.featuretitle}</span>
          {featuretexttoprint.map((featuretextpart, index) => (
            <p key={index}>{featuretextpart}</p>
            ))}
          <SequentialCheckboxes sequential={false} number={feature.featureinfo.uses}></SequentialCheckboxes>
        </div>
      )
    } else {
      return (
        <div className="singleFeature">
          <span className="featureTitle">{feature.featuretitle}</span>
          {featuretexttoprint.map((featuretextpart, index) => (
            <p key={index}>{featuretextpart}</p>
            ))}
        </div>
      )
    }
  }

  return ( 
    <div className="featuresMenu characterInventoryAreaSection">
        <div className="featuresSection">
          <span className='characterSheetSectionTitle'>Class Features</span>
          {classfeatures.map((sectionfeature, index) => 
            <div key={index} className="featuresSectionFeature">
              {renderFeature(sectionfeature)}
            </div>
          )}
        </div>
        <div className="featuresSection">
        <span className='characterSheetSectionTitle'>Race Features</span>
        {racefeatures.map((sectionfeature, index) => 
          <div key={index} className="featuresSectionFeature">
            {renderFeature(sectionfeature)}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturesMenu;