import { memo, useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "./Paper";
import Collapse from "@mui/material/Collapse";
import CreateRecordForm from "./CreateRecordForm";
import { FormType } from "./FormLayout.props";
import { SocialLabel } from "../SocialType";
import {
  useGetSingleRecords,
  useCreateNewRecord,
  useUpdateRecord,
} from "../hooks";

interface Props {
  formType?: FormType;
  clearEditData: () => void;
  recordId: string;
}
export interface InputType {
  social_id: string;
  social_link: string;
  type: string;
}
const AddRecord = ({ formType = "new", clearEditData, recordId }: Props) => {
  const [values, setValues] = useState<InputType>({
    social_id: "",
    social_link: "",
    type: "",
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const containerRef = useRef(null);

  const { data, isSuccess } = useGetSingleRecords(recordId);
  const { mutate: createNewRecord } = useCreateNewRecord();
  const { mutate: updateRecord } = useUpdateRecord();
  useEffect(() => {
    if (isSuccess) {
      setValues(data);
      setCollapsed(true);
    }
  }, [data, isSuccess]);

  const onSubmitClick = (values: InputType) => {
    console.log(values);
    if (formType === "new") {
      createNewRecord(values);
    } else {
      updateRecord({ id: recordId, values });
    }
    clearEditData();
    setCollapsed(false);
    setValues({ social_id: "", social_link: "", type: "" });
  };
  const onCancelClick = () => {
    clearEditData();
    setCollapsed(false);
    setValues({ social_id: "", social_link: "", type: "" });
  };
  return (
    <div ref={containerRef}>
      <Button
        variant="text"
        onClick={() => setCollapsed(!collapsed)}
        startIcon={formType === "new" ? <AddIcon /> : <EditIcon />}
      >
        {formType === "new" ? "افزودن مسیر ارتباطی" : "ویرایش مسیر ارتباطی"}
      </Button>
      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        <Paper
          title={
            formType === "new" ? "افزودن مسیر ارتباطی" : "ویرایش مسیر ارتباطی"
          }
        >
          <CreateRecordForm
            onSubmit={onSubmitClick}
            onCancel={onCancelClick}
            values={values}
            formType={formType}
            buttonText={
              formType === "new" ? (
                "ثبت مسیر ارتباطی"
              ) : (
                <>ویرایش مسیر ارتباطی {SocialLabel(values.type)}</>
              )
            }
          />
        </Paper>
      </Collapse>
    </div>
  );
};

export default memo(AddRecord);
