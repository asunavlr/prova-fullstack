package br.edu.prova.produtos.controller;

import br.edu.prova.produtos.model.Produto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    private final List<Produto> produtos = new ArrayList<>();
    private Long proximoId = 4L;

    public ProdutoController() {
        produtos.add(new Produto(1L, "Notebook Essencial", "Notebook para estudos e trabalho.", 3200.00, "Informática", "https://placehold.co/600x400?text=Notebook"));
        produtos.add(new Produto(2L, "Mouse Sem Fio", "Mouse ergonômico com conexão USB.", 89.90, "Acessórios", "https://placehold.co/600x400?text=Mouse"));
        produtos.add(new Produto(3L, "Teclado Mecânico", "Teclado mecânico para produtividade e jogos.", 249.90, "Acessórios", "https://placehold.co/600x400?text=Teclado"));
    }

    @GetMapping
    public List<Produto> listar() {
        return produtos;
    }

    /*
     * TODO 1 — Implementar GET /produtos/{id}
     * - Se encontrar, retornar HTTP 200 com o produto.
     * - Se não encontrar, retornar HTTP 404.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
     * TODO 2 — Implementar POST /produtos
     * - Gerar ID usando proximoId.
     * - Adicionar produto à lista.
     * - Retornar HTTP 201 com o produto criado.
     */
    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody Produto produto) {
        produto.setId(proximoId);
        proximoId++;
        produtos.add(produto);
        return ResponseEntity.status(201).body(produto);
    }

    /*
     * TODO 3 — Implementar PUT /produtos/{id}
     * - Se não encontrar, retornar HTTP 404.
     * - Se encontrar, atualizar campos e retornar HTTP 200.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        for (Produto p : produtos) {
            if (p.getId().equals(id)) {
                p.setNome(produtoAtualizado.getNome());
                p.setDescricao(produtoAtualizado.getDescricao());
                p.setPreco(produtoAtualizado.getPreco());
                p.setCategoria(produtoAtualizado.getCategoria());
                p.setImagemUrl(produtoAtualizado.getImagemUrl());
                return ResponseEntity.ok(p);
            }
        }
        return ResponseEntity.notFound().build();
    }

    /*
     * TODO 4 — Implementar DELETE /produtos/{id}
     * - Se não encontrar, retornar HTTP 404.
     * - Se encontrar, remover e retornar HTTP 204.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        boolean removido = produtos.removeIf(p -> p.getId().equals(id));
        if (removido) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
