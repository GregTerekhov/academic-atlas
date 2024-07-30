cd terraform_and_ansible || { echo "Failed to change directory to"; exit 1; }

terraform init

terraform plan

terraform apply -auto-approve || { echo "Terraform apply failed"; exit 1; }

terraform output -json > ../terraform_and_ansible/output.json || { echo "Failed to save Terraform outputs"; exit 1; }

chmod +x inventory_create.py

python3 inventory_create.py || { echo "Inventory creation failed"; exit 1; }

chmod 400 ./atlas.pem

ansible-playbook -i inventory.json configure-and-run-docker.yml -vvv || { echo "Ansible playbook execution failed"; exit 1; }
