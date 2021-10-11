import { lazy } from "react";
import { Redirect } from "react-router-dom";

const docRoutes = [
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
  {
    path: "/docs/aws/introduction",
    component: lazy(() => import("./DocIntroAws")),
  },
  {
    path: "/docs/KS_AWS_S3_00066",
    component: lazy(() => import("./KS_AWS_S3_00066")),
  },
  {
    path: "/docs/KS_AWS_ACCESS_ANALYZER_00121",
    component: lazy(() => import("./KS_AWS_ACCESS_ANALYZER_00121")),
  },
  {
    path: "/docs/KS_AWS_ACM_00117",
    component: lazy(() => import("./KS_AWS_ACM_00117")),
  },
  {
    path: "/docs/KS_AWS_ACM_00118",
    component: lazy(() => import("./KS_AWS_ACM_00118")),
  },
  {
    path: "/docs/KS_AWS_ACM_00119",
    component: lazy(() => import("./KS_AWS_ACM_00119")),
  },
  {
    path: "/docs/KS_AWS_ATHENA_00107",
    component: lazy(() => import("./KS_AWS_ATHENA_00107")),
  },
  {
    path: "/docs/KS_AWS_CLOUDFORMATION_00092",
    component: lazy(() => import("./KS_AWS_CLOUDFORMATION_00092")),
  },
  {
    path: "/docs/KS_AWS_CLOUDWATCH_00093",
    component: lazy(() => import("./KS_AWS_CLOUDWATCH_00093")),
  },
  {
    path: "/docs/KS_AWS_COMPREHEND_00124",
    component: lazy(() => import("./KS_AWS_COMPREHEND_00124")),
  },
  {
    path: "/docs/KS_AWS_CT_00082",
    component: lazy(() => import("./KS_AWS_CT_00082")),
  },
  {
    path: "/docs/KS_AWS_DOCUMENTDB_00116",
    component: lazy(() => import("./KS_AWS_DOCUMENTDB_00116")),
  },
  {
    path: "/docs/KS_AWS_DYNAMODB_00088",
    component: lazy(() => import("./KS_AWS_DYNAMODB_00088")),
  },
  {
    path: "/docs/KS_AWS_EC2_00031",
    component: lazy(() => import("./KS_AWS_EC2_00031")),
  },
  {
    path: "/docs/KS_AWS_EC2_00032",
    component: lazy(() => import("./KS_AWS_EC2_00032")),
  },
  {
    path: "/docs/KS_AWS_EC2_00033",
    component: lazy(() => import("./KS_AWS_EC2_00033")),
  },
  {
    path: "/docs/KS_AWS_EC2_00034",
    component: lazy(() => import("./KS_AWS_EC2_00034")),
  },
  {
    path: "/docs/KS_AWS_EC2_00036",
    component: lazy(() => import("./KS_AWS_EC2_00036")),
  },
  {
    path: "/docs/KS_AWS_EC2_00041",
    component: lazy(() => import("./KS_AWS_EC2_00041")),
  },
  {
    path: "/docs/KS_AWS_EC2_00064",
    component: lazy(() => import("./KS_AWS_EC2_00064")),
  },
  {
    path: "/docs/KS_AWS_EC2_00068",
    component: lazy(() => import("./KS_AWS_EC2_00068")),
  },
  {
    path: "/docs/KS_AWS_EC2_00069",
    component: lazy(() => import("./KS_AWS_EC2_00069")),
  },
  {
    path: "/docs/KS_AWS_ECS_00096",
    component: lazy(() => import("./KS_AWS_ECS_00096")),
  },
  {
    path: "/docs/KS_AWS_ECR_00097",
    component: lazy(() => import("./KS_AWS_ECR_00097")),
  },
  {
    path: "/docs/KS_AWS_EFS_00085",
    component: lazy(() => import("./KS_AWS_EFS_00085")),
  },
  {
    path: "/docs/KS_AWS_EKS_00098",
    component: lazy(() => import("./KS_AWS_EKS_00098")),
  },
  {
    path: "/docs/KS_AWS_ELASTICACHE_00111",
    component: lazy(() => import("./KS_AWS_ELASTICACHE_00111")),
  },
  {
    path: "/docs/KS_AWS_ELASTICACHE_00112",
    component: lazy(() => import("./KS_AWS_ELASTICACHE_00112")),
  },
  {
    path: "/docs/KS_AWS_ES_00074",
    component: lazy(() => import("./KS_AWS_ES_00074")),
  },
  {
    path: "/docs/KS_AWS_ES_00075",
    component: lazy(() => import("./KS_AWS_ES_00075")),
  },
  {
    path: "/docs/KS_AWS_ES_00076",
    component: lazy(() => import("./KS_AWS_ES_00076")),
  },
  {
    path: "/docs/KS_AWS_ES_00077",
    component: lazy(() => import("./KS_AWS_ES_00077")),
  },
  {
    path: "/docs/KS_AWS_ES_00078",
    component: lazy(() => import("./KS_AWS_ES_00078")),
  },
  {
    path: "/docs/KS_AWS_FSX_00108",
    component: lazy(() => import("./KS_AWS_FSX_00108")),
  },
  {
    path: "/docs/KS_AWS_GLUE_00104",
    component: lazy(() => import("./KS_AWS_GLUE_00104")),
  },
  {
    path: "/docs/KS_AWS_IAM_00070",
    component: lazy(() => import("./KS_AWS_IAM_00070")),
  },
  {
    path: "/docs/KS_AWS_IAM_00091",
    component: lazy(() => import("./KS_AWS_IAM_00091")),
  },
  {
    path: "/docs/KS_AWS_KAFKA_00123",
    component: lazy(() => import("./KS_AWS_KAFKA_00123")),
  },
  {
    path: "/docs/KS_AWS_KINESIS_00087",
    component: lazy(() => import("./KS_AWS_KINESIS_00087")),
  },
  {
    path: "/docs/KS_AWS_MACIE_00125",
    component: lazy(() => import("./KS_AWS_MACIE_00125")),
  },
  {
    path: "/docs/KS_AWS_MACIE_00126",
    component: lazy(() => import("./KS_AWS_MACIE_00126")),
  },
  {
    path: "/docs/KS_AWS_MQ_00122",
    component: lazy(() => import("./KS_AWS_MQ_00122")),
  },
  {
    path: "/docs/KS_AWS_NEPTUNE_00128",
    component: lazy(() => import("./KS_AWS_NEPTUNE_00128")),
  },
  {
    path: "/docs/KS_AWS_RDS_00071",
    component: lazy(() => import("./KS_AWS_RDS_00071")),
  },
  {
    path: "/docs/KS_AWS_RDS_00072",
    component: lazy(() => import("./KS_AWS_RDS_00072")),
  },
  {
    path: "/docs/KS_AWS_RDS_00115",
    component: lazy(() => import("./KS_AWS_RDS_00115")),
  },
  {
    path: "/docs/KS_AWS_REDSHIFT_00105",
    component: lazy(() => import("./KS_AWS_REDSHIFT_00105")),
  },
  {
    path: "/docs/KS_AWS_REDSHIFT_00106",
    component: lazy(() => import("./KS_AWS_REDSHIFT_00106")),
  },
  {
    path: "/docs/KS_AWS_S3_00067",
    component: lazy(() => import("./KS_AWS_S3_00067")),
  },
  {
    path: "/docs/KS_AWS_SAGEMAKER_00102",
    component: lazy(() => import("./KS_AWS_SAGEMAKER_00102")),
  },
  {
    path: "/docs/KS_AWS_SAGEMAKER_00103",
    component: lazy(() => import("./KS_AWS_SAGEMAKER_00103")),
  },
  {
    path: "/docs/KS_AWS_SNS_00086",
    component: lazy(() => import("./KS_AWS_SNS_00086")),
  },
  {
    path: "/docs/KS_AWS_SQS_00083",
    component: lazy(() => import("./KS_AWS_SQS_00083")),
  },
  {
    path: "/docs/KS_AWS_WORKSPACES_00113",
    component: lazy(() => import("./KS_AWS_WORKSPACES_00113")),
  },
  {
    path: "/docs/KS_AWS_WORKSPACES_00114",
    component: lazy(() => import("./KS_AWS_WORKSPACES_00114")),
  },
  {
    path: "/docs/KS_AWS_ORGANIZATIONS_00100",
    component: lazy(() => import("./KS_AWS_ORGANIZATIONS_00100")),
  },
  {
    path: "/docs/KS_AWS_EC2_00039",
    component: lazy(() => import("./KS_AWS_EC2_00039")),
  },
  {
    path: "/docs/KS_AWS_ORGANIZATIONS_00099",
    component: lazy(() => import("./KS_AWS_ORGANIZATIONS_00099")),
  },
  {
    path: "/docs/KS_AWS_EC2_00042",
    component: lazy(() => import("./KS_AWS_EC2_00042")),
  },
  {
    path: "/docs",
    component: () => <Redirect to="/docs/introduction" />,
  },
];

export default docRoutes;
