import { cn } from "@/client/utils";
import classes from "./Spinner.module.css";

const Spinner2 = ({ className = "" }) => {
  return <span className={cn(classes.loader, className)} />;
};

export default Spinner2;
