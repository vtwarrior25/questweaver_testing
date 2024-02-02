import React, {useState} from "react";

function ExpandingTableRow (rowdata, expandingdata) {

  const [isexpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isexpanded);
  }

  return (
    <div>
      <tr>
        {rowdata}
      </tr>
      <tr onClick={() => setIsExpanded()}>
        {isexpanded && expandingdata}
      </tr>
    </div>
  )
}

export default ExpandingTableRow;