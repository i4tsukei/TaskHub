package com.itb.inf2am.divulgai.controller;

import com.itb.inf2am.divulgai.model.entity.Usuario;
import com.itb.inf2am.divulgai.model.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

 @Autowired
 private UsuarioService usuarioService;

 @GetMapping
 public ResponseEntity<List<Usuario>> findAll() {
  return ResponseEntity.ok(usuarioService.findAll());
 }

 @PostMapping
 public ResponseEntity<Object> create(@RequestBody Usuario usuario) {
  if (usuarioService.emailExiste(usuario.getEmail())) {
   return ResponseEntity.badRequest().body(Map.of("message", "Email já cadastrado"));
  }
  Usuario usuarioSalvo = usuarioService.save(usuario);
  return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
 }
 
 @PostMapping("/login")
 public ResponseEntity<Object> login(@RequestBody Map<String, String> dados) {
  Usuario usuario = usuarioService.login(dados.get("email"), dados.get("senha"));
  if (usuario != null) {
   return ResponseEntity.ok(usuario);
  }
  return ResponseEntity.status(401).body(Map.of("message", "Email ou senha incorretos"));
 }

 @GetMapping("/{id}")
 public ResponseEntity<Object> listarUsuarioPorId(@PathVariable String id) {
  try {
   return ResponseEntity.ok(usuarioService.findById(Long.parseLong(id)));
  } catch (NumberFormatException e) {
   return ResponseEntity.badRequest().body(Map.of(
    "status", 400,
    "error", "Bad Request",
    "message", "O id informado não é válido: " + id
   ));
  } catch (RuntimeException e) {
   return ResponseEntity.status(404).body(Map.of(
    "status", 404,
    "error", "Not Found",
    "message", "Usuario não encontrada com o id " + id
   ));
  }
 }

 @PutMapping("/{id}")
 public ResponseEntity<Object> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
  try {
   Long usuarioId = Long.parseLong(id);
   Usuario usuarioExistente = usuarioService.findById(usuarioId);

   usuarioExistente.setNome(usuario.getNome());
   usuarioExistente.setEmail(usuario.getEmail());
   usuarioExistente.setSenha(usuario.getSenha());

   Usuario usuarioAtualizada = usuarioService.save(usuarioExistente);
   return ResponseEntity.ok(usuarioAtualizada);
  } catch (NumberFormatException e) {
   return ResponseEntity.badRequest().body(Map.of(
    "status", 400,
    "error", "Bad Request",
    "message", "O id informado não é válido: " + id
   ));
  } catch (RuntimeException e) {
   return ResponseEntity.status(404).body(Map.of(
    "status", 404,
    "error", "Not Found",
    "message", "Usuario não encontrada com o id " + id
   ));
  }
 }

 @PutMapping("/alterarSenha/{id}")
 public ResponseEntity<Object> alterarSenha(@PathVariable String id, @RequestParam String senha) {
  try {
   Long usuarioId = Long.parseLong(id);
   Usuario usuarioExistente = usuarioService.findById(usuarioId);
   usuarioExistente.setSenha(senha);
   Usuario usuarioAtualizado = usuarioService.save(usuarioExistente);
   return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso"));
  } catch (NumberFormatException e) {
   return ResponseEntity.badRequest().body(Map.of(
    "status", 400,
    "error", "Bad Request",
    "message", "O id informado não é válido: " + id
   ));
  } catch (RuntimeException e) {
   return ResponseEntity.status(404).body(Map.of(
    "status", 404,
    "error", "Not Found",
    "message", "Usuario não encontrado com o id " + id
   ));
  }
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Object> excluirUsuario(@PathVariable String id) {
  try {
   Long usuarioId = Long.parseLong(id);
   usuarioService.delete(usuarioId);
   return ResponseEntity.ok(Map.of("message", "Usuario deletada com sucesso"));
  } catch (NumberFormatException e) {
   return ResponseEntity.badRequest().body(Map.of(
    "status", 400,
    "error", "Bad Request",
    "message", "O id informado não é válido: " + id
   ));
  } catch (RuntimeException e) {
   return ResponseEntity.status(404).body(Map.of(
    "status", 404,
    "error", "Not Found",
    "message", "Usuario não encontrada com o id " + id
   ));
  }
 }
}