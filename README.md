

Slack Maintenance using AWS Lambda
===========================

This project will allow you to remove old files from Slack account.
Project will deploy AWS Lambda function and execute it every 10 mins. 
Lambda function will delete an old file from Slack via Slack API

Prerequisites
-----------------

Install [NodeJS](https://nodejs.org/en/download/ )   
NodeJS is required to build 

Install [Serverless](https://serverless.com/framework/docs/getting-started/) framework.  
Serverless Framework is a CLI tool that allows users to build & deploy auto-scaling, pay-per-execution, event-driven functions


Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/awscli-install-windows.html)  
AWS CLI is an open source tool built on top of the AWS SDK for Python (Boto) that provides commands for interacting with AWS services. With minimal configuration, you can start using all of the functionality provided by the AWS Management Console from your favorite terminal program
  


AWS Configure  
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html  
Configure settings that the AWS Command Line Interface uses when interacting with AWS, such as your security credentials and the default region


Create Slack App  
https://api.slack.com/slack-apps  
AWS Lambda code will work on behave of Slack Application


Installation
------------------------ 

1. **Install NodeJS dependencies:**

```bash
npm install
```

2. **Modify serverless.yml file**

Replace 'CHANGE_ME' with Slack Token

3. **Deploy to AWS:**

```bash
sls deploy -v
```


<a name="features"></a>Features
-------------------------------

* Delete old files from Slack account

## <a name="licensing"></a>Licensing

Serverless is licensed under the [MIT License](./LICENSE).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.




