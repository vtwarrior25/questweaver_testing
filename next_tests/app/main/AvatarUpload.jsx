// https://www.c-sharpcorner.com/article/how-to-upload-and-download-file-to-api-in-next-js-application/
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Image from 'next/image'
import { updateAvatar, getAvatars, addNewAvatar, toggleDisplayAvatar } from "../lib/mapactions";


function AvatarUpload({type, id}) {
  /*
  const [newimagename, setNewImageName] = useState("");
  const [shownewimagesection, setShowNewImageSection] = useState(false);
  const [file, setFile] = useState(null);
  */
  const [displayavatar, setDisplayAvatar] = useState();
  const [selectedimage, setSelectedImage] = useState('bloke.jpg');
  const [avatarlist, setAvatarList] = useState([
    'bloke.jpg',
  ]);

  const updateAvatarImage = () => {
    updateAvatar(type, id, selectedimage);
  }

  const retrieveAvatarList = () => {
    getAvatars()
    .then((results) => {
      console.log(results);
      setAvatarList([...results]);
    }).catch((error) => {
      console.error('Error retrieving avatar list: ' + error);
    })
  }

  useEffect(() => {
    retrieveAvatarList();
  }, [],
  );

  useEffect(() => {
    toggleDisplayAvatar(type, id, displayavatar);
  }, [displayavatar]
  );
  

  return (
    <div className="avatarUploadSection">
      <div className="avatarSelectionArea">
        <span>Select Existing</span>
        <select className="avatarSelect" onChange={(e) => {setSelectedImage(e.target.value); updateAvatarImage();}}>
          {avatarlist.map((avatar, index) => 
            <option key={index} value={avatar}>{avatar.split('.')[0]}</option>
          )}
        </select>
        <Image src={`/avatars/${selectedimage}`} height={75} width={75} alt="Currently selected image"></Image>
        <Button onClick={() => updateAvatarImage()}>Update</Button>
        <input type='checkbox'></input>
      </div>
      {/*}
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
      */}
    </div>
  );

}

export default AvatarUpload;