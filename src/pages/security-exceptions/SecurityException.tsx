import CustomFlexBox from "@component/atoms/CustomFlexBox";
import Loader from "@component/atoms/Loader";
import PageTitle from "@component/atoms/PageTitle";
import { IncidentCardProps } from "@component/incidents/IncidentCard";
import IncidentDetails from "@component/incidents/IncidentDetails";
import IncidentList from "@component/incidents/IncidentList";
import { useAppSelector } from "@redux/hooks";
import { uuid } from "@utils";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { getAllSecurityExcepions } from "services/securityExceptionService";

const SecurityException = () => {
  const [loading, setLoading] = useState(true);
  const [motherList, setMotherList] = useState<IncidentCardProps[]>([]);
  const [exceptionList, setExceptionList] = useState<IncidentCardProps[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const { user } = useAppSelector((store) => store.auth);

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true);
      let list: IncidentCardProps[] = [];

      try {
        const data = await getAllSecurityExcepions(
          user.user_id,
          "922706684423"
        );

        list = data?.SecurityExceptions || [];

        list = list.map((item) => ({
          id: uuid(),
          ...item,
        }));

        setExceptionList(list);
        setMotherList(list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(async (e: any) => {
      const query = e?.target?.value?.toLowerCase();
      if (!!query) {
        const filteredList = motherList.filter(
          (item) =>
            item.AccountId?.toLocaleLowerCase()?.match(query) ||
            item.Severity?.toLocaleLowerCase()?.match(query) ||
            item.VulnerabilityId?.toLocaleLowerCase()?.match(query) ||
            item.Category?.toLocaleLowerCase()?.match(query)
        );
        setExceptionList(filteredList);
      } else {
        setExceptionList(motherList);
      }
    }, 20),
    [motherList]
  );

  const sortList = useCallback(
    (sortField: keyof IncidentCardProps, sortOrder?: "asc" | "desc") => {
      const list = exceptionList.sort((a: any, b: any) => {
        if (sortField === "VulnerabilityDate") {
          try {
            if (new Date(a[sortField]) < new Date(b[sortField])) {
              return sortOrder === "asc" ? 1 : -1;
            } else if (new Date(a[sortField]) > new Date(b[sortField])) {
              return sortOrder === "asc" ? -1 : 1;
            } else return 0;
          } catch (error) {
            return 0;
          }
        } else {
          if (a[sortField] < b[sortField]) {
            return sortOrder === "asc" ? 1 : -1;
          } else if (a[sortField] > b[sortField]) {
            return sortOrder === "asc" ? -1 : 1;
          } else return 0;
        }
      });

      setExceptionList([...list]);
    },
    [exceptionList]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return loading ? (
    <Loader />
  ) : (
    <CustomFlexBox>
      <PageTitle title="Current Security Incidents" />
      <IncidentList
        incidentList={exceptionList}
        selectedIncident={selectedIncident}
        setSelectedIncident={setSelectedIncident}
        sortList={sortList}
        handleSearch={handleSearch}
      />
      <IncidentDetails incident={selectedIncident} />
    </CustomFlexBox>
  );
};

export default SecurityException;
