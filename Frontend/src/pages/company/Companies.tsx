import React, { useEffect, useState } from "react";
import "./companies.scss";
import { ICompany } from "../../types/global.types";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { PlusOne, PlusOneOutlined } from "@mui/icons-material";
import CompaniesData from "../../component/company/CompaniesData";

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setLoading(false);
        setCompanies(response.data);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
        console.log(error);
      });
  }, []);
  console.log(companies);

  return (
    <div className="content companies">
      <div className="heading">
        <h1>Company</h1>
        <Button variant="outlined">
          <PlusOneOutlined />
        </Button>
      </div>
      {loading ? (
        <CircularProgress />
      ) : companies.length === 0 ? (
        " No Companies"
      ) : (
        <CompaniesData data={companies} />
      )}
    </div>
  );
};

export default Companies;
