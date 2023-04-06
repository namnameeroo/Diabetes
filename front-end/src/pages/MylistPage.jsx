// 유저의 입력 내역
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Utils from "utils";
import "styles/main.css";
import { useParams } from "react-router-dom";

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

  tr.hover-a:hover {
    color: #26266e;
    background-color: #eac2c244;
    box-shadow: 0px 1.2px 2px 0px #8c8c8c56;
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
  /* eslint-disable */
  const { userId } = useParams();
  const [foodlist, setFoodlist] = useState([]);
  const [foodIndex, setFoodIndex] = useState(0);

  useEffect(() => {
    if (!userId) {
      const getMyFoodData = async () => {
        try {
          await axios
            .get(Utils.BASE_URL + `/api/v1/foods`, { withCredentials: true })
            .then(res => {
              setFoodlist(res.data.result.content);
            });
        } catch (e) {
          console.error(e);
          setFoodlist([]); // test 할 때만 주석처리
        }
      };
      getMyFoodData();
    } else {
      const getUserFoodData = async () => {
        try {
          await axios
            .get(
              Utils.BASE_URL +
                `/api/v1/admin/foods?userId=${userId}&page=0&sort=modifiedDate,asc&sort=provider,asc`,
              { withCredentials: true }
            )
            .then(res => {
              setFoodlist(res.data.result.content);
            });
        } catch (e) {
          console.error(e);
          setFoodlist([]); // test 할 때만 주석처리
        }
      };
      getUserFoodData();
    }
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
          {!userId && <RouteButton goToPage={"/foodForm"} />}
        </Wrap>
      </div>
    </>
  );
};
export default MylistPage;
