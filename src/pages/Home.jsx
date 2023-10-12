import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useNavigate} from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const goPost = () => {
    navigate('/post');
  }

  return (
    <>
      <Header/>
      <Navbar/>
      <SearchBar/>
      <table className="w-[1024px] h-[960px] table-auto">
        <thead>
        <tr className="border-1 border-t-0">
          <th>
            분류
          </th>
          <th>
            제목 & 태그
          </th>
          <th>
            작성자
          </th>
          <th>
            작성일
          </th>
          <th>
            조회
          </th>
          <th>
            추천
          </th>
        </tr>
        </thead>
        <tbody>
        <tr className="border-b-1 align-top">
          <td>질문</td>
          <td>
            <div>
              Java와 JavaScript의 차이는 무엇인가요?
            </div>
            <div className="text-sm">
              <button className="text-xs rounded-lg py-1 px-1.5 mr-2 bg-sky-100 text-sky-600">
                spring
              </button>
              <button className="text-xs rounded-lg py-1 px-1.5 mr-2 bg-sky-100 text-sky-600">
                java
              </button>
              <button className="text-xs rounded-lg py-1 px-1.5 mr-2 bg-sky-100 text-sky-600">
                junit
              </button>
            </div>
          </td>
          <td>leesh5000</td>
          <td>2023.09.06</td>
          <td>12</td>
          <td>14</td>
        </tr>
        </tbody>
      </table>
      <div className="h-24 bg-yellow-200">
        <button onClick={goPost}>
          글 쓰기
        </button>
      </div>
    </>
  );
}

export default Home;
