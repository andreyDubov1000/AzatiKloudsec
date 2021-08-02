import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import Loader from "@component/atoms/Loader";
import { IncidentCardProps } from "@component/incidents/IncidentCard";
import IncidentDetails from "@component/incidents/IncidentDetails";
import IncidentList from "@component/incidents/IncidentList";
import { useAppSelector } from "@redux/hooks";
import { uuid } from "@utils";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkAwsScanReqest } from "services/scanService";

const AwsScanResults = () => {
  const [loading, setLoading] = useState(true);
  const [motherList, setMotherList] = useState<IncidentCardProps[]>([]);
  const [incidentList, setIncidentList] = useState<IncidentCardProps[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const { user } = useAppSelector((store) => store.auth);

  const { request_id, account_id } = useParams<any>();

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
        setIncidentList(filteredList);
      } else {
        setIncidentList(motherList);
      }
    }, 20),
    [motherList]
  );

  const sortList = useCallback(
    (sortField: keyof IncidentCardProps, sortOrder?: "asc" | "desc") => {
      const list = incidentList.sort((a: any, b: any) => {
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

      setIncidentList([...list]);
    },
    [incidentList]
  );

  useEffect(() => {
    const userId = user?.user_id;
    let interval: any = null;

    if (userId && account_id && request_id) {
      interval = setInterval(() => {
        checkAwsScanReqest(userId, account_id, request_id).then((data) => {
          if (!data) {
            clearInterval(interval);
            setLoading(false);
            return;
          } else if (data?.Vulnerabilities) {
            const list = data.Vulnerabilities.map((item: any) => ({
              id: uuid(),
              ...item,
            }));
            setMotherList(list);
            setIncidentList(list);
            setLoading(false);
            if (interval) clearInterval(interval);
          }
        });
      }, 5000);
    }
  }, [account_id, request_id, user]);

  return (
    <CustomBox sx={{ p: "1.5rem" }}>
      {loading ? (
        <Loader title="Scanning" />
      ) : (
        <CustomFlexBox>
          <IncidentList
            incidentList={incidentList}
            selectedIncident={selectedIncident}
            setSelectedIncident={setSelectedIncident}
            sortList={sortList}
            handleSearch={handleSearch}
          />
          <IncidentDetails incident={selectedIncident} />
        </CustomFlexBox>
      )}
    </CustomBox>
  );
};

export default AwsScanResults;
