import Container from "@/components/Container";
import Section from "@/components/Section";
import SingleJob from "@/features/employer/SingleJob";
import SingleJobApp from "@/features/employer/SingleJobApp";
import {
  getEmployerJob,
  getEmployerJobApp,
} from "@/pages/api/employer/[route]/[id]";

const MangePanelSinglePage = ({ route, data }) => {
  return (
    <Section>
      <Container>
        {route === "jobs" && <SingleJob job={data} />}
        {route === "job-applications" && <SingleJobApp jobApp={data} />}
      </Container>
    </Section>
  );
};

export default MangePanelSinglePage;

export const getServerSideProps = async ({ params }) => {
  const { route, id } = params;
  let componentData = "";

  if (route === "jobs") {
    componentData = await getEmployerJob(id);
  } else if (route === "job-applications") {
    componentData = await getEmployerJobApp(id);
  }

  if (!componentData) {
    return {
      redirect: {
        permanent: false,
        destination: `/managepanel/${route}`,
      },
    };
  }

  return {
    props: {
      route,
      data: JSON.parse(JSON.stringify(componentData)),
    },
  };
};
