---
title: cluster
sidebar_position: 2
---

# nasiko cluster

Cluster profile management, remote infrastructure lifecycle, and one-shot cluster bootstrap.

## `nasiko cluster connect`

Register an existing API endpoint as a cluster profile and optionally log in.

```
Usage: nasiko cluster connect [OPTIONS] NAME

Arguments:
  NAME    Cluster profile name [required]

Options:
  -u, --url TEXT     API endpoint URL [required]
  --login / --no-login
                     Attempt login after connecting [default: login]
  -a, --auth TEXT    Login method: key, github, digitalocean [default: key]
```

**Example:**

```bash
nasiko cluster connect prod --url https://my-gateway.example.com --auth key
```

---

## `nasiko cluster create`

Create a cluster profile or provision remote infrastructure. Has three subcommands:

### `nasiko cluster create local`

Create a local Docker-based cluster profile.

```
Usage: nasiko cluster create local [OPTIONS]

Options:
  -n, --name TEXT    Profile name [default: local]
```

### `nasiko cluster create local-k8s`

Placeholder for local Kubernetes cluster creation (not yet implemented).

```
Usage: nasiko cluster create local-k8s [OPTIONS]

Options:
  -n, --name TEXT    Profile name [default: local-k8s]
```

### `nasiko cluster create remote`

Provision a cloud Kubernetes cluster via Terraform.

```
Usage: nasiko cluster create remote [OPTIONS]

Options:
  --provider TEXT          Cloud provider: aws or digitalocean [required]
  -n, --name TEXT          Cluster name [default: nasiko]
  --region TEXT            Cloud region
  --node-size TEXT         Node instance size
  -y, --yes               Auto-approve Terraform plan [default: False]
  -v, --verbose            Show Terraform output [default: False]
  -t, --terraform-dir TEXT Terraform module directory [env: NASIKO_TERRAFORM_DIR]
  --state-dir TEXT         Terraform state directory [env: NASIKO_STATE_DIR]
```

**Example:**

```bash
nasiko cluster create remote --provider digitalocean --name demo --region nyc3 --yes
```

---

## `nasiko cluster destroy`

Destroy remote infrastructure via Terraform.

```
Usage: nasiko cluster destroy [OPTIONS] NAME

Arguments:
  NAME    Cluster name [required]

Options:
  --provider TEXT          Cloud provider [required]
  -y, --yes               Skip confirmation [default: False]
  -v, --verbose            Show Terraform output [default: False]
  --cleanup               Remove local state after destroy [default: False]
  -t, --terraform-dir TEXT Terraform module directory [env: NASIKO_TERRAFORM_DIR]
  -s, --state-dir TEXT     State directory [env: NASIKO_STATE_DIR]
```

**Example:**

```bash
nasiko cluster destroy demo --provider digitalocean --yes --cleanup
```

---

## `nasiko cluster remove`

Remove a local cluster profile without destroying cloud resources.

```
Usage: nasiko cluster remove [OPTIONS] NAME

Arguments:
  NAME    Cluster profile name [required]

Options:
  -y, --yes    Skip confirmation [default: False]
```

**Example:**

```bash
nasiko cluster remove demo --yes
```

---

## `nasiko cluster list`

List all known clusters and mark the active context.

```
Usage: nasiko cluster list
```

---

## `nasiko cluster output`

Print Terraform outputs for a cluster.

```
Usage: nasiko cluster output [OPTIONS]

Options:
  --provider TEXT          Cloud provider [required]
  -n, --name TEXT          Cluster name [default: nasiko]
  -t, --terraform-dir TEXT Terraform module directory
  -s, --state-dir TEXT     State directory
```

---

## `nasiko cluster state-info`

Show Terraform state/backend information for a cluster.

```
Usage: nasiko cluster state-info [OPTIONS]

Options:
  --provider TEXT      Cloud provider [required]
  -n, --name TEXT      Cluster name [default: nasiko]
  -s, --state-dir TEXT State directory
```

---

## `nasiko cluster init-modules`

Copy bundled Terraform modules into local CLI state.

```
Usage: nasiko cluster init-modules [OPTIONS]

Options:
  -s, --source TEXT    Source path for modules
  -f, --force          Overwrite existing modules [default: False]
```

---

## `nasiko cluster bootstrap`

One-shot setup: cluster connection/provisioning, registry setup, BuildKit, core apps, and superuser initialization.

