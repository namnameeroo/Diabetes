/* 관리자의 첫화면
 유저 리스트 */

import React from "react";
import { useState, useEffect } from "react";
import "styles/main.css";
import styled from "styled-components";

import Top from "components/top";
// import DB from "db.json";
import axios from "axios";
import Utils from "utils";
import { useNavigate } from "react-router-dom";

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

const ListElement = ({ item }) => {
  // "2022-11-28T08:52:02.912246" 가입일
  const dateArr = item.createdDate.split("T").map(v => {
    return v.split(".")[0];
  });
  const createDate = dateArr[0] ? dateArr[0] : "-";
  const navigate = useNavigate();
  const userClickHandler = userId => {
    console.log(userId);
    navigate("/userlist/" + userId);
  };

  return (
    <>
      {item ? (
        <tr onClick={() => userClickHandler(item.id)}>
          <td className="user-name">{item.name}</td>
          <td className="user-id wide-col">{item.email}</td>
          <td className="gender narrow-col">
            {item.gender ? item.gender.substr(0, 1) : "-"}
          </td>
          <td className="user-date wide-col">{createDate}</td>
          <td className="list-count narrow-col">{item.foodListCount}</td>
        </tr>
      ) : null}
    </>
  );
};
const ListEmpty = () => {
  useEffect(() => {
    // confirm("내역이 없습니다.");
    console.info("User List empty");
  }, []);

  const CSS_center = {
    alignItems: "center",
    textAlign: "center",
    color: "gray"
  };
  return (
    <tr style={CSS_center}>
      <td className="user-name">-</td>
      <td className="user-id wide-col">-</td>
      <td className="gender narrow-col">-</td>
      <td className="user-date wide-col">-</td>
      <td className="list-count narrow-col">-</td>
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
  height: 460px; /** 임시 */
`;

const UserlistPage = () => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(Utils.BASE_URL + `/api/v1/admin/users`, {
            withCredentials: true
          })
          .then(res => {
            setUserlist(res.data.result.content);
            console.log(res.data.result.content);
          });
      } catch (e) {
        console.error(e);
        setUserlist([]);
        // setUserlist(DB.userlist.result.content); // TODO: !!디버깅
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
              {userlist.length != 0 ? (
                userlist.map((i, k) => <ListElement key={k} item={i} />)
              ) : (
                <ListEmpty />
              )}
            </tbody>
          </Table>
        </Wrap>
      </div>
    </>
  );
};
export default UserlistPage;
