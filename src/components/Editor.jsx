import ReactQuill from "react-quill";
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

const Editor = ({onContentHandler}) => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['blockquote', 'code-block'],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
    ],
  }

  return (
    <>
      <ReactQuill modules={modules}
                  theme={"snow"}
                  onChange={onContentHandler}/>
    </>
  );
}

export default Editor;
