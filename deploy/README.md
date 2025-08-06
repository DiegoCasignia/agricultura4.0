# Aplica los archivos en orden
kubectl apply -f 00-namespace.yaml
kubectl apply -f 01-postgresql.yaml
kubectl apply -f 02-rabbitmq.yaml
kubectl apply -f 03-ms-central.yaml
kubectl apply -f 04-ms-inventario.yaml
kubectl apply -f 05-ms-facturacion.yaml
kubectl apply -f 06-ingress.yaml

# Verifica el estado
kubectl get all -n conjunta

# Si usas Minikube - En una terminal aparte
minikube tunnel

# Obtén la IP del Ingress
kubectl get ingress -n conjunta
