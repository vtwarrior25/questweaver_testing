import React, { useContext, useEffect, useState } from 'react';
import { getCharacterFeatures, getFeatures } from '../lib/getcharacterinfo';
import SequentialCheckboxes from './SequentialCheckboxes';
import { PlayerCharacterContext } from './Contexts';

function FeaturesMenu() {

  const playercharacterid = useContext(PlayerCharacterContext);

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

  //const [features, setFeatures] = useState([]);

  
  const [classfeatures, setClassFeatures] = useState([
    {
      featuretitle: "Rage",
      featuretext: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. ;;While raging, you gain the following benefits if you aren't wearing heavy armor: ;;You have advantage on Strength checks and Strength saving throws. ;;When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. ;;You have resistance to bludgeoning, piercing, and slashing damage. ;;If you are able to cast spells, you can''t cast them or concentrate on them while raging. ;;Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. ;;Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
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
    let tempclassfeatures = [];
    let tempracefeatures = [];
    getCharacterFeatures(playercharacterid)
    .then((result) => {
      for (let feature of result) {
        if (feature.source === "Class") {
          tempclassfeatures = [...tempclassfeatures, feature];
        } else {
          tempracefeatures = [...tempracefeatures, feature];
        }
      }
      setClassFeatures([...tempclassfeatures]);
      setRaceFeatures([...tempracefeatures]);
    }).catch((error) => {
      console.error("Error retrieving character features from server: " + error);
    })
  }, [],
  );
  

  const renderFeature = (feature, newlines) => {
    let featuretexttoprint = [];
    if (newlines == true) {
      featuretexttoprint = feature.featuretext.split(";;");
    } else {
      featuretexttoprint = feature.featuretext.split(";;").join(' ');
    }
    

    if (feature.featuretype === 'Action') {
      
    } else if (feature.featuretype === 'Class Action' || feature.featuretype === 'Ability Action') {
      if (newlines == true) {
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
              <p className="singleFeatureParagraph">{featuretexttoprint}</p>
            <SequentialCheckboxes sequential={false} number={feature.featureinfo.uses}></SequentialCheckboxes>
          </div>
        )
      }
      
    } else {
      if (newlines == true) {
        return (
          <div className="singleFeature">
            <span className="featureTitle">{feature.featuretitle}</span>
            {featuretexttoprint.map((featuretextpart, index) => (
              <p className="singleFeatureParagraph" key={index}>{featuretextpart}</p>
              ))}
          </div>
        )
      } else {
        return (
          <div className="singleFeature">
            <span className="featureTitle">{feature.featuretitle}</span>
              <p className="singleFeatureParagraph">{featuretexttoprint}</p>
          </div>
        )
      }
    }
    
  }

  /*
  return ( 
    <div className="featuresMenu characterInventoryAreaSection">
        <div className="featuresSection">
          {features && features.length > 0 && features.map((sectionfeature, index) => 
            <div key={index} className="featuresSectionFeature">
              {renderFeature(sectionfeature)}
            </div>
          )}
        </div>
    </div>
  );
  */
  
  return ( 
    <div className="featuresMenu characterInventoryAreaSection">
      {classfeatures && classfeatures.length > 0 &&
        <div className="featuresSection">
          <span className='characterSheetSectionTitle'>Class Features</span>
          {classfeatures && classfeatures.length > 0 && classfeatures.map((sectionfeature, index) => 
            <div key={index} className="featuresSectionFeature">
              {renderFeature(sectionfeature, true)}
            </div>
          )}
        </div>
      }
      {racefeatures && racefeatures.length > 0 &&
        <div className="featuresSection">
        <span className='characterSheetSectionTitle'>Race Features</span>
        {racefeatures && racefeatures.length > 0 && racefeatures.map((sectionfeature, index) => 
          <div key={index} className="featuresSectionFeature">
            {renderFeature(sectionfeature, true)}
          </div>
        )}
      </div>
      }
    </div>
  );
  
}

export default FeaturesMenu;