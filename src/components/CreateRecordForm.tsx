import { memo, useEffect } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { SocialIcon, SocialLabel } from "../SocialType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputType } from "./AddRecord";
import { useGetRecords } from "../hooks";
import { FormType } from "./FormLayout.props";

interface Props {
  values: InputType;
  formType: FormType;
  buttonText: string | React.ReactNode;
  onSubmit: (value: InputType) => void;
  onCancel: () => void;
}

const CreateRecordForm = ({
  values,
  buttonText,
  onSubmit,
  onCancel,
  formType,
}: Props) => {
  const { data: Records } = useGetRecords();

  const checkRecordIdExist = (value: any) => {
    const record = Records.find(
      (record: InputType) => record.social_id === value
    );
    return record ? false : true;
  };
  const checkRecordLinkExist = (value: any) => {
    const record = Records.find(
      (record: InputType) => record.social_link === value
    );
    return record ? false : true;
  };

  const validate = (values: any) => {
    let errors: any = {};
    if (!values.type) {
      errors.type = "نوع شبکه اجتماعی الزامی میباشد";
    }
    if (!values.social_link) {
      errors.social_link = "لینک الزامی میباشد";
    } else if (
      formType === "new" &&
      !checkRecordLinkExist(values.social_link)
    ) {
      errors.social_link = "این لینک قبلا ثبت شده است.";
    }

    if (!values.social_id) {
      errors.social_id = "آی دی (ID) الزامی میباشد";
    } else if (formType === "new" && !checkRecordIdExist(values.social_id)) {
      errors.social_id = "این آی دی (ID) قبلا ثبت شده است.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: values,
    validate: validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (values) formik.setValues(values);
  }, [values]);

  const handleOnTypeChange = (event: SelectChangeEvent) => {
    formik.setFieldValue("type", event.target.value as string);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              error={!!formik.touched.type && !!formik.errors.type}
            >
              <InputLabel id="type">نوع</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={formik.values.type}
                label="نوع"
                onChange={handleOnTypeChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                renderValue={(value) => (
                  <>
                    <span style={{ position: "absolute" }}>
                      {SocialIcon(value)}
                    </span>{" "}
                    <span style={{ marginRight: 30 }}>
                      {SocialLabel(value)}
                    </span>
                  </>
                )}
              >
                <MenuItem value="instagram">اینستاگرام</MenuItem>
                <MenuItem value="facebook">فیسبوک</MenuItem>
                <MenuItem value="telegram">تلگرام</MenuItem>
                <MenuItem value="twitter">تویتر</MenuItem>
                <MenuItem value="linkedin">لینکدین</MenuItem>
                <MenuItem value="website">وب سایت</MenuItem>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <FormHelperText>{formik.errors.type}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="social_link"
              name="social_link"
              label="لینک"
              value={formik.values?.social_link}
              onChange={formik.handleChange}
              error={
                formik.touched.social_link && Boolean(formik.errors.social_link)
              }
              helperText={
                formik.touched.social_link && formik.errors.social_link
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="social_id"
              name="social_id"
              label="آی دی (ID)"
              value={formik.values.social_id}
              onChange={formik.handleChange}
              error={
                formik.touched.social_id && Boolean(formik.errors.social_id)
              }
              helperText={formik.touched.social_id && formik.errors.social_id}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item>
            <Button
              variant="outlined"
              fullWidth
              onClick={onCancel}
              color="secondary"
            >
              انصراف
            </Button>
          </Grid>
          <Grid item style={{ textAlign: "left" }}>
            <Button color="primary" variant="contained" type="submit">
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default memo(CreateRecordForm);
