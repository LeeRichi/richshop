import React, { useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const My3DViewer = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d');

    const app = new Application(canvas);

    app.load('https://prod.spline.design/uWwW9LE7f2aDK3n0/scene.splinecode');
  }, []);

  return (
    <canvas id="canvas3d" style={{ backgroundColor: 'white' }}></canvas>
  );
};

export default My3DViewer;
