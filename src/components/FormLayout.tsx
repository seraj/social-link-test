import { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BreadCrumb from "./BreadCrumb";
import Typography from "@mui/material/Typography";
import AddRecord from "./AddRecord";
import Records from "./Records";
import { FormType } from "./FormLayout.props";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  padding: 20,
  marginTop: 30,
  borderRadius: 15,
}));

const FormLayout = () => {
  const [formType, setFormType] = useState<FormType>("new");
  const [recordId, setRecordId] = useState<string>("");

  const onEditClick = (id: string) => {
    setRecordId(id);
    setFormType("edit");
  };

  const clearEditData = () => {
    setRecordId("");
    setFormType("new");
  };
  return (
    <div>
      <Typography
        variant="h4"
        color="text.primary"
        style={{ marginBottom: 15 }}
      >
        حساب کاربری
      </Typography>
      <BreadCrumb />
      <Item elevation={24}>
        <Typography color="text.primary">مسیرهای ارتباطی</Typography>
        <AddRecord
          recordId={recordId}
          formType={formType}
          clearEditData={clearEditData}
        />
        <Records onEditClick={onEditClick} />
      </Item>
    </div>
  );
};

export default FormLayout;
