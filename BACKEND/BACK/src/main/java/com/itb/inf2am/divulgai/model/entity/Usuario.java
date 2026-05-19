package com.itb.inf2am.divulgai.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "Email", length = 150, nullable = false, unique = true)
    private String email;

    @Column(name = "Senha", length = 255, nullable = false)
    private String senha;

    @Column(name = "DataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "nivelAcesso", length = 20, nullable = true)
    private String nivelAcesso = "usuario";

    @Column(name = "foto", nullable = true)
    @Lob
    private byte[] foto;

    @Column(name = "statusUsuario", length = 20,  nullable = false)
    private String statusUsuario = "ativo";

    @PrePersist
    protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getNivelAcesso() {
    return nivelAcesso;
    }

    public void setNivelAcesso(String nivelAcesso) {
    this.nivelAcesso = nivelAcesso;
    }

    public byte[] getFoto() {
    return foto;
    }

    public void setFoto(byte[] foto) {
    this.foto = foto;
    }

    public String getStatusUsuario() {
    return statusUsuario;
    }

    public void setStatusUsuario(String statusUsuario) {
    this.statusUsuario = statusUsuario;
    }



}
