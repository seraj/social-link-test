import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const BreadCrumb = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      خانه
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
    >
      کاربر
    </Link>,
    <Typography key="3" color="text.primary">
      تنظیمات کاربری
    </Typography>,
  ];

  return (
    <Breadcrumbs separator="●" aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
