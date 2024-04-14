import { useState, useEffect, useRef } from 'react';


const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
//const SVG_PATH = new Path2D(heartSVG);

const SCALE = 0.1;
const OFFSET = 80;
let xoffset = 1110;
let yoffset = 38;
export const canvasWidth = 400;
export const canvasHeight = 800;


export function draw(ctx, coord) {
  console.log(`attempting to draw ${coord.x} ${coord.y} ${coord.tool}`)
  /*
  switch (coord.tool) {
    case "select":
      break;
    case "square":
      break;
    case "circle":
      break;
    case "ellipse":
      break;
    case "text":
      break;
  }
  */
  /*
  ctx.fillStyle = 'red';
  ctx.shadowColor = 'blue';
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(coord.x / SCALE - OFFSET, coord.y / SCALE - OFFSET);
  ctx.rotate(225 * Math.PI / 180);
  ctx.fill(SVG_PATH);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore();
  */
  const size = 100;
  ctx.fillRect(coord.x-xoffset-(size/2), coord.y-yoffset-(size/2), size, size);
  console.log("Things should be drawn");  
}


export function useCanvas() {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState([]);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let rect = canvasObj.getBoundingClientRect();
    console.log(`${rect.top}, ${rect.left}`);
    xoffset = rect.left;
    yoffset = rect.top;
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    console.log(coords.length);
    coords.forEach((coord) => {draw(ctx, coord)});
  }, [coords]);

  return [coords, setCoords, zoom, setZoom, canvasRef, canvasWidth, canvasHeight];
}