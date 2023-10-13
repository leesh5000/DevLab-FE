import ReactQuill from "react-quill";
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

const Editor = ({onContentHandler}) => {

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
      <ReactQuill modules={modules}
                  theme={"snow"}
                  onChange={onContentHandler}/>
    </>
  );
}

export default Editor;
