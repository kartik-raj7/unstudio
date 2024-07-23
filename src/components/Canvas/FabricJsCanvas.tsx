"use client";
import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const FabricJSCanvas = ({
  shape,
  shapeOptions,
  imageUrl,
}: {
  shape: any;
  shapeOptions: any;
  imageUrl: any;
}) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const updateCanvasContext = (canvas: any) => {
    if (canvas) {
      canvasRef.current = canvas;

      // Add functionality to delete selected objects
      canvas.on("object:selected", () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          const deleteBtn = document.getElementById("delete-btn");
          if (deleteBtn) {
            deleteBtn.style.display = "block";
            deleteBtn.onclick = () => {
              canvas.remove(activeObject);
              deleteBtn.style.display = "none";
            };
          }
        }
      });

      canvas.on("selection:cleared", () => {
        const deleteBtn = document.getElementById("delete-btn");
        if (deleteBtn) {
          deleteBtn.style.display = "none";
        }
      });
    } else {
    }
  };

  const addShape = (canvas: any, shape: any, options: any) => {
    let shapeObj;
    switch (shape) {
      case "rectangle":
        shapeObj = new fabric.Rect({
          left: options.left || 100,
          top: options.top || 100,
          fill: options.fill || "red",
          width: options.width || 50,
          height: options.height || 50,
        });
        break;
      case "circle":
        shapeObj = new fabric.Circle({
          left: options.left || 200,
          top: options.top || 200,
          fill: options.fill || "blue",
          radius: options.radius || 40,
        });
        break;
      case "triangle":
        shapeObj = new fabric.Triangle({
          left: options.left || 150,
          top: options.top || 150,
          fill: options.fill || "green",
          width: options.width || 50,
          height: options.height || 50,
        });
        break;
      default:
        break;
    }
    if (shapeObj) {
      canvas.add(shapeObj);
    }
  };

  const addImage = (canvas: any, url: any) => {
    var Img = new Image();
    Img.onload = function () {
      const maxWidth = 200;
      let scaleFactor = 1;
      if (Img.width > maxWidth) {
        scaleFactor = maxWidth / Img.width;
      }
  
      const newimage = new fabric.Image(Img, {
        angle: 0,
        left: 50,
        top: 70,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
      });
      canvas.add(newimage);
    };
    Img.src = url;
  };

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current, options);
    updateCanvasContext(canvas);

    return () => {
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (shape) {
        addShape(canvas, shape, shapeOptions);
      }
      if (imageUrl) {
        addImage(canvas, imageUrl);
      }
    }
  }, [shape, shapeOptions, imageUrl]);

  return (
    <div>
      <canvas
        width={window.innerWidth*0.75}
        height={window.innerHeight*0.80}
        ref={canvasEl}
        style={{ border: "4px solid #e1d2f8" }}
      />
      <button id="delete-btn" style={{ display: "none", marginTop: "10px" }}>
        Delete Selected
      </button>
    </div>
  );
};

export default FabricJSCanvas;


// const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  //   calcWidth: window.innerWidth * 0.75,
  //   calcHeight: window.innerHeight * 0.80,
  // });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //       calcWidth: window.innerWidth * 0.75,
  //       calcHeight: window.innerHeight * 0.80,
  //     });
  //   };

  //   window.addEventListener('resize', handleResize);
    
  //   // Initial calculation
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

