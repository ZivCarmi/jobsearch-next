import Section from "@/components/Section";
import Container from "@/components/Container";
import Jobs from "@/features/jobs/Jobs";
import SearchTitle from "@/features/jobs/SearchTitle";

import classes from "./JobsSearch.module.css";

const SearchPage = () => {
  console.log("in SearchPage");

  return (
    <>
      <div className={classes.searchResults}>
        <Container>
          <SearchTitle />
        </Container>
      </div>
      <Section>
        <Container className={classes.container}>{/*  */}</Container>
      </Section>
    </>
  );
};

export default SearchPage;

const loadSearchedJobs = async (request, params) => {
  console.log("in search loader");

  if (params.jobId) return [];

  const urlParams = new URL(request.url).searchParams;

  const jobParam = urlParams.get("job");
  const whereParam = urlParams.get("where");

  const searchData = {};

  if (jobParam) {
    searchData.job = jobParam;
  }

  if (whereParam) {
    searchData.where = whereParam;
  }

  if (Object.keys(searchData).length === 0) return [];

  searchData.page = urlParams.get("page") || 1;

  try {
    const response = await fetch(
      `http://localhost:5000/jobs/search/?${new URLSearchParams(searchData)}`
    );

    if (!response.ok) {
      return response;
    }

    const results = await response.json();

    return results;
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const loader = async ({ request, params }) => {
  return defer({
    results: loadSearchedJobs(request, params),
  });
};
