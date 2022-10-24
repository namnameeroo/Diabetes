// 관리자의 첫화면
// 유저 리스트

import React from "react";
// import {useState} from "react";
import "../styles/main.css";
import styled from "styled-components";
import DB from "../db.json";
import Top from "../components/top";

const Table = styled.table`
  border-collapse: collapse;
  text-align: left;
  line-height: 1.5;

  thead th {
    text-align: center;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: var(--point-color);
    border-bottom: 1.2px solid var(--sub-color);
  }

  tbody th {
    /* width: 20px; */
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #f3f6f7;
  }

  td {
    text-align: center;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
  }
  td.id {
    /* min-width: 10px; */
  }
  td.food-name {
    /* min-width: 100px; */
  }
  td.create-date {
    /* min-width: 150px; */
  }
`;

/**
 * props = {id: "001", foodName: "abc", createDate: 0102330}
 *
 */
const ListElement = (props) => {
  console.log(props);

  return (
    <tr>
      <td className="id">{props.item.id}</td>
      <td className="food-name">{props.item.foodName}</td>
      <td className="create-date">{props.item.createDate}</td>
    </tr>
  );
};

const Wrap = styled.div`
  margin-top: 75px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--white-color);
  height: 460px; /**임시 */
`;

const UserlistPage = () => {
  let foodlist = DB.foodlist;

  console.log(foodlist);
  return (
    <div>
      <Top title="입력 내역" />
      <Wrap>
        <Table class="type09">
          <thead>
            <tr>
              <th scope="cols">id</th>
              <th scope="cols">이름</th>
              <th scope="cols">가입일</th>등록건수
              <th scope="cols"></th>
            </tr>
          </thead>
          <tbody>
            {foodlist.map((i, k) => (
              <ListElement key={k} item={i} />
            ))}
          </tbody>
        </Table>
      </Wrap>
    </div>
  );
};
export default UserlistPage;
