
## NFs (Requisitos funcionais)

[] - Deve ser possível se cadastrar 
[] - Deve ser possível se autenticar 
[] - Deve ser possível obter o perfil do usuário logado
[] - Deve ser possível criar uma votação
[] - Deve ser possível obter as votações que o usuário criou

## RNs (Regras de negocio)

[] - O usuário não pode se cadastrar com um email duplicado 
[] - O usuário não pode se cadastrar uma (enquete) sem estar logado
[] - O usuário poderá votar sem estar logado 
[] - O usuário não pode votar mais de 10 vezes na mesma (enquete)

## RNFs (Requisitos funcionais)

[] - A senha do usuário precisa estar criptografada 
[] - Os dados da aplicação precisam estar em um banco MongoDB
[] - Todas listas de dados precisam ter paginação
[] - O usuário deve ser identificado por um JWT 