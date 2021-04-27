# Manifest Validation Sensor

This sensor fetches DASH & HLS manifests for channels 1 - 6 every two seconds in order to validate them once per minute using following criteria:
* stalled manifests (if SHA hash of current manifests equals to the previous one)
* short segments (iterates through all segmens in every manifest)

Errors and warnings are reported to the Monitoring API under "UBOC < Manifest Validation". Failed manifests are exported to S3 bucket for further analysis by data team.

## Resources

* Lambda: {STAGED_NAME}-{ENV}-monitoring-scheduler (eg. manifest-monitoring-tst-monitoring-scheduler)
* S3 Bucket: owned by the data team eg. hist-manifests-dev

## Local development

### Setup
1. `npm install`

### Run
1. `npm start`

Once deployed to AWS it can be observed by opening the CloudWatch log stream:
* eg `/aws/lambda/manifest-monitoring-tst-monitoring-scheduler`

## Deployment
CircleCI is configured to watch changes in the git repo: https://app.circleci.com/pipelines/github/optussport/manifest-validation-sensor
* It will run the `dev build` for every commit to a branch other than main or a branch starting with `stg-`
* It will run the `stg build` for every commit to the main branch or a branch starting with `stg-`
* It will run the `prd build` for every commit tagged as `x.x.x`
(for details see the circleci/config.yml)

### Build
1. `npm run build`

### Deploy
1. `npm run deploy`

### Deploy from CLI
If you want to deploy the project from your laptop to tst environment in AWS:
1. `npm run deploy:tst` 