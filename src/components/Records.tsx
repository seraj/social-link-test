import { useState, useEffect, memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "./Paper";
import { SocialIcon, SocialLabel } from "../SocialType";
import { useGetRecords, useRemoveRecord } from "../hooks";

interface Record {
  id: string;
  type?: string;
  social_id: string;
  social_link: string;
}
interface Props {
  onEditClick: (value: string) => void;
}
const Records = memo<Props>(({ onEditClick }) => {
  const [removeInputValue, setRemoveInputValue] = useState<string>("");
  const [disabledRemoveButton, setDisabledRemoveButton] =
    useState<boolean>(true);
  const [desireRecord, setDesireRecord] = useState<Record>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { data } = useGetRecords();
  const { mutate: removeRecord } = useRemoveRecord();
  useEffect(() => {
    setDisabledRemoveButton(removeInputValue !== "تایید");
  }, [removeInputValue]);

  const onRemoveClick = (record: Record) => {
    setDesireRecord(record);
    setIsDialogOpen(true);
  };
  const onDialogRemoveClick = () => {
    if (desireRecord) {
      removeRecord(desireRecord.id);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      {data?.map((record: Record) => (
        <Paper key={record.id}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={8}>
              <Grid container spacing={2}>
                {record.type && (
                  <Grid item xs={4}>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", top: 5 }}>
                        {SocialIcon(record.type)}
                      </span>{" "}
                      <span style={{ marginRight: 30 }}>
                        {SocialLabel(record.type)}
                      </span>
                    </div>
                  </Grid>
                )}
                <Grid item xs={4}>
                  <span>آی دی (ID): {record.social_id}</span>
                </Grid>
                <Grid item xs={4}>
                  <span> لینک: {record.social_link}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={2}
              >
                <Grid item xs={4}>
                  <Button
                    variant="text"
                    onClick={() => onEditClick(record.id)}
                    startIcon={<EditIcon />}
                  >
                    ویرایش
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="text"
                    onClick={() => onRemoveClick(record)}
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    حذف
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>آیا از تصمیم خود مطمین هستید</DialogTitle>
        <DialogContent>
          <DialogContentText>
            برای حذف مسیر ارتباطی {desireRecord?.social_id} لطفا تایید را
            بنویسید
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            placeholder="تایید"
            onChange={(e) => setRemoveInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} variant="text">
            انصراف
          </Button>
          <Button
            onClick={onDialogRemoveClick}
            variant="text"
            color="error"
            disabled={disabledRemoveButton}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default Records;
