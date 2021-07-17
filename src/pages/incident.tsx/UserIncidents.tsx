import CustomFlexBox from "@component/atoms/CustomFlexBox";
import Loader from "@component/atoms/Loader";
import PageTitle from "@component/atoms/PageTitle";
import IncidentDetails from "@component/incidents/IncidentDetails";
import IncidentList from "@component/incidents/IncidentList";
import { useAppSelector } from "@redux/hooks";
import { useQuery } from "@utils";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getOverallUserAccountStatus,
  getUserAccountStatus,
} from "services/incidentService";

const UserIncidents = () => {
  const [loading, setLoading] = useState(true);
  const [incidentList, setIncidentList] = useState<any>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const { user } = useAppSelector((store) => store.auth);
  const { search } = useLocation();
  const { slug }: any = useParams();

  const vulnerability = useQuery(search).get("vulnerability");

  console.log({ slug, vulnerability });

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true);

      try {
        if (slug) {
          const data = await getUserAccountStatus(user.user_id, slug);
          console.log(data);

          if (data) {
            setIncidentList(data.Vulnerabilities);
          }
        } else {
          const data = await getOverallUserAccountStatus(user.user_id);
          if (data) {
            console.log(data);

            const { LOW, MEDIUM, HIGH, CRITICAL } =
              data.UserSecurityVulnerabilityStatus;

            setIncidentList([...LOW, ...MEDIUM, ...HIGH, ...CRITICAL]);
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [slug, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return loading ? (
    <Loader />
  ) : (
    <CustomFlexBox>
      <PageTitle title="Current Security Incidents" />
      <IncidentList
        incidentList={incidentList}
        selectedIncident={selectedIncident}
        setSelectedIncident={setSelectedIncident}
      />
      <IncidentDetails incident={selectedIncident} />
    </CustomFlexBox>
  );
};

export default UserIncidents;
