// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  // Headers padrão
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: this.getHeaders(options.auth),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Autenticação
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify(response.user));
    }

    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Dashboard
  async getDashboard() {
    return this.request('/admin/dashboard', { auth: true });
  }

  // Eventos - Público
  async getEventos() {
    return this.request('/eventos');
  }

  async getEvento(id) {
    return this.request(`/eventos/${id}`);
  }

  // Eventos - Admin
  async getEventosAdmin() {
    return this.request('/admin/eventos', { auth: true });
  }

  async createEvento(eventoData) {
    return this.request('/eventos', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(eventoData),
    });
  }

  async updateEvento(id, eventoData) {
    return this.request(`/eventos/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(eventoData),
    });
  }

  async deleteEvento(id) {
    return this.request(`/eventos/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  }

  // Notícias - Público
  async getNoticias() {
    return this.request('/noticias');
  }

  async getNoticiasDestaques() {
    return this.request('/noticias/destaques');
  }

  async getNoticia(id) {
    return this.request(`/noticias/${id}`);
  }

  // Notícias - Admin
  async getNoticiasAdmin() {
    return this.request('/admin/noticias', { auth: true });
  }

  async createNoticia(noticiaData) {
    return this.request('/noticias', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(noticiaData),
    });
  }

  async updateNoticia(id, noticiaData) {
    return this.request(`/noticias/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(noticiaData),
    });
  }

  async deleteNoticia(id) {
    return this.request(`/noticias/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  }

  // Upload de imagens
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${API_BASE_URL}/admin/upload`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro no upload');
    }

    return data;
  }

  async deleteImage(filename) {
    return this.request(`/admin/upload/${filename}`, {
      method: 'DELETE',
      auth: true,
    });
  }

  // Backup
  async createBackup() {
    return this.request('/admin/backup', {
      method: 'POST',
      auth: true,
    });
  }

  async getBackups() {
    return this.request('/admin/backups', { auth: true });
  }

  async restoreBackup(filename) {
    return this.request('/admin/restore', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ filename })
    });
  }

  // Contatos - Público
  async getContatos() {
    return this.request('/contatos');
  }

  // Contatos - Admin
  async updateContatos(contatosData) {
    return this.request('/contatos', {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(contatosData),
    });
  }

  // Enviar mensagem de contato
  async enviarMensagemContato(dadosMensagem) {
    return this.request('/contatos/mensagem', {
      method: 'POST',
      body: JSON.stringify(dadosMensagem),
    });
  }

  // Mensagens - Admin
  async getMensagens() {
    return this.request('/contatos/mensagens', { auth: true });
  }

  async updateMensagem(id, dadosMensagem) {
    return this.request(`/contatos/mensagens/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(dadosMensagem),
    });
  }

  async deleteMensagem(id) {
    return this.request(`/contatos/mensagens/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  }

  // Administradores
  async getAdmins() {
    return this.request('/admins', { auth: true });
  }

  async createAdmin(adminData) {
    return this.request('/admins', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(adminData),
    });
  }

  async updateAdmin(id, adminData) {
    return this.request(`/admins/${id}`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify(adminData),
    });
  }

  async deleteAdmin(id) {
    return this.request(`/admins/${id}`, {
      method: 'DELETE',
      auth: true,
    });
  }

  async changeAdminPassword(id, novaSenha) {
    return this.request(`/admins/${id}/password`, {
      method: 'PUT',
      auth: true,
      body: JSON.stringify({ novaSenha }),
    });
  }

  // Perfil do usuário logado
  async getMe() {
    return this.request('/auth/me', { auth: true });
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!this.token;
  }

  // Obter usuário logado
  getUser() {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Instância singleton
const apiService = new ApiService();
export default apiService;
