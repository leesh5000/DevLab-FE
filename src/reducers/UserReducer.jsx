import {FETCH_MY_PROFILE} from "../actions/UserActions.jsx";

const initialState = {
  id: "",
  loginId: "",
  nickname: "",
  securityCode: "",
  oauth: {
    type: "",
    id: "",
  },
  introduce: "",
  createdAt: "",
  postCount: 0,
  postLikeCount: 0,
  commentCount: 0,
  commentLikeCount: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MY_PROFILE:
      return {
        id: action.payload.id,
        loginId: action.payload.login_id,
        nickname: action.payload.nickname,
        securityCode: action.payload.security_code,
        oauth: {
          type: action.payload.oauth?.type,
          id: action.payload.oauth?.id,
        },
        introduce: action.payload.introduce,
        createdAt: action.payload.created_at,
        postCount: action.payload.activities.post_count,
        postLikeCount: action.payload.activities.post_like_count,
        commentCount: action.payload.activities.comment_count,
        commentLikeCount: action.payload.activities.comment_like_count,
      };
    default:
      return state;
  }
}
