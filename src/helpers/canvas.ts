export function drawImageProp(ctx, img, x, y, w, h, offsetX?, offsetY?) {
  if (arguments.length === 2) {
      x = y = 0
      w = ctx.canvas.width
      h = ctx.canvas.height
  }

  // default offset is center
  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

  // decide which gap to fill    
  if (nw < w) ar = w / nw;                             
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

export function printAtWordWrap(context, text: string, x: number, y: number, lineHeight: number, fitWidth: number){
  fitWidth = fitWidth || 0
  
  if (fitWidth <= 0) return context.fillText( text, x, y )

  let words = text.split(' ')
  let currentLine = 0
  let idx = 1
  while (words.length > 0 && idx <= words.length) {
    let str = words.slice(0,idx).join(' ')
    let w = context.measureText(str).width
      if (w > fitWidth) {
        if (idx === 1) {
          idx = 2
        }
        const length = str.length
        context.fillText(words.slice(0,idx-1).join(' '), x, y + (lineHeight * currentLine))
        currentLine++
        words = words.splice(idx-1)
        idx = 1
      } else {
        idx++
      }
  }
  if (idx > 0) context.fillText( words.join(' '), x, y + (lineHeight*currentLine) )
}
