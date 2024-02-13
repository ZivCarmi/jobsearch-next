import Section from "@/components/Section";
import Container from "@/components/Container";
import Jobs from "@/features/jobs/Jobs";
import SearchTitle from "@/features/jobs/SearchTitle";
import { getSearchedJobs } from "../api/jobs";
import classes from "./Search.module.css";

const SearchPage = ({ results }) => {
  return (
    <>
      <div className={classes.searchResults}>
        <Container>
          <SearchTitle />
        </Container>
      </div>
      <Section>
        <Container className={classes.container}>
          <Jobs jobs={results} />
        </Container>
      </Section>
    </>
  );
};

export default SearchPage;

export const getServerSideProps = async ({ req, query }) => {
  const response = await getSearchedJobs(req.headers, query).then((res) =>
    JSON.parse(JSON.stringify(res))
  );

  return {
    props: {
      results: response,
    },
  };
};
