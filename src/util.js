import { hsl2rgb } from 'colorutil/src';

const { PI } = Math;

export function createAnnulus(canvas) {
  var { width, height } = canvas;
  var half = width / 2;
  var radius = half - 15;
  var ctx = canvas.getContext('2d');

  var imageData = ctx.getImageData(0, 0, width, height);
  var { data } = imageData;

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var [r, g, b] = hsl2rgb(Math.atan2(j - half, i - half) / (2 * PI), 1, 0.5).map(x =>
        Math.round(x * 255),
      );
      var index = (j * width + i) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 0xff;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(half, half, radius, 0, 2 * PI, false);
  ctx.lineWidth = 30;
  ctx.stroke();
  ctx.restore();
}

export function createTriangle(canvas) {
  var height = Math.round(canvas.height * 3 ** 0.5 / 2);
  var width = Math.round(canvas.height * 3 / 4);

  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(width, height / 2);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fill();

  var imageData = ctx.getImageData(0, 0, width, height);
  var { data } = imageData;

  var [x1, y1] = [0, 0];
  var [x2, y2] = [0, height];
  var [x3, y3] = [width, height / 2];
  var det = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
  function barycentric(x, y) {
    var i1 = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / det;
    var i2 = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / det;
    var i3 = 1 - i1 - i2;
    return [i1, i2, i3];
  }

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      var [i1, i2, i3] = barycentric(i, j);
      var k = Math.floor(255 * (i1 + i2));
      var v = Math.floor(255 * i2);
      var index = (j * width + i) * 4;
      data[index] = v;
      data[index + 1] = v;
      data[index + 2] = v;
      data[index + 3] = k;
    }
  }

  ctx.putImageData(imageData, canvas.height - width, (canvas.height - height) / 2);
}

// move/drag element helper
export function move(e, container, cb) {
  return new Promise(end => {
    cb(e); // trigger it now also
    document.addEventListener(
      'mouseup',
      ev => {
        container.removeEventListener('mousemove', cb);
        end(ev);
      },
      { once: true },
    );
    container.addEventListener('mousemove', cb);
  });
}
