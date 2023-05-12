import { useSelector } from "react-redux";

const useUploadFile = (fieldName, file, endpoint) => {
  const token = useSelector((state) => state.auth.token);

  const upload = async () => {
    try {
      const formData = new FormData();

      formData.append(fieldName, file);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  return upload;
};

export default useUploadFile;
