# llamacpp-react
## How to use
```sh
make setup
make install
make -f execute.mk server
curl --request POST --url http://localhost:8080/completion --header "Content-Type: application/json" --data '{"prompt": "Building a website can be done in 10 simple steps:","n_predict": 128}'
curl --request POST --url http://localhost:8080/completion --header "Content-Type: application/json" --data '{"prompt": "Building a website can be done in 10 simple steps:","n_predict": 128, "stream":true}'
````
