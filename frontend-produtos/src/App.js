import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/produtos";

const produtoInicial = {
  nome: "",
  descricao: "",
  preco: "",
  categoria: "",
  imagemUrl: ""
};

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState(produtoInicial);
  const [idBusca, setIdBusca] = useState("");
  const [produtoEncontrado, setProdutoEncontrado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      setMensagem("Erro ao carregar produtos.");
    }
  }

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setProduto({
      ...produto,
      [name]: value
    });
  }

  /*
   * TODO 1 — Implementar cadastro de produto
   * - Enviar POST para http://localhost:8080/produtos.
   * - Usar JSON no corpo da requisição.
   * - Recarregar a lista após cadastrar.
   * - Limpar o formulário.
   */
  async function cadastrarProduto(evento) {
    evento.preventDefault();

    if (produto.id) {
      await atualizarProduto();
      return;
    }

    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok) {
        setMensagem("Erro ao cadastrar produto.");
        return;
      }

      await carregarProdutos();
      setProduto(produtoInicial);
      setMensagem("Produto cadastrado com sucesso.");
    } catch (erro) {
      setMensagem("Erro ao cadastrar produto.");
    }
  }

  /*
   * TODO 2 — Implementar busca por ID
   * - Enviar GET para http://localhost:8080/produtos/{id}.
   * - Se encontrar, exibir o produto na área de resultado.
   * - Se não encontrar, exibir mensagem de erro.
   */
  async function buscarProdutoPorId() {
    if (!idBusca) {
      setMensagem("Informe um ID para buscar.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/${idBusca}`);

      if (!resposta.ok) {
        setProdutoEncontrado(null);
        setMensagem("Produto não encontrado.");
        return;
      }

      const dados = await resposta.json();
      setProdutoEncontrado(dados);
      setMensagem("");
    } catch (erro) {
      setProdutoEncontrado(null);
      setMensagem("Erro ao buscar produto.");
    }
  }

  /*
   * TODO 3 — Implementar carregamento para edição
   * - Ao clicar em Editar, preencher o formulário com os dados do produto.
   * - O formulário deve permitir atualizar o produto posteriormente.
   */
  function prepararEdicao(produtoSelecionado) {
    setProduto(produtoSelecionado);
    setMensagem("Editando produto: " + produtoSelecionado.nome);
  }

  /*
   * TODO 4 — Implementar atualização com PUT
   * - Caso exista um ID no produto atual, enviar PUT para /produtos/{id}.
   * - Recarregar a lista após atualizar.
   * - Limpar o formulário.
   */
  async function atualizarProduto() {
    if (!produto.id) {
      setMensagem("Selecione um produto para editar antes de atualizar.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/${produto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok) {
        setMensagem("Erro ao atualizar produto.");
        return;
      }

      await carregarProdutos();
      setProduto(produtoInicial);
      setMensagem("Produto atualizado com sucesso.");
    } catch (erro) {
      setMensagem("Erro ao atualizar produto.");
    }
  }

  /*
   * TODO 5 — Implementar exclusão com DELETE
   * - Enviar DELETE para /produtos/{id}.
   * - Recarregar a lista após excluir.
   */
  async function excluirProduto(id) {
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!resposta.ok) {
        setMensagem("Erro ao excluir produto.");
        return;
      }

      await carregarProdutos();
      setMensagem("Produto excluído com sucesso.");
    } catch (erro) {
      setMensagem("Erro ao excluir produto.");
    }
  }

  function limparFormulario() {
    setProduto(produtoInicial);
    setMensagem("");
  }

  return (
    <div className="app-background">
      <header className="bg-dark text-white py-4 mb-4">
        <div className="container">
          <h1 className="mb-1">Loja Web - Produtos</h1>
          <p className="mb-0">Aplicação full-stack React + Spring Boot</p>
        </div>
      </header>

      <main className="container">
        {mensagem && <div className="alert alert-info">{mensagem}</div>}

        <section className="card shadow-sm mb-4">
          <div className="card-header">
            <h2 className="h5 mb-0">Cadastro / Edição de Produto</h2>
          </div>

          <div className="card-body">
            <form onSubmit={cadastrarProduto}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome</label>
                  <input className="form-control" name="nome" value={produto.nome} onChange={atualizarCampo} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Categoria</label>
                  <input className="form-control" name="categoria" value={produto.categoria} onChange={atualizarCampo} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Preço</label>
                  <input className="form-control" name="preco" type="number" step="0.01" value={produto.preco} onChange={atualizarCampo} />
                </div>

                <div className="col-md-8">
                  <label className="form-label">URL da imagem</label>
                  <input className="form-control" name="imagemUrl" value={produto.imagemUrl} onChange={atualizarCampo} />
                </div>

                <div className="col-12">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-control" name="descricao" value={produto.descricao} onChange={atualizarCampo} rows="3" />
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">Cadastrar</button>
                <button type="button" className="btn btn-warning" onClick={atualizarProduto}>Atualizar</button>
                <button type="button" className="btn btn-secondary" onClick={limparFormulario}>Limpar</button>
              </div>
            </form>
          </div>
        </section>

        <section className="card shadow-sm mb-4">
          <div className="card-header">
            <h2 className="h5 mb-0">Buscar produto por ID</h2>
          </div>

          <div className="card-body">
            <div className="input-group mb-3">
              <input className="form-control" value={idBusca} onChange={(e) => setIdBusca(e.target.value)} placeholder="Informe o ID" />
              <button className="btn btn-outline-primary" onClick={buscarProdutoPorId}>Buscar</button>
            </div>

            {produtoEncontrado && (
              <div className="border rounded p-3 bg-light">
                <strong>{produtoEncontrado.nome}</strong>
                <p className="mb-1">{produtoEncontrado.descricao}</p>
                <span>R$ {Number(produtoEncontrado.preco).toFixed(2)}</span>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="h4 mb-3">Produtos cadastrados</h2>

          <div className="row g-4">
            {produtos.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img src={item.imagemUrl || "https://placehold.co/600x400?text=Produto"} className="card-img-top product-image" alt={item.nome} />

                  <div className="card-body">
                    <h3 className="h5">{item.nome}</h3>
                    <p className="text-muted mb-1">{item.categoria}</p>
                    <p>{item.descricao}</p>
                    <strong>R$ {Number(item.preco).toFixed(2)}</strong>
                  </div>

                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => prepararEdicao(item)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => excluirProduto(item.id)}>Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
