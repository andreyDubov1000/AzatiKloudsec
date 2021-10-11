type Navigation =
  | {
      title: string;
      url: string;
      children?: never;
    }
  | {
      title: string;
      url?: never;
      children: Array<Navigation>;
    };

const docNavigations: Array<Navigation> = [
  {
    title: "Introduction",
    url: "/docs/introduction",
  },
  {
    title: "Cloud Providers",
    children: [
      {
        title: "AWS",
        children: [
          {
            title: "AWS Security Introduction",
            url: "/docs/aws/introduction",
          },
          {
            title: "Identity and Access Management",
            url: "/docs/aws/iam",
          },
          {
            title: "Logging and Monitoring",
            url: "/docs/aws/logging-and-monitoring",
          },
          {
            title: "Data Protection",
            children: [
              {
                title: "Data Protection",
                url: "/docs/aws/data-protection",
              },
              {
                title: "Unencrypted s3 bucket",
                url: "/docs/KS_AWS_S3_00066",
              },
              {
                title: "Access Analyzer has active findings",
                url: "/docs/KS_AWS_ACCESS_ANALYZER_00121",
              },
              {
                title: "ACM Certificate Expired",
                url: "/docs/KS_AWS_ACM_00117",
              },
              {
                title: "ACM Certificate will expire in less than 30 days",
                url: "/docs/KS_AWS_ACM_00118",
              },
              {
                title: "ACM Certificate Wildcard Usage",
                url: "/docs/KS_AWS_ACM_00119",
              },
              {
                title: "Athena workgroup query results are not encrypted",
                url: "/docs/KS_AWS_ATHENA_00107",
              },
              {
                title: "Cloudformation output expose secrets",
                url: "/docs/KS_AWS_CLOUDFORMATION_00092",
              },
              {
                title: "Unencrypted cloudwatch log group",
                url: "/docs/KS_AWS_CLOUDWATCH_00093",
              },
              {
                title: "Amazon Comprehend job output results data are not encrypted",
                url: "/docs/KS_AWS_COMPREHEND_00124",
              },
              {
                title: "Trail not encrypted",
                url: "/docs/KS_AWS_CT_00082",
              },
              {
                title: "DocumentDB Cluster storage is not encrypted",
                url: "/docs/KS_AWS_DOCUMENTDB_00116",
              },
              {
                title: "Dynamodb table is not encrypted",
                url: "/docs/KS_AWS_DYNAMODB_00088",
              },
              {
                title: "Public ami",
                url: "/docs/KS_AWS_EC2_00031",
              },
              {
                title: "Unencrypted ami",
                url: "/docs/KS_AWS_EC2_00032",
              },
              {
                title: "Unencrypted snapshot",
                url: "/docs/KS_AWS_EC2_00033",
              },
              {
                title: "Unencrypted volume",
                url: "/docs/KS_AWS_EC2_00034",
              },
              {
                title: "Volume without backup or recent backup",
                url: "/docs/KS_AWS_EC2_00036",
              },
              {
                title: "EC2 user data contains secrets",
                url: "/docs/KS_AWS_EC2_00041",
              },
              {
                title: "ELB with old TLS version",
                url: "/docs/KS_AWS_EC2_00064",
              },
              {
                title: "ALB with old TLS version",
                url: "/docs/KS_AWS_EC2_00068",
              },
              {
                title: "ALB with non HTTPS listeners",
                url: "/docs/KS_AWS_EC2_00069",
              },
              {
                title: "ECS task definition expose secrets",
                url: "/docs/KS_AWS_ECS_00096",
              },
              {
                title: "ECR repository publicly accessible",
                url: "/docs/KS_AWS_ECR_00097",
              },
              {
                title: "EFS is not encrypted",
                url: "/docs/KS_AWS_EFS_00085",
              },
              {
                title: "EKS Cluster has non encrypted Secrets",
                url: "/docs/KS_AWS_EKS_00098",
              },
              {
                title: "Elasticache Cluster is not encrypting data at rest",
                url: "/docs/KS_AWS_ELASTICACHE_00111",
              },
              {
                title: "Elasticache Cluster is not encrypting data in transit",
                url: "/docs/KS_AWS_ELASTICACHE_00112",
              },
              {
                title: "Elasticsearch publicly accessible",
                url: "/docs/KS_AWS_ES_00074",
              },
              {
                title: "Elasticsearch non encrypted data at rest",
                url: "/docs/KS_AWS_ES_00075",
              },
              {
                title: "Elasticsearch node to node encryption not configured",
                url: "/docs/KS_AWS_ES_00076",
              },
              {
                title: "Elasticsearch HTTPS not configured",
                url: "/docs/KS_AWS_ES_00077",
              },
              {
                title: "Elasticsearch old TLS version",
                url: "/docs/KS_AWS_ES_00078",
              },
              {
                title: "FSX not encrypted using customer managed KEY",
                url: "/docs/KS_AWS_FSX_00108",
              },
              {
                title: "Glue Data Catalog Encryption is Disabled",
                url: "/docs/KS_AWS_GLUE_00104",
              },
              {
                title: "No MFA configured for the root account",
                url: "/docs/KS_AWS_IAM_00070",
              },
              {
                title: "Root user activity detected",
                url: "/docs/KS_AWS_IAM_00091",
              },
              {
                title: "KAFKA cluster not encrypted using customer managed KEY",
                url: "/docs/KS_AWS_KAFKA_00123",
              },
              {
                title: "Kinesis stream is not encrypted",
                url: "/docs/KS_AWS_KINESIS_00087",
              },
              {
                title: "AWS Macie service is disabled",
                url: "/docs/KS_AWS_MACIE_00125",
              },
              {
                title: "AWS Macie service has not acknowledged findings",
                url: "/docs/KS_AWS_MACIE_00126",
              },
              {
                title: "AWS MQ broker is publicly accessible",
                url: "/docs/KS_AWS_MQ_00122",
              },
              {
                title: "Amazon Neptune database instance storage is not encrypted",
                url: "/docs/KS_AWS_NEPTUNE_00128",
              },
              {
                title: "RDS publicly accessible",
                url: "/docs/KS_AWS_RDS_00071",
              },
              {
                title: "Unencrypted RDS database",
                url: "/docs/KS_AWS_RDS_00072",
              },
              {
                title: "RDS Cluster Deletion Protection Disabled",
                url: "/docs/KS_AWS_RDS_00115",
              },
              {
                title: "Redshift cluster Data Encryption is Disabled",
                url: "/docs/KS_AWS_REDSHIFT_00105",
              },
              {
                title: "Redshift cluster publicly accessible",
                url: "/docs/KS_AWS_REDSHIFT_00106",
              },
              {
                title: "Public s3 bucket",
                url: "/docs/KS_AWS_S3_00067",
              },
              {
                title: "Sagemaker notebook publicly accessible",
                url: "/docs/KS_AWS_SAGEMAKER_00102",
              },
              {
                title: "Sagemaker notebook volume is not encrypted",
                url: "/docs/KS_AWS_SAGEMAKER_00103",
              },
              {
                title: "SNS topic not encrypted",
                url: "/docs/KS_AWS_SNS_00086",
              },
              {
                title: "SQS queue not encrypted",
                url: "/docs/KS_AWS_SQS_00083",
              },
              {
                title: "Workspace User Volume not encrypted",
                url: "/docs/KS_AWS_WORKSPACES_00113",
              },
              {
                title: "Workspace Root Volume not encrypted",
                url: "/docs/KS_AWS_WORKSPACES_00114",
              },
            ],
          },
          {
            title: "Network",
            url: "/docs/aws/network",
          },
          {
            title: "Infrastructure",
            url: "/docs/aws/infrastructure",
          },
          {
            title: "General",
            url: "/docs/aws/general",
          },
        ],
      },
      {
        title: "AZURE",
        url: "/docs/azure",
      },
      {
        title: "GOOGLE CLOUD",
        url: "/docs/gcp",
      },
      {
        title: "ALIBABA CLOUD",
        url: "/docs/alibaba",
      },
      {
        title: "IBM CLOUD",
        url: "/docs/ibm",
      },
    ],
  },
];

export default docNavigations;