```
Usage: nasiko cluster bootstrap [OPTIONS]

Cluster source:
  --kubeconfig TEXT            Path to kubeconfig [env: KUBECONFIG]
  --provider TEXT              Cloud provider (aws or digitalocean)

Infrastructure:
  -c, --config TEXT            Config file path
  --cluster-name TEXT          Cluster name [env: NASIKO_CLUSTER_NAME]
  --region TEXT                Cloud region [env: NASIKO_REGION]
  --terraform-dir TEXT         Terraform directory
  --state-dir TEXT             State directory

Registry:
  --registry-type TEXT         harbor or cloud [default: harbor]
  --domain TEXT                Harbor domain
  --email TEXT                 Harbor admin email
  --registry-user TEXT         Registry username [default: admin]
  --registry-pass TEXT         Registry password
  --cloud-reg-name TEXT        Cloud registry name

Application:
  --openai-key TEXT            OpenAI API key [env: OPENAI_API_KEY]
  --public-registry-user TEXT  Public registry user [env: NASIKO_PUBLIC_REGISTRY_USER]

Superuser:
  --superuser-username TEXT    Superuser username
  --superuser-email TEXT       Superuser email

Lifecycle:
  --clean-existing / --no-clean-existing
                               Remove existing resources first [default: clean-existing]
```

**Example:**

```bash
nasiko cluster bootstrap \
  --kubeconfig ./kubeconfig.yaml \
  --registry-type harbor \
  --registry-pass '<password>'
```

---

## `nasiko cluster configure-github-oauth`

Patch deployment environment variables to add/update GitHub OAuth credentials.

```
Usage: nasiko cluster configure-github-oauth [OPTIONS]

Options:
  -c, --config TEXT        Config file
  --kubeconfig TEXT        Path to kubeconfig [env: KUBECONFIG]
  --namespace TEXT         Kubernetes namespace [default: nasiko]
  --deployment TEXT        Deployment name [default: nasiko-backend]
  --container TEXT         Container name within the deployment
  --restart / --no-restart Restart deployment after patching [default: restart]
```

---

## `nasiko cluster cleanup`

Remove Nasiko-related resources from an existing Kubernetes cluster.

```
Usage: nasiko cluster cleanup [OPTIONS]

Options:
  --kubeconfig TEXT    Path to kubeconfig [required] [env: KUBECONFIG]
  -y, --yes           Skip confirmation [default: False]
```

---

## `nasiko cluster init-superuser`

Create or recreate superuser and retrieve access credentials.

```
Usage: nasiko cluster init-superuser [OPTIONS]

Options:
  --kubeconfig TEXT            Path to kubeconfig [env: KUBECONFIG]
  --superuser-username TEXT    Superuser username
  --superuser-email TEXT       Superuser email
  --provider TEXT              Cloud provider
```

---

## `nasiko cluster get-superuser`

Fetch existing superuser credentials from cluster secrets.

```
Usage: nasiko cluster get-superuser [OPTIONS]

Options:
  --kubeconfig TEXT        Path to kubeconfig [env: KUBECONFIG]
  --provider TEXT          Cloud provider
  --save / --no-save       Save credentials locally [default: save]
```

---

## `nasiko cluster setup registry harbor`

Deploy Harbor container registry via Helm.

```
Usage: nasiko cluster setup registry harbor [OPTIONS]

Options:
  --password TEXT     Harbor admin password [required]
  --username TEXT     Harbor admin username [default: admin]
  --domain TEXT       Harbor domain
  --email TEXT        Admin email
```

---

## `nasiko cluster setup registry cloud`

Configure a cloud container registry (ECR or DigitalOcean registry).

```
Usage: nasiko cluster setup registry cloud [OPTIONS]

Options:
  --provider TEXT    Cloud provider: aws or digitalocean [required]
  -n, --name TEXT    Registry name [required]
  --region TEXT      Cloud region (required for AWS)
```

---

## `nasiko cluster setup buildkit`

Deploy BuildKit and configure registry credentials or IAM role access.

```
Usage: nasiko cluster setup buildkit [OPTIONS]

Options:
  --registry TEXT      Registry URL [required]
  --username TEXT      Registry username
  --password TEXT      Registry password
  --iam-role-arn TEXT  AWS IAM role ARN for ECR access
```

---

## `nasiko cluster setup core`

Deploy core Nasiko applications and related dependencies.

```
Usage: nasiko cluster setup core [OPTIONS]

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
