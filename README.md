# Metrics Collector Service

Metrics Collector Service tracks deployments of sample workloads to IBM Cloud and Watson runtimes based on Cloud Foundry, Kubernetes, OpenWhisk, Data Science Experience and others.

![Flow](images/metrics-service.png)

> To enable tracking for your sample applications, follow [these instructions]()

[**_View a summary of deployments tracked._**](https://trackermetric.mybluemix.net/)

## Cloning

Get the project and change into the project directory:

    $ git clone https://github.com/IBM/metrics-collector-service.git
    $ cd metrics-collector-service

## Configuring Local Development

Local configuration is done through a `.env` file. One environment variable, `VCAP_SERVICES`, is needed in order to configure your local development environment. The value of the `VCAP_SERVICES` is a string representation of a JSON object. Here is an example `.env` file:

    VCAP_SERVICES={"cloudantNoSQLDB": [{"name": "deployment-tracker-db","label": "cloudantNoSQLDB","plan": "Lite","credentials": {"username": "your-username","password": "your-password","host": "your-host","port": 443,"url": "https://your-username:your-password@your-host"}}]}

**Note:**  Services created within Bluemix are automatically added to the `VCAP_SERVICES` environment variable. Therefore, no configuration is needed for Bluemix.

## Installing

Install the project's dependencies:

    $ npm install

## Running

Run the project through [Foreman](https://github.com/ddollar/foreman):

    $ foreman start

## Configuring IBM Bluemix

Complete these steps first if you have not already:

1. [Install the Cloud Foundry command line interface.](https://www.ng.bluemix.net/docs/#starters/install_cli.html)
2. Follow the instructions at the above link to connect to Bluemix.
3. Follow the instructions at the above link to log in to Bluemix.

Create a Cloudant service within Bluemix if one has not already been created:

    $ cf create-service cloudantNoSQLDB Lite deployment-tracker-db

> Use the [Standard plan](https://www.ibm.com/blogs/bluemix/2016/09/new-cloudant-lite-standard-plans-are-live-in-bluemix-public/) for production deployments.

Create a Redis service within Bluemix if one has not already been created:

    $ cf create-service rediscloud 30mb deployment-tracker-redis-redis-cloud

## Deploying

To deploy to Bluemix, simply:

    $ cf push

## Clients

There are a number of language-specific clients for the deployment tracker, including:

- [Node.js](https://github.com/IBM/metrics-collector-client-node)
- [Python](https://github.com/IBM/metrics-collector-client-python)
- [Java](https://github.com/IBM/metrics-collector-client-java)
- [Go](https://github.com/IBM/metrics-collector_client_go)
- [Swift](https://github.com/metrics-collector-client-swift)

### Client testing
Clients can request payload validation by including `"test": true` in the payload. 
> The payload is not persisted.

Success response (HTTP code 200):

```
{ok: true}
```

Failure response (HTTP code 400):

```
{
	ok: false,
	missing: ["missing_property_id", ...]
}
```

## Privacy Notice

This web application includes code to track deployments to [IBM Bluemix](https://www.bluemix.net/) and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM/metrics-collector-service) service on each deployment:

* Application Name (`application_name`)
* Application GUID (`application_id`)
* Application instance index (`instance_index`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service

This data is collected from the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

Disabling the deployment tracker varies based on sample application implementation. Please include specific disabling instructions within your README's Privacy Notice.

### Include This Privacy Notice

When you apply deployment tracking code to an app, you must add the following privacy notice to its README (provided here in markdown format). Note that you must insert specific instructions for your app, telling readers how to disable deployment tracking.

```
## Privacy Notice

This application includes code that tracks deployments to [IBM Bluemix](https://www.bluemix.net/) and other Cloud Foundry platforms. The creator of this app added tracking to count deployments and better serve developers. It records only basic information about the deployment. [See details](https://github.com/IBM-Bluemix/cf-deployment-tracker-service#privacy-notice). If you want to disable deployment tracking, follow these steps:

<INSERT REMOVAL STEPS FOR YOUR APP>

```

## License

Licensed under the [Apache License, Version 2.0](LICENSE.txt).
