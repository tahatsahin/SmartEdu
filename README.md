Simple web site created using NodeJS.

Used Technologies:
Expressjs: NodeJS Web Application Framework
express-session: Session
express-validator: Express middleware for validator
connect-mongo: Create and Connect MongoDB
bcrypt: Encrypt passwords of users
connect-flash: Flash message
dotenv: Load environment variables from .env file
ejs: Embedded Javascript Template Engine
method-override: Use verbs such as PUT or DELETE where the client doesn't support
Mongoose: MongoDB object modeling tool
nodemailer: Send emails using nodejs
slugify: Create slugs
==============================

To be able to deploy dockerized version of the application follow below. 

go to infra/terraform and run
```bash
terraform plan 
```
```bash
terraform apply
```
terraform will create 2 droplets and a loadbalancer, and will handle networking.

after go to infra/ansible and run
```bash
ansible-playbook -i inventory/production.ini playbooks/site.yml --ask-vault-pass
```
ansible will configure the created droplets according to application needs. it will install docker and deploy both app and mongo using docker.


