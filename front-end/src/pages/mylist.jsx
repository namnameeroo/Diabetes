// 유저의 입력 내역
import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import Utils from "utils";
import "styles/main.css";
import DB from "db.json";

import Top from "components/top";
import RouteButton from "components/plusButton";

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
  .hover-a:hover {
    color: blue;
  }
  td {
    text-align: center;
    padding: 10px 4px;

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

const Wrap = styled.div`
  margin-top: 75px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--white-color);
  height: 450px; /** 임시 */
`;

/**
 * props = {id: "001", foodName: "abc", createDate: 0102330}
 */
const ListElement = (props) => {
  // console.log(props);
  return (
    <tr>
      <a className="hover-a" href={`/foodForm/` + props.item.id}>
        <td className="id">{props.item.id}</td>
        <td className="food-name">{props.item.foodName}</td>
        <td className="create-date">{props.item.createDate}</td>
      </a>
    </tr>
  );
};

const MylistPage = () => {
  /* eslint-disable */
  const [foodlist, setFoodlist] = useState(DB.foodlist); // foodlist = DB.foodlist; 임시 데이터

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Utils.baseUrl + `/api/v1/foods`, {withCredentials: true}).then((res) => console.log(res));
        setFoodlist(response);
        console.log(foodlist);
      } catch (e) {
        console.error(e);

        // test 할 때만 주석처리
        setFoodlist([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Top title="입력 내역" />
      <Wrap>
        <Table className="mylist-table">
          <thead>
            <tr>
              <th scope="cols">id</th>
              <th scope="cols">이름</th>
              <th scope="cols">작성일</th>
            </tr>
          </thead>
          <tbody>
            {foodlist.map((i, k) => (
              <ListElement key={k} item={i} />
              // 22.11.09 null 검증 필요
            ))}
          </tbody>
        </Table>
        <RouteButton goToPage={"/foodForm"} />
      </Wrap>
    </div>
  );
};
export default MylistPage;
