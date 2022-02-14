import useGameLogic from "../hooks/useGameLogic";

const GameBoard = () => {
  const [currentColorArr, dragStart, dragDrop, dragEnd] = useGameLogic();

  return (
    <div className="board">
      {currentColorArr.map((candy, idx) => {
        return (
          <img
            key={idx}
            src={candy}
            alt={candy}
            id={idx}
            draggable={true}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragStart={dragStart}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
