import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";

export type SocialTypes =
  | "twitter"
  | "instagram"
  | "telegram"
  | "linkedin"
  | "facebook"
  | "website";

export const SocialIcon = (value: string) => {
  switch (value) {
    case "twitter":
      return <TwitterIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "telegram":
      return <TelegramIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "website":
      return <LanguageIcon />;
    default:
      return "";
  }
};
export const SocialLabel = (value: string) => {
  switch (value) {
    case "twitter":
      return "تویتر";
    case "instagram":
      return "اینستاگرام";
    case "telegram":
      return "تلگرام";
    case "linkedin":
      return "لینکدین";
    case "facebook":
      return "فیسبوک";
    case "website":
      return "وب سایت";
    default:
      return "";
  }
};
