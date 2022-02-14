import { useState, useEffect, useCallback } from "react";

import blank from "../images/blank.png";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";

const width = 8;
const height = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const useGameLogic = () => {
  const [currentColorArr, setColorArr] = useState([]);
  const [pickedCandy, setPick] = useState(null);
  const [droppedCandy, setDrop] = useState(null);

  const checkForFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decide = currentColorArr[i];

      if (colOfFour.every(num => currentColorArr[num] === decide)) {
        colOfFour.forEach(num => (currentColorArr[num] = blank));
      }
    }
  }, [currentColorArr]);

  const checkForThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const colOfThree = [i, i + width, i + width * 2];
      const decide = currentColorArr[i];

      if (colOfThree.every(num => currentColorArr[num] === decide)) {
        colOfThree.forEach(num => (currentColorArr[num] = blank));
      }
    }
  }, [currentColorArr]);

  const checkForRow4 = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      const decide = currentColorArr[i];

      if (rowOfFour.every(num => currentColorArr[num] === decide)) {
        rowOfFour.forEach(num => (currentColorArr[num] = blank));
      }
    }
  }, [currentColorArr]);

  const checkForRow3 = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      const decide = currentColorArr[i];

      if (rowOfThree.every(num => currentColorArr[num] === decide)) {
        rowOfThree.forEach(num => (currentColorArr[num] = blank));
      }
    }
  }, [currentColorArr]);

  // no need to update the state here, because the app component will be re-rendered anyway
  const dropCandies = useCallback(() => {
    for (let i = 0; i < 64 - width; i++) {
      if (i < 8 && currentColorArr[i] === blank) {
        const randomColor = Math.floor(Math.random() * candyColors.length);
        currentColorArr[i] = candyColors[randomColor];
      }

      if (currentColorArr[i + width] === blank) {
        currentColorArr[i + width] = currentColorArr[i];
        currentColorArr[i] = blank;
      }
    }
  }, [currentColorArr]);

  const dragStart = event => {
    setPick(event.target);
  };

  const dragDrop = event => {
    setDrop(event.target);
  };

  const dragEnd = event => {
    const pickId = parseInt(pickedCandy.getAttribute("id"));
    const dropId = parseInt(droppedCandy.getAttribute("id"));

    const validMoves = [pickId - 1, pickId + 1, pickId - width, pickId + width];

    (() => {
      if (!validMoves.includes(dropId)) return;

      if ((pickId + 1) % 8 === 0 && dropId === pickId + 1) return;
      if (pickId % 8 === 0 && dropId === pickId - 1) return;

      currentColorArr[pickId] = droppedCandy.getAttribute("src");
      currentColorArr[dropId] = pickedCandy.getAttribute("src");
    })();
  };

  const createBoard = () => {
    const randColorArr = [];
    for (let i = 0; i < width * height; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randColorArr.push(randomColor);
    }
    setColorArr(randColorArr);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForFour();
      checkForThree();
      checkForRow4();
      checkForRow3();
      dropCandies();

      setColorArr([...currentColorArr]);
    }, 200);
    return () => clearInterval(timer);
  }, [
    checkForFour,
    checkForThree,
    checkForRow4,
    checkForRow3,
    dropCandies,
    currentColorArr,
  ]);

  return [currentColorArr, dragStart, dragDrop, dragEnd];
};

export default useGameLogic;
