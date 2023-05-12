import { useRouter } from "next/router";
import Link from "next/link";

import Section from "@/components/Section";
import Container from "@/components/Container";

import classes from "./Account.module.css";

const Account = ({ title, tabs, children }) => {
  const router = useRouter();
  const { route } = router.query;

  return (
    <Section>
      <Container width="1200px">
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.tabs}>
          <div className={classes.tabsNav}>
            <nav>
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <Link
                      href={tab.url}
                      className={
                        route
                          ? router.query?.route === tab.slug
                            ? classes.active
                            : ""
                          : router.asPath === tab.url
                          ? classes.active
                          : ""
                      }
                    >
                      {tab.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={classes.tabsContent}>{children}</div>
        </div>
      </Container>
    </Section>
  );
};

export default Account;
