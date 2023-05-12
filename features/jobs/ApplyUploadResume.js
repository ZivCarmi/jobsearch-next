import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineCloudUpload } from "react-icons/md";

import classes from "./ApplyUploadResume.module.css";

const ApplyUploadResume = () => {
  return (
    <div className={classes.formBody}>
      <MdOutlineCloudUpload size={150} color="var(--purple)" />
      <h2 className={classes.title}>Add Your Resume</h2>
      <p className={classes.description}>
        Upload your resume in order to apply to jobs
      </p>
      <div className={classes.file}>
        <label>
          <AiOutlineCloudUpload size={25} />
          Upload your resume here
          <input type="file" name="cv" />
        </label>
      </div>
    </div>
  );
};

export default ApplyUploadResume;
