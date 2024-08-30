# Project Setup on AWS Infrastructure

Before starting, ensure the following prerequisites are met:

    Terraform is installed locally.
    Ansible is installed locally.
    AWS CLI is configured with the necessary credentials and permissions.

This project is designed to be deployed on its own infrastructure in AWS. To initiate the setup, follow these steps:

    Run the Setup Script:
    Execute the setup script by running the following command in your terminal:

  	./end.sh

Infrastructure Provisioning with Terraform:
The script will invoke Terraform to automatically provision the necessary AWS infrastructure. Once the infrastructure is set up, Terraform will pass the required values to a Python script.

Environment Configuration with Ansible:
Using the values provided by the Terraform script, Ansible will configure the environment for the containers. After the environment is configured, Ansible will also manage the deployment and running of the containers.