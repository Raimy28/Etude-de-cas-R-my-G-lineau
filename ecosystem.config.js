module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      instances: 3, // Nombre d'instances en parallèle
      exec_mode: 'cluster',
      max_memory_restart: '200M', // Utilisation de la mémoire maximum
      error_file: 'logs/err.log', // Fichier de log en cas d'erreur
      out_file: 'logs/out.log', // Fichier de log général 
      log_file: 'logs/combined.log', // Fichier de log combiné
      merge_logs: true,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
