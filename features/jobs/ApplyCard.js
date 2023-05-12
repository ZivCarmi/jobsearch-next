import ApplyUploadResume from "./ApplyUploadResume";
import ApplyDialog from "./ApplyDialog";

const ApplyCard = ({ canApply }) => {
  return canApply ? <ApplyDialog /> : <ApplyUploadResume />;
};

export default ApplyCard;
