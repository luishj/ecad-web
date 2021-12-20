import './App.css';

import React, { useEffect, useState } from "react";
import arquivosBancariosApi from './ArquivosBancarios.api';

const App = ()=>{
    const [arquivosBancario, setArquivosBancario] = useState([]);
    const [pesquisaNome,setPesquisaNome] = useState("");
    const [pesquisaDataInicio,setPesquisaDataInicio] = useState("");
    const [pesquisaDataFim,setPesquisaDataFim] = useState("");
    const [pesquisaTipo,setPesquisaTipo] = useState(0);
    const tipoArquivo={
        1:'REMESSA',
        2:'RETORNO'
    }

 useEffect(() => {
     const buscaArquivos = async () => {
    const response = await arquivosBancariosApi.get('/listar', {
  params: {
     pesquisaNome,
     pesquisaTipo,
     pesquisaDataInicio,
     pesquisaDataFim
  }
});
      setArquivosBancario(response.data)
     };

     buscaArquivos();
   }, []);
   const pesquisar = async e =>{
       e.preventDefault();
    const response = await arquivosBancariosApi.get('/listar', {
  params: {
     pesquisaNome,
     pesquisaTipo,
     pesquisaDataInicio,
     pesquisaDataFim
  }
});
      setArquivosBancario(response.data)

   }
      const limparFiltro = async e =>{
setPesquisaNome('');
setPesquisaDataInicio('');
setPesquisaDataFim('');
setPesquisaTipo(0);

pesquisar();
   }


        return(
            <div>
                <div  className="cabecalho">
                  <form onSubmit={pesquisar}>
                    <div className='firstLine'>
                        <label className='nome'>Nome:</label>
                         <input  value={pesquisaNome} onChange={e=>setPesquisaNome(e.target.value)}></input>
                    <label className='tipo'>Tipo arquivo:</label>
                    <select  name={pesquisaTipo} onChange={e=>setPesquisaTipo(e.target.value)}>
                         <option value="0"  >TODOS</option>
                        <option value="1"  >REMESSA</option>
                        <option value="2" >RETORNO</option>
                    </select>
                          </div>
                    <div className='secondLine'>
                         <label className='dataInicio'>Data Início:</label>
                         <input  value={pesquisaDataInicio} onChange={e=>setPesquisaDataInicio(e.target.value)} type="date"></input>
                              <label className='dataFim'>Data Fim:</label>
                          <input  value={pesquisaDataFim} onChange={e=>setPesquisaDataFim(e.target.value)} type="date"></input>

                    </div>
                  <button className='buttom' type='submit' >Pesquisar</button>
                                    <button className='Limpar' type='submit' onClick={limparFiltro}>Limpar</button>
                  </form>
            </div>

            <table border="1" className='table'>
              <tr>
                  <td colspan="12" className='titleTable'>    Arquivos Báncarios</td>
             </tr>
            <tr>
                <td>Nome</td>
                <td>Tipo</td>
                <td>Data</td>
                           <td>Quantidade Linhas</td>
                                <td>Valor</td>
            </tr>

            {arquivosBancario.map(arquivoBancario => (
                <>  <tr>
                            <td>  {arquivoBancario.nome}</td>
                            <td> {tipoArquivo[arquivoBancario.tipo]}</td>
                            <td>  {arquivoBancario.data}</td>
                              <td>  {arquivoBancario.quantidadeLinha}</td>
                            <td>  {arquivoBancario.valor}</td>

                        </tr></>
                ))}
                </table>

            </div>

        )

}

export default App;
