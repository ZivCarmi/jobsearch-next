import { useState } from "react";

const useFile = (allowedExtensions = []) => {
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);

  const changeHandler = (e) => {
    const { files } = e.target;

    if (files.length !== 1) return;

    if (!allowedExtensions) return setFile(files[0]); // accepting without validation

    const fileExtension = files[0].name.split(".").reverse()[0];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      setIsError(true);
      setFile(null);
    } else {
      setIsError(false);
      setFile(files[0]);
    }
  };

  const reset = () => {
    setFile(null);
    setIsError(false);
  };

  return [file, isError, { onChange: changeHandler }, reset];
};

export default useFile;
