

ticketing
# Prerequisites
Environment:
+minikube,docker,skaffold,nginx,kubectl, rabbitmq



# Using
Step 1
open terminal
- Check skaffold version : skaffold version
- if skaffold okey . run file deploy-local 
    + chmod +x ./deploy-local.sh
    + ./deploy-local.sh
Step2
Open new terminal
- Wait service deploy on local success if unsuccess pls restart step1  . Then run command
    + chmod +x ./script.sh
    +./script.sh
- Check ip ingress and pod is running rbmq
    + set ip ingress on /etc/hosts
    + test it in postman
Step 3
    + run rbmq listen in file /ticketing/tickets/: npm run listen
    + pls check port 5672 !!!!!!(if is in use , pls kill it)
    + in step2 check ip service endpoint ip rbmq
    + set it in
    + ` amqp.connect("amqp://172.17.0.7:5672", async (err, conn) => {
      if (err) {
        throw err;
      }`
    + run command : `kubectl port-forward (pod is run rbmq) 5672:5672 `
    + open postman and test .

THANKS

    




