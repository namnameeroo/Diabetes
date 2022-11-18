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
  /* .hover-a:hover {
    color: blue;
  } */
  tr:hover td {
    color: blue;
    background-color: gray;
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
 * props = {
 *  id: 1,
 *  name: "foodName",
 *  calories : 540,
 * ...
 */

const ListElement = (props) => {
  // setFoodIndex(foodIndex + 1);
  console.log(props);
  return (
    <>
      <tr
        className="hover-a"
        onClick={() => {
          window.location = `/foodForm/` + props.item.id;
        }}
      >
        <td className="id">{props.order}</td>
        <td className="food-name">{props.item.name}</td>
        <td className="create-date">{props.item.createDate}</td>
      </tr>
    </>
  );
};

const MylistPage = () => {
  /* eslint-disable */
  const [foodlist, setFoodlist] = useState([]); // foodlist = DB.foodlist; 임시 데이터
  const [foodIndex, setFoodIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(Utils.baseUrl + `/api/v1/foods`, {withCredentials: true}).then((res) => {
          // console.log(res.data.result.content);
          console.log(res);
          setFoodlist(res.data.result.content);
          console.log("foodlist", foodlist);
        });

        // console.log(res.data.result.content);
      } catch (e) {
        console.error(e);
        setFoodlist([]); // test 할 때만 주석처리
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
          <tbody>{foodlist ? foodlist.map((i, k) => <ListElement key={k} item={i} order={foodIndex} />) : "입력 내역이 없습니다."}</tbody>
        </Table>
        <RouteButton goToPage={"/foodForm"} />
      </Wrap>
    </div>
  );
};
export default MylistPage;
