import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <SearchBar/>
      <table className="w-full table-auto">
        <thead className="text-sm h-8">
        <tr className="border-1">
          <th className="w-1/18 font-normal">
            분류
          </th>
          <th className="font-normal">
            제목 & 태그
          </th>
          <th className="w-1/9 font-normal">
            작성자
          </th>
          <th className="w-1/12 font-normal">
            작성일
          </th>
          <th className="w-1/16 font-normal">
            조회
          </th>
          <th className="w-1/16 font-normal">
            추천
          </th>
        </tr>
        </thead>
        <tbody>
        <tr className="text-center text-sm border-b-1">
          <td>질문</td>
          <td className="text-left text-base h-16 flex flex-col justify-around">
            <div className="">
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
    </>
  );
}

export default Home;
