const awsServiceList = [
  {
    label: "ec2",
    value: "ec2",
  },
  {
    label: "elb",
    value: "elb",
  },
  {
    label: "s3",
    value: "s3",
  },
  {
    label: "alb",
    value: "alb",
  },
  {
    label: "iam",
    value: "iam",
  },
  {
    label: "rds",
    value: "rds",
  },
  {
    label: "elasticsearch",
    value: "elasticsearch",
  },
  {
    label: "lambda",
    value: "lambda",
  },
  {
    label: "vpc",
    value: "vpc",
  },
  {
    label: "cloudtrail",
    value: "cloudtrail",
  },
  {
    label: "sqs",
    value: "sqs",
  },
  {
    label: "apigateway",
    value: "apigateway",
  },
  {
    label: "efs",
    value: "efs",
  },
  {
    label: "sns",
    value: "sns",
  },
  {
    label: "kinesis",
    value: "kinesis",
  },
  {
    label: "dynamodb",
    value: "dynamodb",
  },
  {
    label: "inspector",
    value: "inspector",
  },
  {
    label: "route53",
    value: "route53",
  },
  {
    label: "cloudformation",
    value: "cloudformation",
  },
  {
    label: "cloudwatch",
    value: "cloudwatch",
  },
  {
    label: "cloudfront",
    value: "cloudfront",
  },
  {
    label: "kms",
    value: "kms",
  },
  {
    label: "ecs",
    value: "ecs",
  },
  {
    label: "ecr",
    value: "ecr",
  },
  {
    label: "eks",
    value: "eks",
  },
  {
    label: "organizations",
    value: "organizations",
  },
  {
    label: "config",
    value: "config",
  },
  {
    label: "sagemaker",
    value: "sagemaker",
  },
  {
    label: "glue",
    value: "glue",
  },
  {
    label: "redshift",
    value: "redshift",
  },
  {
    label: "athena",
    value: "athena",
  },
  {
    label: "fsx",
    value: "fsx",
  },
  {
    label: "guardduty",
    value: "guardduty",
  },
  {
    label: "waf",
    value: "waf",
  },
  {
    label: "elasticache",
    value: "elasticache",
  },
  {
    label: "workspaces",
    value: "workspaces",
  },
  {
    label: "documentdb",
    value: "documentdb",
  },
  {
    label: "acm",
    value: "acm",
  },
  {
    label: "health",
    value: "health",
  },
  {
    label: "accessanalyzer",
    value: "accessanalyzer",
  },
  {
    label: "mq",
    value: "mq",
  },
  {
    label: "kafka",
    value: "kafka",
  },
  {
    label: "comprehend",
    value: "comprehend",
  },
  {
    label: "macie",
    value: "macie",
  },
  {
    label: "compute-optimizer",
    value: "compute-optimizer",
  },
  {
    label: "neptune",
    value: "neptune",
  },
  {
    label: "network-firewall",
    value: "network-firewall",
  },
  {
    label: "ses",
    value: "ses",
  },
  {
    label: "ssm",
    value: "ssm",
  },
  {
    label: "secretsmanager",
    value: "secretsmanager",
  },
  {
    label: "shield",
    value: "shield",
  },
  {
    label: "storagegateway",
    value: "storagegateway",
  },
  {
    label: "emr",
    value: "emr",
  },
  {
    label: "transfer",
    value: "transfer",
  },
  {
    label: "trusted-advisor",
    value: "trusted-advisor",
  },
  {
    label: "elasticbeanstalk",
    value: "elasticbeanstalk",
  },
  {
    label: "workdocs",
    value: "workdocs",
  },
  {
    label: "xray",
    value: "xray",
  },
];
// [
//   {
//     label: "apiateway",
//     value: "apiateway",
//   },
//   {
//     label: "athena",
//     value: "athena",
//   },
//   {
//     label: "aurora",
//     value: "aurora",
//   },
//   {
//     label: "cloudformation",
//     value: "cloudformation",
//   },
//   {
//     label: "cloudfront",
//     value: "cloudfront",
//   },
//   {
//     label: "cloudtrail",
//     value: "cloudtrail",
//   },
//   {
//     label: "cloudwatch",
//     value: "cloudwatch",
//   },
//   {
//     label: "config",
//     value: "config",
//   },
//   {
//     label: "documentdb",
//     value: "documentdb",
//   },
//   {
//     label: "dynamodb",
//     value: "dynamodb",
//   },
//   {
//     label: "ec2",
//     value: "ec2",
//   },
//   {
//     label: "ecr",
//     value: "ecr",
//   },
//   {
//     label: "ecs",
//     value: "ecs",
//   },
//   {
//     label: "efs",
//     value: "efs",
//   },
//   {
//     label: "eks",
//     value: "eks",
//   },
//   {
//     label: "elasticsearch",
//     value: "elasticsearch",
//   },
//   {
//     label: "elb",
//     value: "elb",
//   },
//   {
//     label: "fsx",
//     value: "fsx",
//   },
//   {
//     label: "glue",
//     value: "glue",
//   },
//   {
//     label: "guardduty",
//     value: "guardduty",
//   },
//   {
//     label: "inspector",
//     value: "inspector",
//   },
//   {
//     label: "iam",
//     value: "iam",
//   },
//   {
//     label: "kinesis",
//     value: "kinesis",
//   },
//   {
//     label: "kms",
//     value: "kms",
//   },
//   {
//     label: "lambda",
//     value: "lambda",
//   },
//   {
//     label: "organizations",
//     value: "organizations",
//   },
//   {
//     label: "rds",
//     value: "rds",
//   },
//   {
//     label: "redshift",
//     value: "redshift",
//   },
//   {
//     label: "route53",
//     value: "route53",
//   },
//   {
//     label: "sagemaker",
//     value: "sagemaker",
//   },
//   {
//     label: "securityhub",
//     value: "securityhub",
//   },
//   {
//     label: "servicecatalog",
//     value: "servicecatalog",
//   },
//   {
//     label: "sns",
//     value: "sns",
//   },
//   {
//     label: "sqs",
//     value: "sqs",
//   },
//   {
//     label: "s3",
//     value: "s3",
//   },
//   {
//     label: "vpc",
//     value: "vpc",
//   },
//   {
//     label: "waf",
//     value: "waf",
//   },
// ];

export default awsServiceList;
