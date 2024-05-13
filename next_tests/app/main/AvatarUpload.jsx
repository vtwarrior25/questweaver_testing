// https://www.c-sharpcorner.com/article/how-to-upload-and-download-file-to-api-in-next-js-application/
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Image from 'next/image'
import { updateAvatar, getAvatars, getAvatarInfo, addNewAvatar, updateAvatarScale, toggleDisplayAvatar } from "../lib/mapactions";


function AvatarUpload({type, id, upload}) {
  
  const [newimagename, setNewImageName] = useState("");
  const [shownewimagesection, setShowNewImageSection] = useState(false);
  const [file, setFile] = useState(null);
  
  const [displayavatar, setDisplayAvatar] = useState(true);
  const [selectedimage, setSelectedImage] = useState('bloke.jpg');
  const [avatarlist, setAvatarList] = useState([
    'bloke.jpg',
  ]);

  const [avatarscale, setAvatarScale] = useState(0);

  /*
  const updateAvatarImage = (image) => {
    updateAvatar(type, id, `/avatars/${image}`);
  }
  */

  const retrieveAvatarList = () => {
    getAvatars()
    .then((results) => {
      console.log(results);
      setAvatarList([...results]);
      if (results.length > 0) {
        setSelectedImage(results[0]);
      }
    }).catch((error) => {
      console.error('Error retrieving avatar list: ' + error);
    });
    getAvatarInfo(type, id)
    .then((result) => {
      console.log("Avatar stuff");
      console.log(result);
      setSelectedImage(result.image.replace('/avatars/', ''));
      setAvatarScale(result.scale);
      setDisplayAvatar(result.visible);
    }).catch((error) => {
      console.error("Error retrieving avatar scale: " + error)
    })
  }

  const modifyAvatarScale = (scale) => {
    setAvatarScale(scale);
    /*
    updateAvatarScale(type, id, scale)
    .catch((error) => {
      console.error("Error modifying avatar scale: " + error)
    });
    */
  }
  

  const updateAvatarData = () => {
    console.log("Updating avatar data");
    updateAvatarScale(type, id, avatarscale)
    .catch((error) => {
      console.error("Error modifying avatar scale: " + error)
    });
    updateAvatar(type, id, `/avatars/${selectedimage}`)
    .catch((error) => {
      console.error("Error updating avatar: " + error);
    })
    toggleDisplayAvatar(type, id, displayavatar, selectedimage)
    .catch((error) => {
      console.error("Error updating avatar visibility: " + error);
    });
  }

  useEffect(() => {
    retrieveAvatarList();
  }, [],
  );

  /*
  useEffect(() => {
    toggleDisplayAvatar(type, id, displayavatar, selectedimage);
  }, [type, id, displayavatar, selectedimage]
  );
  */
  

  return (
    <div className="avatarUploadSection">
      <div className="avatarSelectionArea">
        <span>Select Existing</span>
        <select className="avatarSelect" value={selectedimage} onChange={(e) => {setSelectedImage(e.target.value); /*updateAvatarImage(e.target.value);*/}}>
          {avatarlist.map((avatar, index) => 
            <option key={index} value={avatar}>{avatar.split('.')[0]}</option>
          )}
        </select>
        <Image src={`/avatars/${selectedimage}`} height={75} width={75} alt="Currently selected image"></Image>
        <label htmlFor="toggleavatarvisibility">Visible?</label>
        <input name="toggleavatarvisibility" type='checkbox' checked={displayavatar} onChange={(e) => setDisplayAvatar(e.target.checked)}></input>
        <label htmlFor="toggleavatarvisibility">Scale</label>
        <div className="avatarScaleControls">
          <Button onClick={() => modifyAvatarScale(avatarscale - 0.05)}>-</Button>
          <input type="number" step="0.05" value={avatarscale} onChange={(e) => modifyAvatarScale(Number(e.target.value))}></input>
          <Button onClick={() => modifyAvatarScale(avatarscale + 0.05)}>+</Button>
        </div>
        <Button onClick={() => updateAvatarData()}>Update</Button>
        
      </div>
      {upload === true && 
      <form className="avatarUploadForm">
        <Button variant='secondary' onClick={() => setShowNewImageSection(!shownewimagesection)}>New Image</Button>
        {shownewimagesection &&
        <>
          <label htmlFor="imagename">Name:</label>
          <input type='text' name="imagename" onChange={(e) => setNewImageName(e.target.value)}></input>
          <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
          <Button variant='primary' type='button' onClick={() => addNewAvatar(file, newimagename)}>Submit</Button>
        </>  
        }
      </form>
      }
    </div>
  );

}

export default AvatarUpload;