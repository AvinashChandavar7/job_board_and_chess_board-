
const Tile = ({ tileColor, image, isHighlighted, isAttackable }) => {

  return (
    <div
      className={`chess_board_tile ${tileColor} ${isHighlighted ? 'highlighted' : ''} ${isAttackable ? 'attackable' : ''}`}
    >
      {image &&
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess_piece"
        ></div>
      }
    </div>
  )
}

export default Tile;