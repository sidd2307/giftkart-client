import React from "react";
import Carousal from "./Carousal";
import Carousal2 from "./Carousal2";

export default function Card(props) {
  return (
    <div
      style={{
        height: 350,
        width: 300,
        border: "1px solid black",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        cursor: "pointer",
        margin: 10,
      }}
    >
      {/* <img
        style={{
          width: 300,
          height: 150,
          borderRadius: 5,
          objectFit: "contain",
        }}
        src={props.el.img[0]}
      /> */}
      <Carousal2 height={150} images={props.el.img} />

      <div
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 25,
        }}
      >
        {props.el.title}
      </div>

      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: 15,
        }}
      >
        {props.el.desc}
      </div>
    </div>
  );
}
