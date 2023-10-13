import {DateConverter} from "../utils/DateConverter.jsx";

export const CommentDetail = ({commentDetail}) => {

  return (
    <div className="py-4 border-b-1">
      <div className="text-sm text-gray-500 flex justify-between pb-2">
        <div className="flex items-center">
          <div id="author" className="font-semibold">
            {commentDetail.author}
          </div>
          <div className="w-[1px] h-[16px] bg-gray-400 mx-2"/>
          <div>
            추천 {commentDetail.like_count}
          </div>
        </div>
        <div id="modifiedAt">
          {DateConverter(commentDetail.modified_at)}
          {
            commentDetail.created_at !== commentDetail.modified_at ? (
              <div className="inline-block text-gray-400 ml-1">
                (수정됨)
              </div>
            ) : null
          }
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: commentDetail.contents}}/>
    </div>
  );
}
