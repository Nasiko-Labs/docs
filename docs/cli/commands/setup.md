---
title: setup
sidebar_position: 3
---

# nasiko setup

Advanced setup namespace for infrastructure provisioning with full control over Terraform backends, artifact storage, and deployment configuration. This group mirrors many `nasiko cluster` operations but adds deeper backend controls.

## `nasiko setup bootstrap`

Full bootstrap command for advanced environments. Extends `nasiko cluster bootstrap` with Terraform backend and artifact storage configuration.

```
Usage: nasiko setup bootstrap [OPTIONS]

Cluster source:
  --kubeconfig TEXT               Path to kubeconfig [env: KUBECONFIG]
  --provider TEXT                 Cloud provider (aws or digitalocean)

Infrastructure:
  -c, --config TEXT               Config file path
  --cluster-name TEXT             Cluster name [default: nasiko-cluster]
  --region TEXT                   Cloud region [env: NASIKO_REGION]
  -t, --terraform-dir TEXT        Terraform directory
  --state-dir TEXT                State directory

Terraform backend:
  --tf-backend TEXT               Backend type: local, s3, gcs, or remote
  --tf-backend-bucket TEXT        S3/GCS bucket name
  --tf-backend-region TEXT        Bucket region
  --tf-backend-key-prefix TEXT    State key prefix
  --tf-backend-dynamodb-table TEXT DynamoDB lock table (AWS)
  --tf-backend-s3-endpoint TEXT   Custom S3 endpoint
  --tf-backend-s3-use-path-style  Use path-style S3 URLs [default: False]
  --tf-cloud-org TEXT             Terraform Cloud organization
  --tf-cloud-workspace TEXT       Terraform Cloud workspace

Artifact storage:
  --artifact-backend TEXT         Backend type: local or s3
  --artifact-bucket TEXT          S3 bucket for artifacts
  --artifact-region TEXT          Artifact bucket region
  --artifact-prefix TEXT          Key prefix for artifacts
  --artifact-s3-endpoint TEXT     Custom S3 endpoint for artifacts
  --artifact-s3-use-path-style    Use path-style S3 URLs [default: False]

Registry:
  --registry-type TEXT            cloud or harbor [default: cloud]
  --domain TEXT                   Harbor domain
  --email TEXT                    Harbor admin email
  --registry-user TEXT            Registry username [default: admin]
  --registry-pass TEXT            Registry password
  --cloud-reg-name TEXT           Cloud registry name

Application:
  --openai-key TEXT               OpenAI API key [env: OPENAI_API_KEY]
  --public-registry-user TEXT     Public registry user [env: NASIKO_PUBLIC_REGISTRY_USER]

Superuser:
  --superuser-username TEXT       Superuser username
  --superuser-email TEXT          Superuser email

Lifecycle:
  --clean-existing / --no-clean-existing
                                  Remove existing resources first [default: clean-existing]
```

:::note
`nasiko setup bootstrap` defaults `--registry-type` to **`cloud`**, while `nasiko cluster bootstrap` defaults to **`harbor`**.
:::

**Example:**

```bash
nasiko setup bootstrap \
  --provider aws \
  --region us-east-1 \
  --registry-type cloud \
  --cloud-reg-name nasiko-images \
  --tf-backend s3 \
  --tf-backend-bucket my-tf-state \
  --tf-backend-region us-east-1
```

---

## `nasiko setup configure-github-oauth`

Patch deployment environment variables to add/update GitHub OAuth credentials.

```
Usage: nasiko setup configure-github-oauth [OPTIONS]

Options:
  -c, --config TEXT        Config file
  --kubeconfig TEXT        Path to kubeconfig [env: KUBECONFIG]
  --namespace TEXT         Kubernetes namespace [default: nasiko]
  --deployment TEXT        Deployment name [default: nasiko-backend]
  --container TEXT         Container name
  --restart / --no-restart Restart deployment after patching [default: restart]
```

---

## `nasiko setup cleanup`

Remove Nasiko-related resources from a Kubernetes cluster.

```
Usage: nasiko setup cleanup [OPTIONS]

Options:
  --kubeconfig TEXT    Path to kubeconfig [required] [env: KUBECONFIG]
  -y, --yes           Skip confirmation [default: False]
```

---

## `nasiko setup init-superuser`

Create or recreate superuser and retrieve access credentials.

```
Usage: nasiko setup init-superuser [OPTIONS]

Options:
  --kubeconfig TEXT              Path to kubeconfig [env: KUBECONFIG]
  -n, --name TEXT                Cluster name
  --superuser-username TEXT      Superuser username
  --superuser-email TEXT         Superuser email
  --provider TEXT                Cloud provider
  --artifact-backend TEXT        Artifact backend: local or s3
  --artifact-bucket TEXT         S3 bucket for artifacts
  --artifact-region TEXT         Artifact bucket region
  --artifact-prefix TEXT         Key prefix for artifacts
  --artifact-s3-endpoint TEXT    Custom S3 endpoint
  --artifact-s3-use-path-style   Use path-style S3 URLs [default: False]
```

