import { useState } from "react";
import { Button } from "react-bootstrap";

function SequentialCheckboxes({number, sequential, normal}) {
  const [boxeschecked, setBoxesChecked] = useState(0);
  if (normal === true) {
    return (
      <form className="sequentialCheckboxes">
        {/* For each number,  */}
        {Array.from(Array(number), (checkbox, index) => {
          return <input type="checkbox" value={index} key={index}/>
        })}
        <Button type="reset"></Button>
      </form>
    )
  }
  if (sequential === true) {
    return ( 
      <form className="sequentialCheckboxes">
        {/* For each number,  */}
        {Array.from(Array(number), (checkbox, index) => {
          return <input type="checkbox" value={index} key={index} onChange={() => setBoxesChecked(index + 1)} checked={boxeschecked >= index + 1}/>
        })}
        <Button type="reset"></Button>
      </form>
    );
  } else {
    return (
        <form className="sequentialCheckboxes">
          {/* For each number,  */}
          <Button onClick={() => setBoxesChecked(boxeschecked - 1)}>-</Button>
          {Array.from(Array(number), (checkbox, index) => {
            return <input type="checkbox" value={index} key={index} checked={boxeschecked >= index + 1}/>
          })}
          <Button onClick={() => setBoxesChecked(boxeschecked + 1)}>+</Button>
          <Button type="reset" onClick={() => setBoxesChecked(0)}>Clear</Button>
        </form>
    );
  }
  
}

export default SequentialCheckboxes;