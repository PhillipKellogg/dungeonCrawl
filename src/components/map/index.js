import React from "react";
import { MAP_WIDTH, MAP_HEIGHT, SPRITE_SIZE } from "../../config/constants";
import "./styles.scss";
import { connect } from "react-redux";

//Depending on the value of the map array in data/maps/array changes the
//css class of the tile.
//The class is located in maps/style.scss
function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "floor__1";
    case 2:
      return "floor__2";
    case 3:
      return "floor__3";
    case 4:
      return "floor__4";
    case 5:
      return "floor__5";
    case 6:
      return "floor__6";
    case 7:
      return "floor__7";
    case 8:
      return "floor__8";
    case 9: //Exit ------------ SPECIAL TILE
      return "floor__9";
    case 10:
      return "floor__water";
    case 11:
      return "floor__lava";
    case 12:
      return "floor__pillar";
    //13-19 no collision
    case 20:
      return "wall__water";
    case 21:
      return "wall__lava";
    case 22:
      return "wall__pillar--1";
    case 23:
      return "wall__pillar--2";
    case 24:
      return "wall__1";
    case 25:
      return "wall__2";
    case 26:
      return "wall__3";
    case 27:
      return "wall__4";
    case 28:
      return "wall__5";
    case 29:
      return "wall__6";
    case 30:
      return "wall__7";
      case 31:
        return "wall__8";
        case 32:
          return "wall__9";
          case 33:
            return "wall__10";
            case 34:
              return "wall__11";
                          case 35:
              return "wall__12";
              case 36:
                return "wall__13";
                case 37:
                  return "wall__14";
                  case 38:
                    return "wall__15";
                    case 39:
                      return "wall__16";
    case 41:
      return "fight__1";
    case 42:
      return "fight__2";

      case 45:
        return "chest__closed";
        case 46:
          return "chest__open";
          case 49:
      return "void";
  }
}

function MapTile(props) {
  //styles the div based on the case statement of getTileSprite!!!!
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
        marginBottom: "-4px"
      }}
    ></div>
  );
}
function MapRow(props) {
  return (
    <div className="row">
      {props.tiles.map(tile => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}
function Map(props) {
  return (
    <div
      style={{
        // marginTop: '4px',

        width: MAP_WIDTH,
        height: MAP_HEIGHT - "4px",
        // backgroundColor: "black",
        border: "4px solid lightblue"
      }}
    >
      {props.tiles.map(row => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    tiles: state.map.tiles
  };
}
export default connect(mapStateToProps)(Map);
