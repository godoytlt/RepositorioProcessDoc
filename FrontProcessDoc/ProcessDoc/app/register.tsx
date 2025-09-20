import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    dateOfBirth: "",
    password: "",
    role: "ADVOGADO", // padrão
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const register = async () => {
    try {
        const res = await fetch("http://10.0.2.2:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Sucesso ✅", data.message);
      } else {
        Alert.alert("Erro ❌", data.error || "Falha no cadastro");
      }
    } catch (err: any) {
      Alert.alert("Erro ⚠️", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={form.name}
        onChangeText={(t) => handleChange("name", t)}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(t) => handleChange("email", t)}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={form.cpf}
        onChangeText={(t) => handleChange("cpf", t)}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu CEP"
        keyboardType="numeric"
        value={form.cep}
        onChangeText={(t) => handleChange("cep", t)}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={form.dateOfBirth}
        onChangeText={(t) => handleChange("dateOfBirth", t)}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange("password", t)}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // fundo escuro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
