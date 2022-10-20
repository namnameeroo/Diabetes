// 유저의 입력 내역
import React from "react";
// import {useState} from "react";
import "../styles/main.css";
// import {ListWrapper} from '../components/list'

/**
 * props = {id: "001", foodName: "abc", createDate: 0102330}
 *
 */
const ListElement = (props) => {
  console.log(props);
  return (
    <div>
      <ul>{props.item.id}</ul>
      <ul>{props.item.foodName}</ul>
      <ul>{props.item.createDate}</ul>
    </div>
  );
};
const MylistPage = () => {
  // const [foodlist, setFoodlist] = React.useState([
  //   {foodName: "gogi", id: "0", createDate: "2022-10-22"},
  //   {foodName: "gogi1", id: "1", createDate: "2022-10-22"},
  //   {foodName: "gogi2", id: "2", createDate: "2022-10-22"},
  // ]);

  let foodlist = [
    {foodName: "gogi", id: "0", createDate: "2022-10-22"},
    {foodName: "gogi1", id: "1", createDate: "2022-10-22"},
    {foodName: "gogi2", id: "2", createDate: "2022-10-22"},
  ];
  console.log("hi");

  console.log(foodlist);
  return (
    <div>
      <h1>why</h1>
      {foodlist.map((i) => (
        <ListElement key={i.id} item={i} />
      ))}
    </div>
  );
};
export default MylistPage;
