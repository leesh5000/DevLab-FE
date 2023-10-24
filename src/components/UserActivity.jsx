import React, {useEffect} from "react";

export const UserActivity = ({id}) => {

  const [activeTab, setActiveTab] = React.useState('posts');
  const activeTabCss = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const inactiveTabCss = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

  useEffect(() => {

  }, []);

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <button aria-current="page" className={activeTab === 'posts' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("posts")}}>
            내 게시글 25
          </button>
        </li>
        <li className="mr-2">
          <button className={activeTab === 'comments' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("comments")}}>
            내 댓글 113
          </button>
        </li>
        <li className="mr-2">
          <button className={activeTab === 'likedPosts' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("likedPosts")}}>
            추천한 게시글 12
          </button>
        </li>
        <li className="mr-2">
          <button className={activeTab === 'likedComments' ? activeTabCss : inactiveTabCss} onClick={() => {setActiveTab("likedComments")}}>
            추천한 댓글 23
          </button>
        </li>
      </ul>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
          </thead>
          <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">
              Silver
            </td>
            <td className="px-6 py-4">
              Laptop
            </td>
            <td className="px-6 py-4">
              $2999
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">
              White
            </td>
            <td className="px-6 py-4">
              Laptop PC
            </td>
            <td className="px-6 py-4">
              $1999
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">
              Black
            </td>
            <td className="px-6 py-4">
              Accessories
            </td>
            <td className="px-6 py-4">
              $99
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
