# DevOps Section

The following is how I will approach continuous integration and continuous deployment for this API

## Tool / Platform to use
### Gihtub Action
**Reasons**:
* Ease of configuration and management since both the code and the CI are in one place viz: Github Action.
* Large support community
* Ease of creating custom tooling.

## Pipeline setup
In my Github Action's `YAML` file, I will do the following:

1. Configure the CI environment. I will use an Ubuntu environment.
2. Add a step to checkout the code
3. Add a step to run the tests (If the pipeline fails, the tests are failing)
4. Add the step to build the application as a docker image
5. Push the image to a container registry (ECR or Docker hub)
6. Add a step to deploy the container image to a container orchestration platform (Kubernetes or ECS)
7. Clean up.

## Handling Multiple Repositories
I will advise against using one pipeline for deploying multiple services in different repositories. This is because each service should be administered and managed independent of each other to avoid a single point of failure.

If however, there is an absolute need to use this approach in this pipeline, I will employ the principle of parallelism in running the pipeline. In Github Action, this can be achieved by creating another `job` which by default run in parallel.
If one service depends on the other, Github Action `needs` can be used to realized it.

You can take a look at the Github Action `app-ci-cd.yml` file in the `.github/workflows` folder of this project. It handles CI/CD for this API. Though `Heroku` is used to deploy this API, similar approach can be used for AWS deployment, even when the app is containerized.
