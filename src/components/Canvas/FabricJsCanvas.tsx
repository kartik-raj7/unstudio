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
      console.log("Canvas context disposed");
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
    var pugImg = new Image();
    pugImg.onload = function (img) {
      var pug = new fabric.Image(pugImg, {
        angle: 0,
        width: 300,
        height: 300,
        left: 50,
        top: 70,
      });
      canvas.add(pug);
    };
    pugImg.src = 'http://i.imgur.com/8rmMZI3.jpg';
    // imgElement.onload = (url) => {
    //   var imgInstance = new fabric.FabricImage(imgElement, {
    //     left: 400,
    //     top: 600,
    //     angle: 30,
    //   });
    //   canvas.add(imgInstance);
    // };
    // imgElement.src='http://i.imgur.com/8rmMZI3.jpg';
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
        width="800"
        height="550"
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
