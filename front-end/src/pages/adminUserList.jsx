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
  text-align: center;
  line-height: 1.5;

  thead th {
    /* text-align: center; */
    padding: 12px 4px;
    font-weight: bold;
    vertical-align: top;
    color: var(--point-color);
    border-bottom: 1.2px solid var(--sub-color);
  }
  thead th {
    min-width: 30px;
  }

  tbody th {
    /* width: 20px; */
    padding: 7px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #f3f6f7;
  }
  td.user-id {
    min-width: 10px;
  }
  td.wide-col {
    min-width: 80px;
  }
  td.narrow-col {
    width: 13px;
  }

  td {
    /* text-align: center; */
    padding: 10px 4px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
  }
`;

const ListElement = (props) => {
  console.log(props);

  return (
    <tr>
      <td className="user-name">{props.item.name}</td>
      <td className="user-id wide-col">{props.item.id}</td>
      <td className="gender narrow-col">{props.item.gender}</td>
      <td className="user-date wide-col">{props.item.date}</td>
      <td className="list-count narrow-col">{props.item.count}</td>
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
  let userlist = DB.userlist;

  console.log(userlist);
  return (
    <div>
      <Top title="기록 현황" />
      {/* 유저 현황 */}
      <Wrap>
        <Table className="user-table">
          <thead>
            <tr>
              <th scope="cols">이름</th>
              <th scope="cols">아이디</th>
              <th scope="cols">성별</th>
              <th scope="cols">가입일</th>
              <th scope="cols">건수</th>
            </tr>
          </thead>
          <tbody>
            {userlist.map((i, k) => (
              <ListElement key={k} item={i} />
            ))}
          </tbody>
        </Table>
      </Wrap>
    </div>
  );
};
export default UserlistPage;
