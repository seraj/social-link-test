import { memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  padding: 15,
  borderRadius: 5,
  marginTop: 20,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 20,
}));

interface Props {
  children: React.ReactNode;
  title?: string;
}
const StyledPaper = memo<Props>(({ children, title }) => {
  return (
    <Item elevation={2}>
      {title && <Title color="text.primary">{title}</Title>}
      <div>{children}</div>
    </Item>
  );
});

export default StyledPaper;
