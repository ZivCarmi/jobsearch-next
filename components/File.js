import { IoMdRemoveCircleOutline } from "react-icons/io";

import classes from "./File.module.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const defaultErrorMsg =
  "Unsupported file type. Please upload one of the supported file types.";

const File = ({
  file,
  userResumePath,
  resetFn,
  input,
  label,
  icon,
  error,
  errorMsg = defaultErrorMsg,
}) => {
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (userResumePath) {
      const fullFileName = userResumePath.split("\\").reverse()[0];
      const originalFileNameParts = fullFileName.split("_").slice(1);
      const originalFileName = originalFileNameParts.join("_");

      setFileName(originalFileName);
    } else if (file?.name) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  }, [file?.name, userResumePath]);

  return (
    <div>
      <div className={classes.file}>
        {fileName ? (
          <div className={classes.selection}>
            <div className={classes.selectedFile}>
              {userResumePath ? (
                <a target="_blank" href={userResumePath} title="View file">
                  File: {fileName}
                </a>
              ) : (
                <Spinner text="Uploading..." />
              )}
            </div>
            {resetFn && (
              <button
                type="button"
                className={classes.remove}
                onClick={resetFn}
              >
                <IoMdRemoveCircleOutline color="white" size={25} />
              </button>
            )}
          </div>
        ) : (
          <label className={classes.label}>
            {icon}
            {label}
            <input {...input} type="file" />
          </label>
        )}
      </div>
      {error && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </div>
  );
};

export default File;
