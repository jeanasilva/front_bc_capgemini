<template>
  <div id="app">
    

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Banco CapGemini</a>
      </div>
    </nav>

    
          <!-- Modal Structure -->
    <div class="container">
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4>Insira o valor que deseja Sacar</h4>
        <span class="card-title">Conta: {{ financeiro.conta_corrente }}</span>
        <p>Valor: R$ {{ financeiro.valor_saldo }}</p>
        <input type="text">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-green" >Sacar</button>
      </div>
     </div>
    </div>
    


    <div class="container">
      <div class="center-align">
        <div class="col s9">

        <br>

         <form>

           <!-- <ul>
             <li v-for="(erro, index) of erros" :key="index">
               campo <b>{{erro.field}}</b> - {{ erro.defaultMessage }}
             </li>
           </ul> -->
         
          <div class="form-group">
            <label for=""></label>


            <input v-model="conta.conta_corrente"  type="text" class="form-control" placeholder="Conta Corrente"> 
            <input v-model="conta.valor_saldo"  type="text" class="form-control" placeholder="Valor Depositar">

            <button type="submit" class="btn btn-primary" @click.prevent="inserirDados">Depositar</button>

            <br>
            <br>
          </div>

          <table>
            <thead>
              
              <tr>
                  <th>Conta</th>
                  <th>Valor</th>
                  <th>Data Criado</th>
                  <th>Data Atualizado</th>
                  <th>Opções</th>
              </tr>
            </thead>
             <tbody>
              <tr v-for="financeiro in financeiro" :key="financeiro.id">
                <td>{{ financeiro.conta_corrente }}</td>
                <td>{{ financeiro.valor_saldo }}</td>
                <td>{{ financeiro.created_at }}</td>
                <td>{{ financeiro.updated_at }}</td>
                <td>

                    <button type="button" class="btn btn blue" @click="editarDados(financeiro.id)">Depositar</button>
                    <button type="button" class="btn btn green" data-toggle="modal" data-target=".modal">Sacar</button>
                    <button type="button" class="btn btn red" @click="deletarDados(financeiro.id)">Deletar</button>

                </td>
              </tr>
            </tbody>
          </table>
        </form>
    </div>
  </div>
  </div>
</div>

</template>

<script>


export default {
  data() {
    return {
      financeiro: [],
      conta: {
        id: '',
        conta_corrente: '',
        valor_saldo:    ''
      },
      erros: [],
    }
  },

  mounted() {
        this.$http.get('financeiro')
            .then(res => (this.financeiro = res.data));
    },

  methods: {
    listarContas(){
      this.$http.get('financeiro')
        .then(res => {
        this.financeiro = res.data
      })
  },

    inserirDados(){
      this.$http.post('financeiro', this.conta)
        .then(res => {
          this.conta.conta_corrente = ''
          this.conta.valor_saldo    = ''
          this.listarContas()
          alert('Deposito realizado com sucesso!')
        }).catch(e => {
          //  console.log(e.response.status)
          this.erros = e.response.status
        })
    },

    deletarDados(id){
      this.$http.delete('financeiro/' + id)
        .then(res => (this.listarContas()));
        alert('Conta deletada com sucesso!')
    },

    editarDados(id){
      this.conta = this.financeiro.find(conta => conta.id == id)

    },
    
    // alterarDados(id){
    //   this.$http.put('financeiro/' + id)
    // }
    

  }
}

</script>


