import React, { useEffect, useState } from "react";
import "./companies.scss";
import { ICompany } from "../../types/global.types";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { Add, PlusOne, PlusOneOutlined } from "@mui/icons-material";
import CompaniesData from "../../component/company/CompaniesData";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

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
        <Button variant="outlined" onClick={() => redirect("/companies/add")}>
          <Add />
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
