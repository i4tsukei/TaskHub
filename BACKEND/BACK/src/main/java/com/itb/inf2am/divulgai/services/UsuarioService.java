package com.itb.inf2am.divulgai.services;


import com.itb.inf2am.divulgai.model.entity.Usuario;
import com.itb.inf2am.divulgai.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired     
    private UsuarioRepository usuarioRepository;


    public List<Usuario> findAll() {
        return usuarioRepository.findAll();

    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }
    
    public boolean emailExiste(String email) {
        return usuarioRepository.existsByEmail(email);
    }


    public Usuario findById (Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com o id " + id));
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setSenha(usuario.getSenha());
        return usuarioRepository.save(usuarioExistente);
    }

    public void delete(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioRepository.delete(usuarioExistente);
    }

    public Usuario inativar(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setStatusUsuario("inativo");
        return usuarioRepository.save(usuarioExistente);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario reativar(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setStatusUsuario("ativo");
        return usuarioRepository.save(usuarioExistente);
    }
}
