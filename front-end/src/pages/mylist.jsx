// 유저의 입력 내역
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Utils from "utils";
import "styles/main.css";

import Top from "components/top";
import RouteButton from "components/plusButton";

import { useContext } from "react";
import { UserContext } from "components/userContext";

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
  td.idx {
    /* min-width: 10px; */
    width: 15px;
  }
  td.food-name {
    /* min-width: 100px; */
  }
  td.created-date {
    /* min-width: 150px; */
  }
`;

const Wrap = styled.div`
  /* margin-top: 75px; */
  /* padding: 0 10px; */
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--white-color);
  height: 750px; /** 임시 */
`;

/**
 * props = {
 *  id: 1,
 *  name: "foodName",
 *  calories : 540,
 * ...
 */

const Today = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDay = now.getDate();
  return [todayYear, todayMonth, todayDay].join("-");
};

const ListElement = props => {
  const dateArr = props.item.createdDate.split("T").map(v => {
    return v.split(".")[0];
  });

  const createAt = dateArr[0] === Today() ? dateArr[1] : dateArr[0];
  // 오늘 작성한 건은 시간으로 표시

  return (
    <>
      <tr
        className="hover-a"
        onClick={() => {
          window.location = `/foodForm/info/` + props.item.id;
          // Navigate 로 바꿔야 함
        }}
      >
        <td className="idx">{props.order}</td>
        <td className="food-name">{props.item.name}</td>
        <td className="date-col">{createAt}</td>
        <td>{props.item.result}</td>
      </tr>
    </>
  );
};

const MylistPage = () => {
  const { user } = useContext(UserContext); // !important
  console.log("🚀 ~ file: mylist.jsx:119 ~ MylistPage ~ User", user);

  if (!!user && user.auth) {
    console.log(
      "🚀 ~ file: mylist.jsx:128 ~ MylistPage ~ user.role",
      user.role
    );
  } else {
    // 잘못된 접근
    console.error("wrong access");
  }
  /* eslint-disable */
  const [foodlist, setFoodlist] = useState([
    {
      id: 17,
      provider: "마켓오",
      entireWeight: 500,
      calories: 20,
      protein: 5,
      intake: 100,
      gl: 3.02807,
      result: "LOW",
      createdDate: "2023-03-02T06:46:29",
      modifiedDate: "2023-03-02T06:46:29"
    },
    {
      id: 16,
      provider: "비비고",
      entireWeight: 100,
      calories: 100,
      carbohydrate: 10,
      protein: 123,
      fat: 230,
      intake: 10,
      gl: -7.37627,
      result: "LOW",
      createdDate: "2023-03-01T13:46:19",
      modifiedDate: "2023-03-01T13:46:19"
    },
    {
      id: 15,
      name: "프로틴바",
      provider: "마켓오",
      entireWeight: 500,
      calories: 20,
      protein: 5,
      intake: 100,
      gl: 3.02807,
      result: "LOW",
      createdDate: "2023-02-16T05:55:20",
      modifiedDate: "2023-02-16T05:55:20"
    },
    {
      id: 14,
      name: "된장찌개",
      provider: "곱창집",
      entireWeight: 500,
      calories: 200,
      carbohydrate: 10,
      intake: 100,
      gl: 4.85094,
      result: "LOW",
      createdDate: "2023-02-16T04:45:59",
      modifiedDate: "2023-02-16T04:45:59"
    },
    {
      id: 11,
      name: "testinNamiServer",
      provider: "who?",
      entireWeight: 100,
      calories: 540,
      carbohydrate: 10,
      protein: 20,
      fat: 40,
      intake: 50,
      gl: 33,
      result: "MIDDLE",
      createdDate: "2023-02-12T08:08:32",
      modifiedDate: "2023-02-12T08:08:32"
    },
    {
      id: 10,
      name: "케이크",
      provider: "",
      entireWeight: 150,
      calories: 16,
      carbohydrate: 17,
      fat: 188,
      intake: 100,
      gl: -25.5408,
      result: "LOW",
      createdDate: "2022-12-18T10:04:08",
      modifiedDate: "2022-12-18T10:04:08"
    },
    {
      id: 7,
      name: "된장찌개",
      provider: "",
      entireWeight: 500,
      intake: 100,
      gl: 3.2,
      result: "LOW",
      createdDate: "2022-12-15T05:08:08",
      modifiedDate: "2022-12-15T05:08:08"
    },
    {
      id: 6,
      result: "LOW",
      createdDate: "2022-12-15T04:23:56",
      modifiedDate: "2022-12-15T04:23:56"
    },
    {
      id: 5,
      name: "곰국",
      provider: "비비고",
      entireWeight: 100,
      calories: 100,
      carbohydrate: 10,
      protein: 123,
      fat: 230,
      intake: 10,
      gl: -7.37627,
      result: "LOW",
      createdDate: "2022-12-15T03:21:01",
      modifiedDate: "2022-12-15T03:21:01"
    },
    {
      id: 4,
      name: "곰국",
      provider: "비비고",
      entireWeight: 100,
      calories: 100,
      carbohydrate: 10,
      protein: 123,
      fat: 230,
      intake: 10,
      gl: -7.37627,
      result: "LOW",
      createdDate: "2022-12-15T03:20:56",
      modifiedDate: "2022-12-15T03:20:56"
    }
  ]);
  const [foodIndex, setFoodIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(Utils.baseUrl + `/api/v1/foods`, { withCredentials: true })
          .then(res => {
            setFoodlist(res.data.result.content);
          });
      } catch (e) {
        console.error(e);
        // setFoodlist([]); // test 할 때만 주석처리
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Top title="입력 내역" search={true} />
        <Wrap>
          <Table className="mylist-table">
            <thead>
              <tr>
                <th scope="cols">idx</th>
                <th scope="cols">식품명</th>
                <th scope="cols">작성일</th>
                <th scope="cols">GL</th>
              </tr>
            </thead>
            <tbody>
              {foodlist
                ? foodlist.map((i, k) => (
                    <ListElement key={k} item={i} order={k + 1} />
                  ))
                : "입력 내역이 없습니다."}
            </tbody>
          </Table>
          <RouteButton goToPage={"/foodForm"} />
        </Wrap>
      </div>
    </>
  );
};
export default MylistPage;
