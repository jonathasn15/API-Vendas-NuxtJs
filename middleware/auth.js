// middleware/auth.js

export default function ({ route, redirect }) {
  // Sua lógica de autenticação aqui
  const isAuthenticated = /* Verifique se o usuário está autenticado */ true;

  if (!isAuthenticated && route.name !== 'index') {
    // Se o usuário não estiver autenticado e não estiver na página de login, redirecione para a página de login
    return redirect('/');
  }
}