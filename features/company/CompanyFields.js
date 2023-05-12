import Grid from "@/components/Grid";
import Input from "@/components/Input";
import Select from "@/components/Select";

const CompanyFields = ({ cName, cSize, country, websiteUrl }) => {
  return (
    <Grid>
      <Input
        label="Company Name"
        error={cName.error}
        input={{
          id: "companyName",
          ...cName.attributes,
        }}
      />
      <Select
        label="Company Size"
        error={cSize.error}
        select={{
          id: "companySize",
          ...cSize.attributes,
        }}
      />
      <Select
        label="Country"
        error={country.error}
        select={{
          id: "country",
          ...country.attributes,
        }}
      />
      <Input
        label="Website"
        error={websiteUrl.error}
        input={{
          id: "websiteUrl",
          placeholder: "https://",
          ...websiteUrl.attributes,
        }}
      />
    </Grid>
  );
};

export default CompanyFields;
