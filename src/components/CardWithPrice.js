import React from "react";
import Card from "./card";

export const CardWithPrice = (props) => {
    console.log(props)
    return (
        <div>
            <Card skin={props.item}></Card>
            <div className="text-center text-mainbg bg-pinky rounded-b-lg relative bottom-1 text-xl ">{props.item.price}</div>
        </div>
    );

};
