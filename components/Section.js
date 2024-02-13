import { cn } from "@/client/utils";

const Section = ({ children, className = "" }) => {
  return <section className={cn("p-8", className)}>{children}</section>;
};

export default Section;
