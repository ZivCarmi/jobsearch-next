import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import Section from "@/components/Section";
import Container from "../components/Container";
import Search from "../features/jobs/Search";
import classes from "./Home.module.css";

const HomePage = () => {
  return (
    <>
      <Section className={classes.search}>
        <Container className={classes.container} width="1200px">
          <h1>
            Find your <span>next</span> career
          </h1>
          <Search />
        </Container>
      </Section>
      <Section className={classes.careerAdvice}>
        <Container width="1200px">
          <div className={classes.heading}>
            <h2>Great Career Advices</h2>
            <Link href="/career-advice" className={classes.browse}>
              Browse Advices
              <BiRightArrowAlt color="var(--purple)" size="22px" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
