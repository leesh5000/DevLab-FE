import ReactQuill from "react-quill";
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

const Editor = ({contents, onContentsHandler}) => {

  const modules = {
    toolbar: [
      [{size: []}],
      ['bold', 'italic', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'},
        {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image']
    ],
  }

  return (
    <>
      <ReactQuill value={contents || ""}
                  onChange={onContentsHandler}
                  modules={modules}
                  theme={"snow"}/>
    </>
  );
}

export default Editor;