---

## `nasiko setup get-superuser`

Fetch existing superuser credentials from cluster secrets.

```
Usage: nasiko setup get-superuser [OPTIONS]

Options:
  --kubeconfig TEXT              Path to kubeconfig [env: KUBECONFIG]
  --provider TEXT                Cloud provider
  --save / --no-save             Save credentials locally [default: save]
  --artifact-backend TEXT        Artifact backend: local or s3
  --artifact-bucket TEXT         S3 bucket
  --artifact-region TEXT         Bucket region
  --artifact-prefix TEXT         Key prefix
  --artifact-s3-endpoint TEXT    Custom S3 endpoint
  --artifact-s3-use-path-style   Use path-style S3 URLs [default: False]
```

---

## Sub-groups

### `nasiko setup k8s`

Kubernetes cluster lifecycle via Terraform.

#### `nasiko setup k8s create`

```
Usage: nasiko setup k8s create [OPTIONS] PROVIDER

Arguments:
  PROVIDER    aws or digitalocean [required]

Options:
  -n, --name TEXT          Cluster name [default: nasiko]
  --region TEXT            Cloud region
  --node-size TEXT         Node instance size
  -y, --yes               Auto-approve [default: False]
  -v, --verbose            Show Terraform output [default: False]
  -t, --terraform-dir TEXT Terraform directory
  -s, --state-dir TEXT     State directory
```

#### `nasiko setup k8s destroy`

```
Usage: nasiko setup k8s destroy [OPTIONS] PROVIDER

Arguments:
  PROVIDER    aws or digitalocean [required]

Options:
  -n, --name TEXT          Cluster name [default: nasiko]
  -y, --yes               Skip confirmation [default: False]
  -v, --verbose            Show Terraform output [default: False]
  --cleanup               Remove local state [default: False]
  -t, --terraform-dir TEXT Terraform directory
  -s, --state-dir TEXT     State directory
```

#### `nasiko setup k8s output`

```
Usage: nasiko setup k8s output [OPTIONS] PROVIDER

Arguments:
  PROVIDER    Cloud provider [required]

Options:
  -n, --name TEXT          Cluster name [default: nasiko]
  -t, --terraform-dir TEXT Terraform directory
  -s, --state-dir TEXT     State directory
```

#### `nasiko setup k8s list`

```
Usage: nasiko setup k8s list [OPTIONS]

Options:
  -s, --state-dir TEXT    State directory
```

#### `nasiko setup k8s state-info`

```
Usage: nasiko setup k8s state-info [OPTIONS] PROVIDER

Arguments:
  PROVIDER    Cloud provider [required]

Options:
  -n, --name TEXT          Cluster name [default: nasiko]
  -s, --state-dir TEXT     State directory
```

#### `nasiko setup k8s init-modules`

```
Usage: nasiko setup k8s init-modules [OPTIONS]

Options:
  -s, --source TEXT    Source path for modules
  -f, --force          Overwrite existing [default: False]
```

---

### `nasiko setup harbor`

#### `nasiko setup harbor deploy`

Deploy Harbor container registry via Helm.

```
Usage: nasiko setup harbor deploy [OPTIONS]

Options:
  --password TEXT     Harbor admin password [required]
  --username TEXT     Admin username [default: admin]
  --domain TEXT       Harbor domain
  --email TEXT        Admin email
```

---

### `nasiko setup cloud-reg`

#### `nasiko setup cloud-reg deploy`

Configure a cloud container registry.

```
Usage: nasiko setup cloud-reg deploy [OPTIONS]

Options:
  --provider TEXT    Cloud provider: aws or digitalocean [required]
  --name TEXT        Registry name [required]
  --region TEXT      Cloud region (required for AWS)
```

---

### `nasiko setup buildkit`

#### `nasiko setup buildkit deploy`

Deploy BuildKit and configure registry credentials.

```
Usage: nasiko setup buildkit deploy [OPTIONS]

Options:
  --registry TEXT      Registry URL [required]
  --username TEXT      Registry username
  --password TEXT      Registry password
  --iam-role-arn TEXT  AWS IAM role ARN for ECR access
```

---

### `nasiko setup core`

#### `nasiko setup core deploy`

Deploy core Nasiko applications.

```
Usage: nasiko setup core deploy [OPTIONS]

Options:
  --registry-url TEXT          Container registry URL [required]
  --registry-user TEXT         Registry username
  --registry-pass TEXT         Registry password
  --public-user TEXT           Public registry user [env: NASIKO_PUBLIC_REGISTRY_USER]
  --openai-key TEXT            OpenAI API key
  --environment TEXT           Environment name [default: default]
  --superuser-username TEXT    Superuser username
  --superuser-email TEXT       Superuser email
  --provider TEXT              Cloud provider
  --region TEXT                Cloud region
```
