import json

with open('output.json') as f:
    outputs = json.load(f)

pem_key_path = outputs['pem_key_path']['value']
public_ip = outputs.get('public_ip', {}).get('value', '')

if not public_ip:
    raise ValueError("Public IP is not available in the output.json file")

inventory = {
    'all': {
        'hosts': {
            'ec2_instance': {
                'ansible_host': public_ip,
                'ansible_user': 'ubuntu',  
                'ansible_ssh_private_key_file': pem_key_path,
                'ansible_become': 'yes',
                'ansible_become_method': 'sudo',
                'ansible_connection': 'ssh',
            }
        }
    }
}

with open('inventory.json', 'w') as f:
    json.dump(inventory, f, indent=2)

print("Inventory file created successfully.")
