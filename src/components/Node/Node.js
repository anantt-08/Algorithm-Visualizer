import React from "react";
import "./Node.css";

const a = '';
class Node extends React.Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      isWeighted,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isWeighted
      ? "node-weight"
            : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >{a}
      </div>
    );
  }
}

export default Node;
