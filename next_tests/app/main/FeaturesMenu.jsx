import React, { useEffect, useState } from 'react';
import { getCharacterFeatures, getFeatures } from '../lib/getcharacterinfo';

function FeaturesMenu() {

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
  ])

  useEffect(() => {
    getCharacterFeatures()
    .then((result) => {

    }).catch((error) => {

    })
  }, [],
  );
  

  const renderFeature = (feature) => {
    if (feature.featuretype === 'Action') {
      
    }
  }

  return ( 
    <div className="featuresMenu characterInventoryAreaSection">
      {featuressections.map((section, index) => 
        <div key={index} className="featuresSection">
          <span className='characterSheetSectionTitle'>{section.sectionname}</span>
          {section.sectionfeatures.map((sectionfeature, index) => 
            <div key={index} className="featuresSectionFeature">
                <b>{sectionfeature.featuretitle}</b>
                <p>{sectionfeature.featuretext}</p>
              {renderFeature(sectionfeature)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeaturesMenu;