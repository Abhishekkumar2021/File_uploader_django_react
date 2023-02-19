import axios from 'axios';
import React from 'react';

type CustomFile = {
  id: number;
  file: string;
  created_at: string;
};

function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<CustomFile[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
    }
  };
  // 
  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      axios.post('http://127.0.0.1:8000/api/files/', {
        file,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',  // To send a file
        },
      })
        .then((res) => {
          console.log(res);
          // clear file input
          fetchFiles();
          setFile(null);
          setFileUrl(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async function fetchFiles() {
    const res = await axios.get('http://127.0.0.1:8000/api/files/');
    console.log(res.data)
    setFiles(res.data);
  }


  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="App">
      {/* Accept pdf files */}
      <div className="file-upload">
        <h2>File Upload</h2>
        <form onSubmit={handleFileUpload}>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {/* Preview */}
          <iframe src={fileUrl as string} title="file-preview" />
          <button type="submit">Upload</button>
        </form>
      </div>

      {/* All files */}
      <div className="files">
        <h1>Files</h1>
        <div className="list">
          {files?.map((f) => (             
                <a key={f.id} href={f.file} target="_blank" rel="noreferrer"> {f.file} </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
