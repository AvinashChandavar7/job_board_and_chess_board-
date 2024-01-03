
import { useState, useEffect, useRef } from 'react';
import './ChessBoard.css'
import Tile from './Tile';


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];


const ChessBoard = () => {

  const [pieces, setPieces] = useState([{ image: "assets/bishop_w.png", x: 2, y: 7 }]);

  const chessBoardRef = useRef(null);

  const [bishopPosition, setBishopPosition] = useState({ x: 2, y: 7 });

  let activePiece = null;

  const grabPiece = (e) => {
    const element = e.target;

    if (element.classList.contains("chess_piece")) {

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = "absolute";
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      activePiece = element;
    }
  };


  const movePiece = (e) => {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  };

  const dropPiece = (e) => {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {

      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

      setPieces((value) => {
        const updatedPieces = value.map((p) => ({ ...p }));
        updatedPieces[0].x = x;
        updatedPieces[0].y = y;
        return updatedPieces;
      });
      activePiece = null;
    }
  };


  const isSquareAttackedByBishop = (x, y, bishopX, bishopY) => {
    const dx = Math.abs(x - bishopX);
    const dy = Math.abs(y - bishopY);
    return dx === dy;
  };


  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {

      const number = j + i + 2;

      const tileColor = number % 2 === 0 ? 'black-tile' : 'white-tile';

      let image = undefined;

      pieces.forEach(p => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      })

      const isHighlighted = i === bishopPosition.x && j === bishopPosition.y;
      const isAttackable = isSquareAttackedByBishop(i, j, bishopPosition.x, bishopPosition.y);

      board.push(
        <Tile
          key={`${i}-${j}`}
          tileColor={tileColor}
          image={image}
          isHighlighted={isHighlighted}
          isAttackable={isAttackable}
        />
      );
    }
  }

  useEffect(() => {
    setBishopPosition({ x: pieces[0].x, y: pieces[0].y });
  }, [pieces]);


  return (
    <div className='chess_container'>
      <h1>Chess Board</h1>

      <div id='chess_board'
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessBoardRef}
      >
        {board}
      </div>

    </div>
  )
}

export default ChessBoard