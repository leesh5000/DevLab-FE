import client from "../lib/client.jsx";

export const WRITE = "WRITE";

export const write = (data = {}, accessToken) => async (dispatch) => {

  const response = await client.post("/posts", {
    title: data.title,
    contents: data.contents,
    category: data.category,
    tags: data.tags,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  dispatch({
    type: WRITE,
    payload: response.data,
  });
}
