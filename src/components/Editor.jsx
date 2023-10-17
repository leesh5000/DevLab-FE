import ReactQuill from "react-quill";
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

const Editor = ({quillInstance}) => {

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
      <ReactQuill ref={quillInstance}
                  modules={modules}
                  theme={"snow"}/>
    </>
  );
}

export default Editor;
