import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useForm } from "react-hook-form";

import Flex from "@/components/Flex";
import Grid from "@/components/Grid";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import File from "@/components/File";
import AccountDetailsForm from "../account/AccountDetails";
import TabSection from "../account/TabSection";
import useFile from "@/hooks/useFile";

import classes from "../account/AccountDetails.module.css";

const allowedExtensions = ["pdf", "txt", "doc", "docx", "rtf"];

const AccountDetails = ({ userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resumeFile, resumeIsError, resumeAttributes, resetResumeFile] =
    useFile(allowedExtensions);
  const [userResumePath, setUserResumePath] = useState(
    userData?.resume || null
  );
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("before first check");

    if (!resumeFile) return;

    console.log("before upload");

    const uploadFile = async () => {
      try {
        const formData = new FormData();

        formData.append("resume", resumeFile);

        const response = await fetch("/api/upload/resume", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseJson = await response.json();

        setUserResumePath(responseJson);
      } catch (error) {
        return error;
      }
    };

    uploadFile();
  }, [resumeFile]);

  const resetResumeHandler = () => {
    const confirm = window.confirm(
      "The resume file will be delete permanently, are you sure?"
    );

    if (confirm) {
      resetResumeFile();
      setUserResumePath(null);
      console.log("should delete the file here");
    }
  };

  const saveUserHandler = async (data) => {
    const response = await fetch("/api/seeker", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 422) {
      console.log("Validation errors");
      return;
    }
  };

  return (
    <AccountDetailsForm onSave={handleSubmit(saveUserHandler)}>
      <TabSection title="Personal Information">
        <Grid>
          <Flex className={classes.formSection}>
            <Input
              label="First Name"
              error={errors?.firstName?.message}
              input={{
                id: "firstName",
                ...register("firstName", {
                  required: {
                    value: true,
                    message: "First name is required",
                  },
                  value: userData.firstName,
                }),
              }}
            />
            <Input
              label="Last Name"
              error={errors?.lastName?.message}
              input={{
                id: "lastName",
                ...register("lastName", {
                  required: {
                    value: true,
                    message: "Last name is required",
                  },
                  value: userData.lastName,
                }),
              }}
            />
          </Flex>
        </Grid>
      </TabSection>
      <TabSection title="Job Related">
        <Grid>
          <File
            file={resumeFile}
            userResumePath={userResumePath}
            resetFn={resetResumeHandler}
            error={resumeIsError}
            icon={<AiOutlineCloudUpload size={25} />}
            label="Upload Resume"
            input={{
              id: "resume",
              name: "resume",
              ...resumeAttributes,
            }}
          />
          <Textarea
            label="About"
            textarea={{
              id: "about",
              ...register("about", {
                value: userData?.about,
              }),
            }}
          />
        </Grid>
      </TabSection>
    </AccountDetailsForm>
  );
};

export default AccountDetails;
